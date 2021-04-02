import axios from 'axios';

const WEATHER_API_URL = process.env.NEXT_PUBLIC_WEATHER_API_URL;
const WEATHER_API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

export const getWeatherByCityName = (cityName: string) => axios.get(`${WEATHER_API_URL}?units=metric&q=${cityName}&appid=${WEATHER_API_KEY}`);

export const getWeatherByCityId = (ciyId: number) => axios.get(`${WEATHER_API_URL}?units=metric&id=${ciyId}&appid=${WEATHER_API_KEY}`);