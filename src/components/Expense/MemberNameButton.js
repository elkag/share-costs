import React from 'react';
import { makeStyles, Button } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CheckIcon from '@material-ui/icons/Check';
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
        wrapper: {
            display: 'inline-flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
        },
        member: {
            paddingTop: '10px',
            paddingRight: '10px',
        },
        names: {
            paddingLeft: '10px',
            paddingRight: '10px',
        },
        icon: {
            color: green[600],
        },
    }
));

const MemberNameButton = ({user, isSessionUser, onClick}) => {

    const classes = useStyles(makeStyles);

    const getIcon = () => {
        if(isSessionUser) {
            return <AccountCircleIcon className={classes.icon} />
        }
        return <CheckIcon className={classes.icon} />
    }


    return (
      <div className={classes.wrapper}>
        <Button className={classes.member} disabled={isSessionUser} onClick={onClick}>
            { getIcon() }
            <div className={classes.names}>{user.firstName}&nbsp;{user.lastName}</div>
        </Button> 
      </div>
    )
}

export default MemberNameButton;