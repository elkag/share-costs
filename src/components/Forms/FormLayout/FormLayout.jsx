import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    loginPageWrapper: {
        marginTop: '20px',
        width: '100%',
        minHeight: '100%',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      },
      container: {
        minHeight: '100%',
        width: '100%',
        borderRadius: '5px',
        backgroundColor: '#f2f2f2',
        maxWidth: '280px',
        padding: '10px'
      }
}))

const FormLayout = (props) => {

    const classes = useStyles(makeStyles);
    
    return (
        <div className={classes.loginPageWrapper}>
            <div className={classes.container}>
                {props.children}
            </div>
        </div>
    )
}

export default FormLayout;