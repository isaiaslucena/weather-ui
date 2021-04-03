import React from 'react';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Box
} from '@material-ui/core';
import { blueGrey } from '@material-ui/core/colors';
import { CityWeather } from '../interfaces'
import { isDayOrNight } from '../utils/isDayOrNight';

const blueGrey100 = blueGrey[100];
const blueGrey600 = blueGrey[600];

type CardMediaChildrenProps = {
  cityWeather: CityWeather;
  iconId: number;
};

type ContentCardProps = {
  cityWeather: CityWeather;
  theme: string;
};

const CardMediaChildren = ({ cityWeather, iconId }: CardMediaChildrenProps) => {
  const nowDateTime = cityWeather.dt;
  const sunSetDateTime = cityWeather.sys.sunset;
  const isNowDayOrNight = isDayOrNight(nowDateTime, sunSetDateTime);
  const iconClassName = `owf owf-${iconId}-${isNowDayOrNight} owf-5x`;

  return (
    <Box p={1}>
      <Grid container spacing={0}>
        <Grid item xs={8} container direction="row">
          <Grid item>
            <i className={iconClassName} style={{ marginRight: 5 }} />
          </Grid>
          <Grid item>
            <Typography variant="h3" component="h3">
              {`${Math.ceil(cityWeather.main.temp)}°C`}
            </Typography>
          </Grid>
        </Grid>
        <Grid item container spacing={0}>
          <Typography variant="body1" component="span">
            {`Feels like ${Math.ceil(cityWeather.main.feels_like)}°C`}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  )
};

const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

const ContentCard = ({ cityWeather, theme }: ContentCardProps) => {
  const cityLatitude = cityWeather.coord.lat;
  const cityLongitude = cityWeather.coord.lon;
  const googleStaticMapsUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${cityLatitude},${cityLongitude}&markers=size:mid|color:red|${cityLatitude},${cityLongitude}&zoom=11&size=400x400&maptype=terrain&key=${GOOGLE_API_KEY}`

  return (
    <Card>
      <CardMedia
        component="div"
        style={{ height: 180, backgroundColor: theme === 'dark' ? blueGrey600 : blueGrey100 }}
        children={<CardMediaChildren cityWeather={cityWeather} iconId={cityWeather.weather[0]['id']} />}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
            {`${cityWeather.name} - ${cityWeather.sys.country}`}
          </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
            {cityWeather.weather[0].description}
        </Typography>
      </CardContent>
      <CardActions>
          <img src={googleStaticMapsUrl} style={{ width: '100%' }} />
      </CardActions>
        {/* <CardMedia
          alt="Temperature"
          component="img"
          style={{ height: 180 }}
          image="https://material-ui.com/static/images/cards/contemplative-reptile.jpg"
          title="Temperature"
        /> */}
    </Card>
  )
};

export default ContentCard;
