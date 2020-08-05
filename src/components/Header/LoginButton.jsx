import React from 'react';
import { IconButton, makeStyles } from '@material-ui/core';
import { deepOrange, blue } from '@material-ui/core/colors';
import { LOGIN_PAGE } from '../../config/routes';
import { useHistory } from 'react-router-dom';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles(theme => ({
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[400],
        width: theme.spacing(5),
        height: theme.spacing(5),
        fontSize: '12pt',
        fontWeight: 'bold',
        '&:hover': {
            backgroundColor: 'white',
            color: blue[800],
          }

    },
    icon: {
       
        width: theme.spacing(5),
        height: theme.spacing(5),
        fontSize: '12pt',
        fontWeight: 'bold',
        '&:hover': {
            color: blue[800],
          }

    },
    label: {
        marginTop: '5px',
        color: "white",
        fontSize: '9pt',
        fontFamily: 'verdana',
    },
}
));

const LoginButton = ({onClick}) => {
    const classes = useStyles(makeStyles);

    return (
        <div clasName={classes.wrapper}>
            <IconButton className={classes.avatar} onClick={ onClick }>
                <AccountCircleIcon className={classes.icon} />
            </IconButton>
            <div data-test-id="login-button-label" className={classes.label}>
                Log In
            </div>
        </div>
    )
}

export default LoginButton;