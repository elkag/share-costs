import React from 'react';
import PropTypes from 'prop-types';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { green } from '@material-ui/core/colors';

const theme = createMuiTheme({
    palette: {
       primary: {
           main: green[500]
       }
    }
  })

export const LinearProgressWithLabel = (props) => {


    return (
        <Box display="flex" alignItems="center" alignSelf="center">
        <Box width="90%" mr={1}>
            <ThemeProvider theme={theme}>
                <LinearProgress variant="determinate" color="primary" {...props} />
            </ThemeProvider>
        </Box>
        <Box minWidth={35}>
            <Typography variant="body2" color="textSecondary">{`${Math.round(
            props.value,
            )}%`}</Typography>
        </Box>
        </Box>
    );
}

LinearProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};