type Coordinates = {
  lat: number;
  lon: number;
};

type Ticket = {
  num_ticket: string;
  origin: string;
  destination: string;
  origin_latitude: number;
  origin_longitude: number;
  destination_latitude: number;
  destination_longitude: number;
};

type WeatherData = {
  temperature: number;
  status: string;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
  icon: string;
};

type BoletoDecoded = {
  departureCoords: Coordinates;
  arrivalCoords: Coordinates;
  departureCity: string;
  arrivalCity: string;
};

export type { Coordinates, Ticket, BoletoDecoded, WeatherData };
