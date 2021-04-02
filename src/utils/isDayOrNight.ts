export const isDayOrNight = (openWeatherNow: number, sunSet: number) => {
  const openWeatherNowObject = new Date(+`${openWeatherNow}000`);
  const openWeatherSunSetObject = new Date(+`${sunSet}000`);

  return openWeatherNowObject > openWeatherSunSetObject ? 'n' : 'd';
}