import React, { useState } from 'react';
import { makeStyles, InputLabel, MenuItem, Select, createMuiTheme, ThemeProvider } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import { weights } from './constants/constants';

const useStyles = makeStyles(theme => ({
      wrapper: {
      }
}));

const theme = createMuiTheme({
    
    palette: {
      primary: {
        main: green[600],
        backgroundColor: 'transparent',
      }
    },
    overrides: {
        MuiSelect: {
            select: {
                '&$select': {
                    backgroundColor: 'transparent',
                },
        },
      },
      MuiInput: {
        root: {
            width: '60px',
        },
      }
    }
  });

const MemberWeightSelector = ({value, onChange, disabled}) => {
   
    const classes = useStyles(makeStyles);

    const [, setWeight] = useState(1);

    const handleChange = (event) => {
        const value = event.target.value;
        setWeight(value);
        onChange(value)
    }

    return (
        <div className={classes.wrapper}>
        <ThemeProvider theme={theme}>
            
                <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                    Weight
                </InputLabel>
                <Select
                    disabled={disabled}
                    labelId="demo-simple-select-placeholder-label-label"
                    id="demo-simple-select-placeholder-label"
                    value={value}
                    onChange={handleChange}
                >
                {
                    weights.map(weight => (
                        <MenuItem value={weight.value}>{weight.value}</MenuItem>
                    ))
                }
                </Select>
        
      </ThemeProvider>
      </div>
    )
    
    
}

export default MemberWeightSelector;