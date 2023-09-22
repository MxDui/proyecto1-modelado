import { motion, AnimatePresence } from "framer-motion";

interface WeatherInfo {
  temperature: number;
  status: string;
}

interface ResultProps {
  departureCity: string;
  arrivalCity: string;
  weather: {
    departure?: WeatherInfo;
    arrival?: WeatherInfo;
  };
}

export const ResultComponent: React.FC<ResultProps> = ({
  departureCity,
  arrivalCity,
  weather,
}) => {
  const hasWeatherData = weather?.departure || weather?.arrival;

  return (
    <div className="text-paragraph mt-5 w-full p-5 rounded-md bg-white shadow-md font-medium">
      <h2 className="text-headline text-2xl mb-3">Resultados</h2>
      <AnimatePresence>
        {hasWeatherData ? (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="grid grid-cols-2 gap-4"
          >
            <div>
              <h2 className="text-headline text-2xl mb-3">{departureCity}</h2>
              {weather?.departure && (
                <>
                  <p>Temperatura: {weather.departure.temperature}°K</p>
                  <p>Estado: {weather.departure.status}</p>
                </>
              )}
            </div>
            <div>
              <h2 className="text-headline text-2xl mb-3">{arrivalCity}</h2>
              {weather?.arrival && (
                <>
                  <p>Temperatura: {weather.arrival.temperature}°K</p>
                  <p>Estado: {weather.arrival.status}</p>
                </>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            <p>No hay información de clima disponible.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
