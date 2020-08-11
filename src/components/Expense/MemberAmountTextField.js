import React from 'react';
import { TextField, makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import {selectValue} from './utils/selectFieldOnFocus'

const useStyles = makeStyles(theme => ({
    wrapper: {
      display: 'inline-flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingLeft: '20%'
    },
  }
));

const theme = createMuiTheme({

  palette: {
    primary: {
        main: green[500]
    }
 },
  overrides: {
    MuiInputBase: {
          root: {
            width: '100px',
        },
      },
    },
});

const MemberAmountTextField = ({amount, maxValue, disabled, onChange}) => {

    const classes = useStyles(makeStyles);
  
    const handleChange = (event) => {
      let valueStr = event.target.value;

      if(valueStr.charAt(0) === '0' && valueStr.charAt(1) && valueStr.charAt(1) !== '.') {
          return;
      }

     if(valueStr === '') {
          return onChange(0);
      }

      let value;
      if(!isNaN(valueStr)) {
        
        value = parseFloat(valueStr);

        if(value > maxValue) {
          return onChange(maxValue.toString());
        }

        return onChange(valueStr);

      }
    }
    
    return (
      <div className={classes.wrapper}>
        <ThemeProvider theme={theme}>
          <TextField
                  onFocus={selectValue}
                  onChange={handleChange}
                  type="text" 
                  id="outlined-secondary"
                  disabled={disabled}
                  required 
                  value={amount}
                  variant="outlined" 
                  size="small" />
      </ThemeProvider>
      </div>
    )
}

export default MemberAmountTextField;