  "use client";

  import React from "react";
  import { QueryFunction, useQuery } from "react-query";
  import { InputComponent } from "../components/weather/Input";
  import { ResultComponent } from "../components/weather/Results";
  import Weather from "../services/Weather";
  import { motion } from "framer-motion";
  import { WeatherData } from "../types";

  export default function Home() {
    const [searchMode, setSearchMode] = React.useState("cities");
    const [boleto, setBoleto] = React.useState("");

    const [weather, setWeather] = React.useState<WeatherData>({
      departure: {
        temperature: undefined,
        status: undefined,
      },
      arrival: {
        temperature: undefined,
        status: undefined,
      },
    });

    const [searchedDepartureCity, setSearchedDepartureCity] = React.useState("");
    const [searchedArrivalCity, setSearchedArrivalCity] = React.useState("");

    const [departureCity, setDepartureCity] = React.useState("");
    const [arrivalCity, setArrivalCity] = React.useState("");

    const decodeBoleto = (ticketString: string) => {
      // Add logic to decode the ticket and return the cities
    };

    const fetchAndSetWeather = async (
      city: string,
      type: "departure" | "arrival"
    ) => {
      /* 
          Add logic to fetch the weather for the city and set it in the weather state
          - If the type is "departure", set the weather in the departure state
          - If the type is "arrival", set the weather in the arrival state
      */
    };

    const handleSearch = async () => {
      /* 
          Add logic to handle the search
          - If the search mode is "boleto", decode the boleto and fetch the weather for the departure and arrival cities
          - If the search mode is "cities", fetch the weather for the departure and arrival cities
      */
    };

    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-10">
        <h1 className="text-4xl font-bold text-headline mb-10">
          Clima Aeropuerto
        </h1>
        <div className="w-full max-w-2xl">
          <h2 className="text-2xl font-bold text-headline mb-2">Buscador</h2>
          <p className="text-paragraph mb-4 ">
            Busca el clima de tu ciudad de salida y de llegada , ya sea para el
            código de boleto o para la ciudades del vuelo.
          </p>
          <select
            className="border p-2 rounded w-full text-paragraph border-475d5b hover:border-headline focus:border-headline focus:outline-none transition-all duration-200"
            value={searchMode}
            onChange={(e) => setSearchMode(e.target.value)}
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
                value={boleto} // Use the boleto state here
                onChange={(e) => setBoleto(e.target.value)} // Update the boleto state here
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
