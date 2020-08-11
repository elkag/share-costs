import React from 'react';
import { CircularProgress, Backdrop, ThemeProvider, makeStyles } from '@material-ui/core';
import { theme } from './theme';
import { blue } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
  wrapper: {
    position: 'absolute',
    top: '0',
    bottom: '0',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex:'789',
    color: blue[700],
  }
  
}));

const PageBackdrop = ({loading}) => {


  const classes = useStyles(makeStyles);

  return (
    <ThemeProvider theme={theme}>
      <Backdrop open={loading}>
            <CircularProgress color="inherit" />
      </Backdrop>
    </ThemeProvider>
  )
}


export default PageBackdrop;