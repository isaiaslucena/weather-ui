import React, { useState, useEffect } from 'react';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { darkTheme, lightTheme } from '../themes/themes';
import { MdBrightness4 } from 'react-icons/md';
import Head from 'next/head';
import Body from './Body';
import { getLocalStorageData } from '../utils/getLocalStorageData';
import { LocalStorageData } from '../interfaces';

const Layout = () => {
  const [currentTheme, setCurrentTheme] = useState(lightTheme);

  const changeThemeHandler = () => setCurrentTheme(theme => {
    const newTheme = theme.palette.type === 'dark' ? lightTheme : darkTheme
    const localStorageData = getLocalStorageData()!;

    const localStorageJsonData = JSON.parse(localStorageData);
    const localStorageSaveData = {
      ...localStorageJsonData,
      theme: newTheme.palette.type
    };

    localStorage.setItem('weather-ui-data', JSON.stringify(localStorageSaveData));

    return newTheme;
  });

  useEffect(() => {
    const localStorageStringData = getLocalStorageData()!;
    const localStorageData: LocalStorageData = JSON.parse(localStorageStringData);
    if (localStorageStringData && localStorageData.theme) {
      const newTheme = localStorageData.theme === 'dark' ? darkTheme : lightTheme;
      setCurrentTheme(newTheme);
    }
  }, []);

  return (
    <ThemeProvider theme={currentTheme}>
      <Head>
        <title>Weather-UI</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link href="/assets/css/owfont-regular.min.css" rel="stylesheet" type="text/css" />
      </Head>
      <CssBaseline />
      <IconButton onClick={changeThemeHandler}>
        <MdBrightness4 />
      </IconButton>
      <Body currentTheme={currentTheme} />
    </ThemeProvider>
  )
}

export default Layout;
