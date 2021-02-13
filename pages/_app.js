import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../styles/theme';
import '../styles/globals.css'
import {Router} from 'next/dist/client/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import '../styles/appbar.css'

Router.events.on('routeChangeStart',()=>{
  NProgress.start()
})
Router.events.on('routeChangeComplete',()=>{
  NProgress.done()
})
Router.events.on('routeChangeError',()=>{
  NProgress.done()
})
export default function MyApp(props) {
  const { Component, pageProps } = props;
  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  return (
    <React.Fragment>
      <Head>
        <title>Receipe App</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />

        <meta charset="utf-8" />
        <link rel="image_src" href="%PUBLIC_URL%/logo192.png"/>
        <link rel="icon" href="%PUBLIC_URL%/logo192.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <link rel="apple-touch-icon" href="%PUBLIC_URL%/assets/lawlogo192.webp" />
        <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />

      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </React.Fragment>
  );
}
MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};