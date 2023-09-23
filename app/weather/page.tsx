"use client";
import React from "react";
import {
  useQuery,
  useMutation,
  UseMutationResult,
  UseQueryResult,
} from "react-query";
import { InputComponent } from "../components/weather/Input";
import { ResultComponent } from "../components/weather/Results";
import Weather from "../services/Weather";
import { BoletoDecoded, Coordinates, Ticket } from "../types";

type WeatherData = {
  temperature: number;
  status: string;
};

export default function Home() {
  const [searchMode, setSearchMode] = React.useState<string>("cities");
  const [boleto, setBoleto] = React.useState<string>("");
  const [alertMessage, setAlertMessage] = React.useState<string | null>(null);

  const [searchedDepartureCity, setSearchedDepartureCity] =
    React.useState<string>("");
  const [searchedArrivalCity, setSearchedArrivalCity] =
    React.useState<string>("");
  const [searchedDepartureCoords, setSearchedDepartureCoords] =
    React.useState<Coordinates | null>(null);
  const [searchedArrivalCoords, setSearchedArrivalCoords] =
    React.useState<Coordinates | null>(null);

  const [departureCity, setDepartureCity] = React.useState<string>("");
  const [arrivalCity, setArrivalCity] = React.useState<string>("");

  const [departureCitySuggestions, setDepartureCitySuggestions] =
    React.useState<string[]>([]);
  const [arrivalCitySuggestions, setArrivalCitySuggestions] = React.useState<
    string[]
  >([]);

  const { data: airportsData } = useQuery(
    "airports",
    async () => {
      const response = await fetch("/airports.json");
      return response.json();
    },
    { staleTime: Infinity }
  );

  const { data: cityNamesData = [] } = useQuery(
    "cityNames",
    async () => {
      const response = await fetch("/sorted_city_names.json");
      return response.json();
    },
    { staleTime: Infinity }
  );

  const binarySearch = (cityNames: string[], target: string) => {
    let low = 0;
    let high = cityNames.length - 1;

    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      const midVal = cityNames[mid].toLowerCase();

      if (midVal < target.toLowerCase()) {
        low = mid + 1;
      } else if (midVal > target.toLowerCase()) {
        high = mid - 1;
      } else {
        return mid;
      }
    }
    return low;
  };

  const getCitySuggestions = (
    inputCity: string,
    cityNames: string[],
    maxDistanceCheck = 5
  ) => {
    const index = binarySearch(cityNames, inputCity);
    let suggestions = [cityNames[index]];

    for (let i = 1; i < maxDistanceCheck; i++) {
      if (index - i >= 0) {
        suggestions.push(cityNames[index - i]);
      }
      if (index + i < cityNames.length) {
        suggestions.push(cityNames[index + i]);
      }
    }

    return suggestions;
  };

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

  const decodeMutation: UseMutationResult<
    BoletoDecoded,
    Error,
    string,
    unknown
  > = useMutation(decodeBoleto);

  const fetchWeather = async (city: string): Promise<WeatherData> => {
    const weatherData = await Weather.getWeather(city);
    return {
      temperature: weatherData.main.temp,
      status: weatherData.weather[0].main,
    };
  };

  const fetchWeatherByCoords = async (
    coords: Coordinates
  ): Promise<WeatherData> => {
    const weatherData = await Weather.getWeatherByCoords(
      coords.lat,
      coords.lon
    );
    return {
      temperature: weatherData.main.temp,
      status: weatherData.weather[0].main,
    };
  };

  const departureWeatherQuery: UseQueryResult<WeatherData, Error> = useQuery(
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
  const arrivalWeatherQuery: UseQueryResult<WeatherData, Error> = useQuery(
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

  React.useEffect(() => {
    if (decodeMutation.isError) {
      setAlertMessage("Error decoding boleto. Please try again.");
    } else if (departureWeatherQuery.isError) {
      setAlertMessage(
        "Error fetching departure city weather. Please try again."
      );
    } else if (arrivalWeatherQuery.isError) {
      setAlertMessage("Error fetching arrival city weather. Please try again.");
    }

    const timeoutId = setTimeout(() => {
      setAlertMessage(null);
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, [
    decodeMutation.isError,
    departureWeatherQuery.isError,
    arrivalWeatherQuery.isError,
  ]);

  React.useEffect(() => {
    const suggestions = getCitySuggestions(departureCity, cityNamesData);
    setDepartureCitySuggestions(suggestions);
  }, [departureCity, cityNamesData]);

  React.useEffect(() => {
    const suggestions = getCitySuggestions(arrivalCity, cityNamesData);
    setArrivalCitySuggestions(suggestions);
  }, [arrivalCity, cityNamesData]);

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
    }
  };

  const selectSuggestedCity = (
    suggestedCity: string,
    type: "departure" | "arrival"
  ) => {
    if (type === "departure") {
      setDepartureCity(suggestedCity);
      setDepartureCitySuggestions([]);
    } else {
      setArrivalCity(suggestedCity);
      setArrivalCitySuggestions([]);
    }
  };

  const weather = {
    departure: departureWeatherQuery.data,
    arrival: arrivalWeatherQuery.data,
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-10">
      {alertMessage && (
        <div className="w-full max-w-2xl mb-4 bg-red-500 text-white p-4 rounded">
          {alertMessage}
        </div>
      )}
      <h1 className="text-4xl font-bold text-headline mb-10">
        Clima Aeropuerto
      </h1>
      <div className="w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-headline mb-2">Buscador</h2>
        <p className="text-paragraph mb-4">
          Busca el clima de tu ciudad de salida y de llegada, ya sea para el
          código de boleto o para las ciudades del vuelo.
        </p>
        <select
          className="border p-2 rounded w-full text-paragraph border-475d5b hover:border-headline focus:border-headline focus:outline-none transition-all duration-200"
          value={searchMode}
          onChange={(e) => {
            setSearchMode(e.target.value);
            setBoleto("");
            setDepartureCity("");
            setArrivalCity("");
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
          <div className="w-full grid grid-cols-2 gap-4 my-5">
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
          </div>
        ) : (
          <InputComponent
            departureCity={departureCity}
            setDepartureCity={setDepartureCity}
            arrivalCity={arrivalCity}
            setArrivalCity={setArrivalCity}
            handleSearch={handleSearch}
            departureCitySuggestions={departureCitySuggestions}
            arrivalCitySuggestions={arrivalCitySuggestions}
            selectSuggestedCity={selectSuggestedCity}
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
