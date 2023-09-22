class Weather {
  API_KEY = "dbf5f10790f13c6f593d7e9e04f5b786";
  async getWeather(city: string) {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.API_KEY}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch weather data: ${response.statusText}`);
      }

      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error fetching weather data:", error);
      throw error;
    }
  }

  async getWeatherByCoords(lat: number, lon: number) {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.API_KEY}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch weather data: ${response.statusText}`);
      }

      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error fetching weather data:", error);
      throw error;
    }
  }
}

const weatherInstance = new Weather();

export default weatherInstance;
