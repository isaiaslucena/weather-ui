// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';

export type User = {
  id: number
  name: string
}

export type CityWeather = {
  coord: {
    lon: number
    lat: number
  }
  weather: [
    {
      id: number
      main: string
      description: string
      icon: string
    }
  ],
  base: string,
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    humidity: number
  },
  visibility: number
  wind: {
    speed: number
    deg: number
  },
  clouds: {
    all: number
  },
  dt: number
  sys: {
    type: number
    id: number
    country: string
    sunrise: number
    sunset: number
  },
  timezone: number
  id: number
  name: string
  cod: number
}

export type LocalStorageData = {
  cityId: number;
  cityName?: string;
  cityCoordinates?: {
    latitude: number;
    longitude: number;
  };
  theme?: string;
  lastUpdated?: string;
}