import { CityWeather } from '../interfaces';

/** Dummy user data. */
export const cityWeatherDummyData: CityWeather = {
    coord: {
        lon: -43.2075,
        lat: -22.9028
    },
    weather: [
        {
            id: 802,
            main: "Clouds",
            description: "scattered clouds",
            icon: "03n"
        }
    ],
    base: "stations",
    main: {
        temp: 300.15,
        feels_like: 304.43,
        temp_min: 300.15,
        temp_max: 300.15,
        pressure: 1014,
        humidity: 89
    },
    visibility: 10000,
    wind: {
        speed: 3.09,
        deg: 160
    },
    clouds: {
        all: 40
    },
    dt: 1616199337,
    sys: {
        type: 1,
        id: 8429,
        country: "BR",
        sunrise: 1616144172,
        sunset: 1616187892
    },
    timezone: -10800,
    id: 3451190,
    name: "Rio de Janeiro",
    cod: 200
}