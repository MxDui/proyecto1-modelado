import { motion } from "framer-motion";

export const InputComponent = ({
  departureCity,
  setDepartureCity,
  arrivalCity,
  setArrivalCity,
  handleSearch,
}: {
  departureCity: string;
  setDepartureCity: (value: string) => void;
  arrivalCity: string;
  setArrivalCity: (value: string) => void;
  handleSearch: any;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full grid grid-cols-3 gap-4 my-5"
    >
      <input
        className="border p-2 rounded w-full text-paragraph border-475d5b hover:border-headline focus:border-headline focus:outline-none transition-all duration-200"
        placeholder="Ciudad de Salida"
        value={departureCity}
        onChange={(e) => setDepartureCity(e.target.value)}
      />
      <input
        className="border p-2 rounded w-full text-paragraph border-475d5b hover:border-headline focus:border-headline focus:outline-none transition-all duration-200"
        placeholder="Ciudad de Llegada"
        value={arrivalCity}
        onChange={(e) => setArrivalCity(e.target.value)}
      />
      <button
        className="bg-button text-button-text px-6 py-2 rounded w-full hover:bg-yellow-500 transition-all duration-200"
        onClick={handleSearch}
      >
        Buscar
      </button>
    </motion.div>
  );
};
