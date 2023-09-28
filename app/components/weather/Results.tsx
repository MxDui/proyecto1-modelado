import { motion, AnimatePresence } from "framer-motion";

interface WeatherInfo {
  temperature: number;
  status: string;
}

interface ResultProps {
  city?: string;
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
      {city && weather ? (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
        >
          <div>
            <h2 className="text-headline text-2xl mb-3">{city}</h2>
            <p>Temperatura: {weather.temperature}°C</p>
            <p>Estado: {weather.status}</p>
          </div>
        </motion.div>
      ) : (
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
                <p>Temperatura: {departureWeather.temperature}°C</p>
                <p>Estado: {departureWeather.status}</p>
              </>
            )}
          </div>
          <div>
            <h2 className="text-headline text-2xl mb-3">{arrivalCity}</h2>
            {arrivalWeather && (
              <>
                <p>Temperatura: {arrivalWeather.temperature}°C</p>
                <p>Estado: {arrivalWeather.status}</p>
              </>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};
