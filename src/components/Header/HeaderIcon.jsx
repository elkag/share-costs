import React from 'react';
import { IconButton, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    iconWrapper: {
        width: '92px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginRight: '16px',
        marginLeft: '16px',
        marginBottom: '5px',
        spaceBetween: "30px",
    },
    icon: {
        color: "white", 
        backgroundColor: '#4685ce',
        spaceBetween: '16px',
        '&:hover': {
            backgroundColor: '#2963a5'
          }
    },
    label: {
        marginTop: '10px',
        color: "white",
        fontSize: '9pt',
        fontStyle: 'italic',
        fontFamily: 'Arial, Helvetica, sans-serif',
    },
}
));

const HeaderIcon = (props) => {

    const classes = useStyles(makeStyles);

    return (
        <div className={classes.iconWrapper}>
            <IconButton className={classes.icon} onClick={props.onClick}>
                {props.children}
            </IconButton>
            <div className={classes.label}>
                {props.label}
            </div>
        </div>
    )
}

export default HeaderIcon;