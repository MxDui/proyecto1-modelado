import { motion } from "framer-motion";

export const InputComponent = ({
  departureCity,
  setDepartureCity,
  arrivalCity,
  setArrivalCity,
  handleSearch,
  departureCitySuggestions,
  arrivalCitySuggestions,
  selectSuggestedCity,
}: {
  departureCity: string;
  setDepartureCity: (value: string) => void;
  arrivalCity: string;
  setArrivalCity: (value: string) => void;
  handleSearch: any;
  departureCitySuggestions: string[];
  arrivalCitySuggestions: string[];
  selectSuggestedCity: (
    suggestion: string,
    type: "departure" | "arrival"
  ) => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full grid grid-cols-3 gap-4 my-5 relative"
    >
      <div className="flex flex-col relative">
        <input
          className="border p-2 rounded w-full text-paragraph border-475d5b hover:border-headline focus:border-headline focus:outline-none transition-all duration-200"
          placeholder="Ciudad de Salida"
          value={departureCity}
          onChange={(e) => setDepartureCity(e.target.value)}
        />
        {departureCity && (
          <div className="absolute top-full w-full z-10 mt-2 bg-white shadow-md">
            {departureCitySuggestions.map((suggestion, index) => (
              <div
                key={index}
                className="border p-2 rounded w-full text-paragraph border-475d5b hover:border-headline focus:border-headline focus:outline-none transition-all duration-200 cursor-pointer"
                onClick={() => selectSuggestedCity(suggestion, "departure")}
              >
                {suggestion}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col relative">
        <input
          className="border p-2 rounded w-full text-paragraph border-475d5b hover:border-headline focus:border-headline focus:outline-none transition-all duration-200"
          placeholder="Ciudad de Llegada"
          value={arrivalCity}
          onChange={(e) => setArrivalCity(e.target.value)}
        />
        {arrivalCity && (
          <div className="absolute top-full w-full z-10 mt-2 bg-white shadow-md">
            {arrivalCitySuggestions.map((suggestion, index) => (
              <div
                key={index}
                className="border p-2 rounded w-full text-paragraph border-475d5b hover:border-headline focus:border-headline focus:outline-none transition-all duration-200 cursor-pointer"
                onClick={() => selectSuggestedCity(suggestion, "arrival")}
              >
                {suggestion}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-start">
        <button
          className="bg-button text-button-text px-6 py-2 rounded w-full hover:bg-yellow-500 transition-all duration-200"
          onClick={handleSearch}
        >
          Buscar
        </button>
      </div>
    </motion.div>
  );
};