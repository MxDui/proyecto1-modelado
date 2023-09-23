"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-background flex flex-col justify-center items-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="w-full max-w-3xl p-8 rounded-3xl bg-white shadow-xl"
      >
        {/* Placeholder for Illustration */}
        <div className="bg-illustration-stroke h-64 w-54 rounded-lg mb-8 grid place-items-center">
          <motion.div
            whileHover={{
              scale: 1.05, // scale up 5% when hovered
              rotate: -10, // rotate -10 degrees when hovered
            }}
            transition={{ duration: 0.2 }}
          >
            <Image
              src="https://vuela.aeromexico.com/787-9/img/frontPlane.png"
              alt="Illustration"
              width={500}
              height={500}
            />
          </motion.div>
        </div>

        <div className="text-center">
          <h2 className="text-headline text-3xl md:text-4xl font-bold leading-tight mb-6">
            Clima Aeropuerto
          </h2>
          <p className="text-paragraph text-lg mb-10">
            Consulta el clima de tu ciudad de salida y llegada en tiempo real.
            Nuestra aplicación te permite consultar el clima de las ciudades de
            salida y llegada para tus vuelos. Esto te ayudará a estar preparado
            para cualquier condición climática.
          </p>

          <button
            onClick={() => (window.location.href = "/weather")}
            className="bg-button text-button-text px-8 py-3 text-lg rounded-full hover:bg-yellow-500 transition-all duration-200 shadow-md"
          >
            Empezar
          </button>
        </div>
      </motion.div>
    </div>
  );
}