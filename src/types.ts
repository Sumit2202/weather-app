export type City = "Toronto" | "Vancouver" | "San Francisco";

export type WeatherType =
  | "Thunderstorm"
  | "Rain"
  | "Drizzle"
  | "Hail"
  | "Snow"
  | "Clear"
  | "Clouds";

export type WeatherInfo = {
  temperature: number;
  day: string;
  type: WeatherType;
};

export interface Temp {
  day: number;
  min: number;
  max: number;
  night: number;
  eve: number;
  morn: number;
}

export interface FeelsLike {
  day: number;
  night: number;
  eve: number;
  morn: number;
}

export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Daily {
  dt: number;
  sunrise: number;
  sunset: number;
  moonrise: number;
  moonset: number;
  moon_phase: number;
  temp: Temp;
  feels_like: FeelsLike;
  pressure: number;
  humidity: number;
  dew_point: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather: Weather[];
  clouds: number;
  pop: number;
  uvi: number;
  rain?: number;
  snow?: number;
}

export interface RootObject {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  daily: Daily[];
}
