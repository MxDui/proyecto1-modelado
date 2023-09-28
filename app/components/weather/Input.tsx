  import React, { useEffect, useRef, useState } from "react";
  import { motion } from "framer-motion";

  export const InputComponent = ({
    city,
    setCity,
    handleSearch,
    citySuggestions,
    selectSuggestedCity,
  }: {
    city: string;
    setCity: (value: string) => void;
    handleSearch: any;
    citySuggestions: string[];
    selectSuggestedCity: (suggestion: string) => void;
  }) => {
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const [showSuggestions, setShowSuggestions] = useState(false);

    useEffect(() => {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    return (
      <motion.div
        ref={wrapperRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full gap-4 my-5 grid grid-cols-2"
      >
        <div className="flex flex-col relative">
          <input
            className="border p-2 rounded w-full text-paragraph border-475d5b hover:border-headline focus:border-headline focus:outline-none transition-all duration-200"
            placeholder="Ciudad"
            value={city}
            onFocus={() => setShowSuggestions(true)}
            onChange={(e) => setCity(e.target.value)}
          />
          {city && showSuggestions && (
            <div className="absolute top-full w-full z-10 mt-2 bg-white shadow-md">
              {citySuggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="border p-2 rounded w-full text-paragraph border-475d5b hover:border-headline focus:border-headline focus:outline-none transition-all duration-200 cursor-pointer"
                  onClick={() => {
                    selectSuggestedCity(suggestion);
                    setShowSuggestions(false);
                  }}
                >
                  {suggestion}
                </div>
              ))}
            </div>
          )}
        </div>
        <button
          className="bg-button text-button-text px-6 py-2 rounded w-full hover:bg-yellow-500 transition-all duration-200"
          onClick={() => {
            if (!citySuggestions.includes(city) && citySuggestions.length > 0) {
              setCity(citySuggestions[0]);
            }

            handleSearch();
            setShowSuggestions(false);
          }}
        >
          Buscar
        </button>
      </motion.div>
    );
  };
