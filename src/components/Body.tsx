import React, { useState, useEffect } from 'react';
import { Container, Grid, Button, TextField } from '@material-ui/core';
import ContentCard from './ContentCard';
import { getWeatherByCityId, getWeatherByCityName } from '../actions/getWeather';
import { cityWeatherDummyData } from '../utils/cityWeatherDummyData';
import { getLocalStorageData } from '../utils/getLocalStorageData';
import { CityWeather } from '../interfaces';

const DEFAULT_CITY_ID = 3451190; // Rio de Janeiro - RJ

const Body = ({ currentTheme }: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [cityName, setCityName] = useState<string>('');
  const [formattedCityName, setFormattedCityName] = useState<string>('');
  const [cityWeather, setCityWeather] = useState<CityWeather>(cityWeatherDummyData);

  const getCityWeather = async () => {
    const cityWeather: CityWeather = await getWeatherByCityName(cityName);

    setCityWeather(cityWeather);

    const localStorageData = getLocalStorageData()!;
    const localStorageJsonData = JSON.parse(localStorageData);

    const localStorageSaveData = {
      ...localStorageJsonData,
      cityId: cityWeather.id,
      cityName: cityWeather.name,
      cityCoordinates: {
        latitude: cityWeather.coord.lat,
        longitude: cityWeather.coord.lon
      },
      lastUpdated: new Date().toISOString()
    };
    setFormattedCityName(localStorageSaveData.cityName);

    localStorage.setItem('weather-ui-data', JSON.stringify(localStorageSaveData));
  }

  const handleOnChangeInput = (event: any) => {
    setCityName(event.target.value);
  }

  const handleEnterKey = (event: any) => {
    if (event.code === 'Enter') getCityWeather();
  }

  const handleClickOnSearch = async () => {
    getCityWeather();
  }

  useEffect(() => {
    const test = async () => {
      const localStorageData = getLocalStorageData()!;

      let cityId = DEFAULT_CITY_ID;
      if (localStorageData) {
        const localStorageJsonData = JSON.parse(localStorageData);
        cityId = localStorageJsonData.cityId;
        setFormattedCityName(localStorageJsonData.cityName);
      }

      const cityWeather = await getWeatherByCityId(cityId);
      setCityWeather(cityWeather);
      setIsLoading(false);
    }

    test();
  }, []);

  return (
    <Container maxWidth="xs" style={{ paddingTop: 15 }}>
      <Grid container spacing={2} justify="center" alignItems="center" direction="column">
        <Grid item xs={12} container direction="row" spacing={1}>
          <Grid item xs={8}>
            <TextField
              label="Search City"
              variant="filled"
              defaultValue={formattedCityName}
              onChange={handleOnChangeInput}
              onKeyPress={handleEnterKey}
              autoComplete="false"
              size="small"
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <Button
              variant="contained"
              style={{ height: '100%' }}
              onClick={handleClickOnSearch}
              disabled={cityName.length < 3}
              fullWidth
            >
              Search
            </Button>
          </Grid>
         </Grid>
        {
          isLoading ?
            (
              <Grid item xs>Loading...</Grid>
            ) : (
              <Grid item xs>
                <ContentCard cityWeather={cityWeather} theme={currentTheme.palette.type}/>
              </Grid>
            )
        }
      </Grid>
    </Container>
  );
}

export default Body;