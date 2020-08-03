import React, { Fragment } from 'react';
import GroupIcon from '@material-ui/icons/Group';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import EuroIcon from '@material-ui/icons/Euro';

// Components
import HeaderIcon from './HeaderIcon';
import ProfileButton from './ProfileButton';
import LoginButton from './LoginButton';

// Config
import { UserSessionContext } from '../../contexts/userContext';
import { MY_GROUPS_PAGE, CREATE_GROUP_PAGE } from '../../config/routes';

// Styles
import styles from './header.module.css';
import { makeStyles } from '@material-ui/core';

import { useHistory } from 'react-router-dom';

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
    const [session, ] = React.useContext(UserSessionContext);
    

    return (
        <div className={styles.header}>
                {
                   session && session.user && session.user !== {} ? ( 
                    <Fragment> 
                        <ProfileButton />
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
                                <LoginButton />
                            </Fragment>
                    )  
                }
            </div>
    );
}

export default Header;