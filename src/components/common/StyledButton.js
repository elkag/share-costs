import React from 'react';
import { Button, makeStyles } from '@material-ui/core';
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
    submitButton: {
        color: theme.palette.getContrastText(green[700]),
        backgroundColor: green[600],
        width: '120px',
        '&:hover': {
        backgroundColor: green[600],
        corners: '0dp',
        width: '120px'
        },
    }
}))

const StyledButton = (props) => {

    const classes = useStyles(makeStyles);
    
    return (
        <Button variant="contained"  
                onClick={props.onClick} 
                disabled={props.disabled}
                className={classes.submitButton} >
                    {props.children}
        </Button>
    )

}

export default StyledButton