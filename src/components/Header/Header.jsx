import React, { Fragment } from 'react';
import AddRoundedIcon from '@material-ui/icons/AddRounded';

// Components
import GroupIcon from '@material-ui/icons/Group';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import AddIcon from '@material-ui/icons/Add';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import { useHistory } from 'react-router-dom';
import { deleteSessionCookie } from '../../config/session';
import LeftMenu from '../LeftMenu/LeftMenu';
import HeaderIcon from './HeaderIcon';
import LoginButton from './LoginButton';

// Config
import { UserContext } from '../../contexts/userContext';
import { MY_GROUPS_PAGE, CREATE_GROUP_PAGE, LOGIN_PAGE, ABOUT_PAGE } from '../../config/routes';

// Styles
import { makeStyles } from '@material-ui/core';
import { mainGreen } from '../../styles/colors';


const useStyles = makeStyles(theme => ({
        header: {
            backgroundColor: mainGreen,
            width: '100%',
            color: 'white',
            display: 'flex',
            flexDirection: 'row',
            alignContent: 'space-between',
            height: '90px',
            alignItems: 'center'
        },
        menuIconsWrapper: {
            paddingLeft: '16px',
            display: 'flex',
            width: '100%',
            alignItems: 'left',
            justifyContent: 'flex-start',
            textAlign: 'center',
        },
        mainIconsWrapper: {
            display: 'flex',
            width: '100%',
            alignItems: 'right',
            justifyContent: 'flex-end',
            textAlign: 'center',
        },
        userInfo: {
            position: 'relative',
            top: '10px',
            bottom: '20px',
            width: '100%',
            textAlign: 'left',
        }
    }
  ));
  
const Header = () => {

    const history = useHistory();

    const classes = useStyles();
    const [session, setSession] = React.useContext(UserContext);

    const logOut = () => {
        deleteSessionCookie();
        setSession({user: null});
    }

    const onCreateNewGroup = () => {
        history.push(CREATE_GROUP_PAGE)
    }

    const onViewGroups = () => {
        history.push(MY_GROUPS_PAGE);
    }

    const onAboutThisApp = () => {
        history.push(ABOUT_PAGE);
    }
    const menuList = [
        {
            key: 'My groups',
            icon: <GroupIcon />,
            onClick: onViewGroups,
            position: 'top'
        },{
            key: 'Create group',
            icon: <AddIcon />,
            onClick: onCreateNewGroup,
            position: 'top'
        },{
            key: 'About this app',
            icon: <InsertEmoticonIcon />,
            onClick: onAboutThisApp,
            position: 'top'
        },
        {
            key: 'Logout',
            icon: <InboxIcon />,
            onClick: logOut,
            position: 'bottom'
        },
        {
            key: session.user && <div className={classes.userInfo}>
                    <div>{session.user.firstName}&nbsp;{session.user.lastName}</div>
                    <div>{session.user.email}</div>
                </div>,
            position: 'user-info'
        }
    ];

    return (
        <div className={classes.header}>
                {
                   session && session.user ? ( 
                    <Fragment> 
                        <div className={classes.menuIconsWrapper}>
                            <LeftMenu menuList={menuList} />
                        </div>
                        <div className={classes.mainIconsWrapper}>
                            <HeaderIcon label="Groups" onClick={() => history.push(MY_GROUPS_PAGE)}>
                                <GroupIcon/>
                            </HeaderIcon>
                            <HeaderIcon label="New"  onClick={() => history.push(CREATE_GROUP_PAGE)}>
                                <AddRoundedIcon />
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