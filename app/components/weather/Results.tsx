import { motion } from "framer-motion";

export const ResultComponent = ({
  departureCity,
  arrivalCity,
  weather,
}: {
  departureCity: string;
  arrivalCity: string;
  weather: any;
}) => {
  return (
    <div className="text-paragraph mt-5 w-full  p-5 rounded-md bg-white shadow-md font-medium">
      <h2 className="text-headline text-2xl mb-3">Resultados</h2>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
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
    </div>
  );
};
