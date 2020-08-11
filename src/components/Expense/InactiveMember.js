import React, { useContext } from 'react';
import { UserContext } from '../../contexts/userContext';
import { makeStyles, Fade, Button } from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
    wrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: '20px',
        paddingRight: '20px',
        paddingTop: '10px',
        paddingBottom: '10px',
    },
    member: {
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-start',
        paddingTop: '10px',
    },
    names: {
        paddingLeft: '10px',
    },
    icon: {
        color: red[600],
    },
}));

const InactiveMember = ({user, onClickUser}) => {

    const [session, ] = useContext(UserContext);

    const IS_SESSION_USER = user.id === session.user.id;

    const classes = useStyles(makeStyles);

    const renderUser = () => {
        return (
            <div className={classes.wrapper}>
                <Button 
                    className={classes.member} 
                    disabled={IS_SESSION_USER} 
                    onClick={onClickUser}>

                    <HighlightOffIcon className={classes.icon}/>
                    <div className={classes.names}>
                        {user.firstName}&nbsp;{user.lastName}
                    </div>
                </Button>                    
            </div>
        )
    }

    return (
        <Fade in={true}  timeout={600}>
            { renderUser(user)}
        </Fade>
    )
}

export default InactiveMember;