import React, { Fragment } from 'react';
import GroupIcon from '@material-ui/icons/Group';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import EuroIcon from '@material-ui/icons/Euro';

// Components
import HeaderIcon from './HeaderIcon';
import ProfileButton from './ProfileButton';
import LoginButton from './LoginButton';

// Config
import { UserContext } from '../../contexts/userContext';
import { MY_GROUPS_PAGE, CREATE_GROUP_PAGE, LOGIN_PAGE } from '../../config/routes';

// Styles
import styles from './header.module.css';
import { makeStyles } from '@material-ui/core';

import { useHistory } from 'react-router-dom';
import { deleteSessionCoockie } from '../../config/session';

const useStyles = makeStyles(theme => ({
        mainIconsWrapper: {
            display: 'flex',
            width: '100%',
            alignItems: 'right',
            justifyContent: 'flex-end',
            textAlign: 'center',
            paddingRight: '2%'
        }
    }
  ));
  
const Header = () => {

    const history = useHistory();

    const classes = useStyles();
    const [user, setUser] = React.useContext(UserContext);

    const logOut = () => {
        deleteSessionCoockie("session");
        setUser({});
    }

    return (
        <div className={styles.header}>
                {
                   user && user.user && user.user !== {} ? ( 
                    <Fragment> 
                        <ProfileButton logOutHandler={logOut}/>
                        <div className={classes.mainIconsWrapper}>
                            <HeaderIcon label="My Groups" onClick={() => history.push(MY_GROUPS_PAGE)}>
                                <GroupIcon/>
                            </HeaderIcon>
                            <HeaderIcon label="Create Group"  onClick={() => history.push(CREATE_GROUP_PAGE)}>
                                <GroupAddIcon />
                            </HeaderIcon>
                            <HeaderIcon label="Make Payment"  onClick={() => null }>
                                <EuroIcon />
                            </HeaderIcon>
                        </div>
                        </Fragment>
                        ) : (
                            <Fragment>
                                <LoginButton onClick={() => history.push(LOGIN_PAGE)} />
                            </Fragment>
                    )  
                }
            </div>
    );
}

export default Header;