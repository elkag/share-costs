import React from 'react';
import { CircularProgress, Backdrop, ThemeProvider } from '@material-ui/core';
import { theme } from './theme';

const PageBackdrop = ({isLoading}) => {


  return (
    <ThemeProvider theme={theme}>
      <Backdrop open={isLoading}>
            <CircularProgress color="inherit" />
      </Backdrop>
    </ThemeProvider>
  )
}


export default PageBackdrop;