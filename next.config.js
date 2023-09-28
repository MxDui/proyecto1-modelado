/** @type {import('next').NextConfig} */
const nextConfig = {
  // add image domain
  images: {
    domains: ["vuela.aeromexico.com", "openweathermap.org"],
  },
};

module.exports = nextConfig;