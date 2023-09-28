import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

type WeatherInfo = {
  temperature: number;
  status: string;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
  icon: string;
};

interface ResultProps {
  departureCity?: string;
  arrivalCity?: string;
  weather?: WeatherInfo;
  departureWeather?: WeatherInfo;
  arrivalWeather?: WeatherInfo;
}

export const ResultComponent: React.FC<ResultProps> = ({
  city,
  departureCity,
  arrivalCity,
  weather,
  departureWeather,
  arrivalWeather,
}) => {
  return (
    <div className="text-paragraph mt-5 w-full p-5 rounded-md bg-white shadow-md font-medium">
      <h2 className="text-headline text-2xl mb-3">Resultados</h2>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        className="grid grid-cols-2 gap-4"
      >
        <div>
          <h2 className="text-headline text-2xl mb-3">{departureCity}</h2>
          {departureWeather && (
            <>
              <div className="bg-illustration-highlight  rounded-full p-2 inline-block">
                <Image
                  src={`http://openweathermap.org/img/w/${departureWeather.icon}.png`}
                  alt={departureWeather.status}
                  width={100}
                  height={100}
                  className="rounded"
                />
              </div>
              <p>Temperatura: {departureWeather.temperature}°C</p>
              <p>Presión: {departureWeather.pressure} hPa</p>
              <p>Humedad: {departureWeather.humidity}%</p>
              <p>Nivel del mar: {departureWeather.sea_level ?? "N/A"} </p>
              <p>Nivel del suelo: {departureWeather.grnd_level ?? "N/A"}</p>
            </>
          )}
        </div>
        <div>
          <h2 className="text-headline text-2xl mb-3">{arrivalCity}</h2>
          {arrivalWeather && (
            <>
              <div className="bg-illustration-highlight  rounded-full p-2 inline-block">
                <Image
                  src={`http://openweathermap.org/img/w/${arrivalWeather.icon}.png`}
                  alt={arrivalWeather.status}
                  width={100}
                  height={100}
                  className="rounded"
                />
              </div>
              <p>Temperatura: {arrivalWeather.temperature}°C</p>
              <p>Presión: {arrivalWeather.pressure} hPa</p>
              <p>Humedad: {arrivalWeather.humidity}%</p>
              <p>Nivel del mar: {arrivalWeather.sea_level ?? "N/A"}</p>
              <p>Nivel del suelo: {arrivalWeather.grnd_level ?? "N/A"}</p>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};