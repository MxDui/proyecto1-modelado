"use client";
import React from "react";
import { useQuery, useMutation } from "react-query";
import { InputComponent } from "../components/weather/Input";
import { ResultComponent } from "../components/weather/Results";
import Weather from "../services/Weather";
import { motion } from "framer-motion";
import { WeatherData } from "../types";

type Coordinates = {
  lat: number;
  lon: number;
};

type Ticket = {
  num_ticket: string;
  origin: string;
  destination: string;
  origin_latitude: number;
  origin_longitude: number;
  destination_latitude: number;
  destination_longitude: number;
};

type BoletoDecoded = {
  departureCoords: Coordinates;
  arrivalCoords: Coordinates;
  departureCity: string;
  arrivalCity: string;
};

export default function Home() {
  const [searchMode, setSearchMode] = React.useState("cities");
  const [boleto, setBoleto] = React.useState("");

  const [searchedDepartureCity, setSearchedDepartureCity] = React.useState("");
  const [searchedArrivalCity, setSearchedArrivalCity] = React.useState("");
  const [searchedDepartureCoords, setSearchedDepartureCoords] =
    React.useState<Coordinates | null>(null);
  const [searchedArrivalCoords, setSearchedArrivalCoords] =
    React.useState<Coordinates | null>(null);

  const [departureCity, setDepartureCity] = React.useState("");
  const [arrivalCity, setArrivalCity] = React.useState("");

  const { data: airportsData } = useQuery(
    "airports",
    async () => {
      const response = await fetch("/airports.json");
      return response.json();
    },
    {
      staleTime: Infinity,
    }
  );

  const decodeBoleto = (ticketString: string): Promise<BoletoDecoded> => {
    return new Promise((resolve, reject) => {
      const ticket: Ticket | undefined = airportsData.find(
        (t: Ticket) => t.num_ticket === ticketString
      );

      if (!ticket) {
        reject(new Error("Boleto not found"));
        return;
      }

      resolve({
        departureCoords: {
          lat: ticket.origin_latitude,
          lon: ticket.origin_longitude,
        },
        arrivalCoords: {
          lat: ticket.destination_latitude,
          lon: ticket.destination_longitude,
        },
        departureCity: ticket.origin,
        arrivalCity: ticket.destination,
      });
    });
  };

  const decodeMutation = useMutation(decodeBoleto);

  const fetchWeather = async (city: string) => {
    const weatherData = await Weather.getWeather(city);
    return {
      temperature: weatherData.main.temp,
      status: weatherData.weather[0].main,
    };
  };

  const fetchWeatherByCoords = async (coords: Coordinates) => {
    const weatherData = await Weather.getWeatherByCoords(
      coords.lat,
      coords.lon
    );
    return {
      temperature: weatherData.main.temp,
      status: weatherData.weather[0].main,
    };
  };

  const departureWeatherQuery = useQuery(
    [
      "weather",
      searchMode === "boleto" ? searchedDepartureCoords : searchedDepartureCity,
    ],
    () =>
      searchMode === "boleto"
        ? fetchWeatherByCoords(searchedDepartureCoords as Coordinates)
        : fetchWeather(searchedDepartureCity),
    { enabled: !!searchedDepartureCity || !!searchedDepartureCoords }
  );

  const arrivalWeatherQuery = useQuery(
    [
      "weather",
      searchMode === "boleto" ? searchedArrivalCoords : searchedArrivalCity,
    ],
    () =>
      searchMode === "boleto"
        ? fetchWeatherByCoords(searchedArrivalCoords as Coordinates)
        : fetchWeather(searchedArrivalCity),
    { enabled: !!searchedArrivalCity || !!searchedArrivalCoords }
  );

  const handleSearch = async () => {
    if (searchMode === "boleto") {
      const decodedInfo = await decodeMutation.mutateAsync(boleto);
      setSearchedDepartureCity(decodedInfo.departureCity);
      setSearchedArrivalCity(decodedInfo.arrivalCity);
      setSearchedDepartureCoords(decodedInfo.departureCoords);
      setSearchedArrivalCoords(decodedInfo.arrivalCoords);
    } else {
      setSearchedDepartureCity(departureCity);
      setSearchedArrivalCity(arrivalCity);
      setSearchedDepartureCoords(null);
      setSearchedArrivalCoords(null);
    }
  };

  const weather = {
    departure: departureWeatherQuery.data,
    arrival: arrivalWeatherQuery.data,
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-10">
      <h1 className="text-4xl font-bold text-headline mb-10">
        Clima Aeropuerto
      </h1>
      <div className="w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-headline mb-2">Buscador</h2>
        <p className="text-paragraph mb-4 ">
          Busca el clima de tu ciudad de salida y de llegada, ya sea para el
          código de boleto o para las ciudades del vuelo.
        </p>
        <select
          className="border p-2 rounded w-full text-paragraph border-475d5b hover:border-headline focus:border-headline focus:outline-none transition-all duration-200"
          value={searchMode}
          onChange={(e) => {
            setSearchMode(e.target.value);
            setBoleto("");
            setSearchedDepartureCity("");
            setSearchedArrivalCity("");
            setSearchedDepartureCoords(null);
            setSearchedArrivalCoords(null);
          }}
        >
          <option value="boleto">Boleto</option>
          <option value="cities">Ciudades</option>
        </select>

        {searchMode === "boleto" ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full grid grid-cols-2 gap-4 my-5"
          >
            <input
              className="border p-2 rounded w-full text-paragraph border-475d5b hover:border-headline focus:border-headline focus:outline-none transition-all duration-200"
              placeholder="Código de Boleto"
              value={boleto}
              onChange={(e) => setBoleto(e.target.value)}
            />
            <button
              className="bg-button text-button-text px-6 py-2 rounded w-full hover:bg-yellow-500 transition-all duration-200"
              onClick={handleSearch}
            >
              Buscar
            </button>
          </motion.div>
        ) : (
          <InputComponent
            handleSearch={handleSearch}
            departureCity={departureCity}
            setDepartureCity={setDepartureCity}
            arrivalCity={arrivalCity}
            setArrivalCity={setArrivalCity}
          />
        )}

        {weather && (
          <ResultComponent
            departureCity={searchedDepartureCity.toUpperCase()}
            arrivalCity={searchedArrivalCity.toUpperCase()}
            weather={weather}
          />
        )}
      </div>
    </div>
  );
}
