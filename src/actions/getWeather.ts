import {
  getWeatherByCityName as getWeatherByCityNameService,
  getWeatherByCityId as getWeatherByCityIdService
} from '../services/getWeather';

export const getWeatherByCityName = async (cityName: string) => {
  const { data: data } = await getWeatherByCityNameService(cityName);
  return data;
}

export const getWeatherByCityId = async (cityId: number) => {
  const { data: data } = await getWeatherByCityIdService(cityId);
  return data;
}