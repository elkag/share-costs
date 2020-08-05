import React, { Fragment } from 'react';
import { IconButton, Menu, MenuItem, makeStyles } from '@material-ui/core';
import { UserContext } from '../../contexts/userContext';
import { deepOrange, blue } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
    avatar: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[400],
        width: theme.spacing(6),
        height: theme.spacing(6),
        fontSize: '11pt',
        fontWeight: 'bold',
        '&:hover': {
            backgroundColor: 'white',
            color: blue[800],
          }

    },
    menu: {
        marginTop:'100px'
    },
}
));

const ProfileButton = ({logOutHandler}) => {

    const [context, ] = React.useContext(UserContext);
    
    const classes = useStyles(makeStyles);

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        console.log(event.currentTarget)
        setAnchorEl(document.getElementById('menu_container'));
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
    
    const logOut = (event) => {
        logOutHandler();
        handleClose();
    }

    return (
        <Fragment>
            <IconButton className={classes.avatar} onClick={ handleClick }>
                {context.user.firstName[0] + context.user.lastName[0]}
            </IconButton>
            <div id="menu_container" className={classes.menu} />
                
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={logOut}>Logout</MenuItem>
            </Menu>
        </Fragment>
    )
}

export default ProfileButton;