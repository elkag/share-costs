import React from 'react';
import { Button, makeStyles } from '@material-ui/core';
import { deepOrange } from '@material-ui/core/colors/';

const useStyles = makeStyles((theme) => ({
    wrapper: {
        display: 'flex',
        justifyContent: 'flex-end',
        paddingTop: '10px'
    },
    submitButton: {
      color: "white",
      backgroundColor: deepOrange[400],
      '&:hover': {
        backgroundColor: deepOrange[600],
      },
    },
  }));

const StyledButton = (props) => {

    const classes = useStyles(makeStyles);
    
    return (
      <div className={classes.wrapper}>
        <Button variant="contained"  
                type="submit"
                onClick={props.onClick} 
                disabled={props.disabled || props.disabled === "true"}
                className={classes.submitButton} >
                    {props.children}
        </Button>
      </div>
    )

}

export default StyledButton