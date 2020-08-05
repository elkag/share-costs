import React from 'react';
import { grey } from '@material-ui/core/colors';
import { makeStyles, Paper, Divider } from '@material-ui/core';
import UserDetails from './UserDetails';


const useStyles = makeStyles(theme => ({
    
    wrapper: {
        paddingTop: '20px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    groupWrapper: {
        display: 'flex',
        width: '100%',
        paddingTop: '20px',
    },
    paper: {
        width: '60%',
        alignItems: 'center',
        alignSelf: 'center',
        msAlignSelf: 'center',
    },
    titleWrapper: {
        width: '100%',
        display: 'flex',
    }, 
    titleLeft: {
        alignSelf: 'flex-end',
        height: '30px',
        padding: '1% 1% 1% 2%',
        alignItems: 'center',
        fontWeight: 'bold',
        textAlign: 'left',
        width: '50%',
    }, 
    titleRight: {
        alignSelf: 'flex-start',
        height: '30px',
        padding: '1% 2% 1% 1%',
        alignItems: 'center',
        textAlign: 'right',
        width: '50%',
    },
    description: {
        fontSize: '10pt',
        padding: '1% 2% 2% 2%',
        textAlign: 'left',
        paddingBottom: '30px'
    },
    box: {
        paddingLeft: '10px',
        paddingBottom: '10px',
    },
    namesWrapper: {
        width: '100%',
        marginRight: '10px',
        
    },
    namesGrey: {
        color: grey[400],
        width: '90%',
        alignSelf: 'flex-start',
        marginRight: '20px',
        marginLeft: '28px',
        paddingTop: '3px',
        paddingLeft: '3px',
        paddingBottom: '20px',
        textAlign: 'left',
    },
    total: {
        textAlign: 'right',
        padding: '2% 2% 2% 2%',
        fontWeight: 'bold',
    }

    
}));

const GroupView = ({group}) => {

    const classes = useStyles(makeStyles);

    return (
        (!group ) ? <div /> :
            <div  className={classes.wrapper} >
                <Paper className={classes.paper} elevation={2}>
                    <div className={classes.wrapper}>
                        <div className={classes.titleWrapper}>
                            <div className={classes.titleLeft}>{group.name}</div>
                            <div className={classes.titleRight}><a href="#">New Expences</a></div>
                        </div>
                        <Divider orintation="horisontal" />
                    
                        <div  className={classes.description}>{group.description}</div>
                        <div className={classes.box}>
                            <div className={classes.groupWrapper}>
                                
                                <div className={classes.namesWrapper}>
                                {
                                    group.users.map(user => (
                                        <UserDetails user={user}/>
                                    ))
                                } 
                                </div>
                            </div>
                        </div>
                        {group.pendingUsers.length > 0 && <Divider orintation="horisontal" />}
                        <div className={classes.groupWrapper}>
                            <div className={classes.namesWrapper}>
                            {
                                group.pendingUsers.map(user => (
                                        <div className={classes.namesGrey}>
                                            {user.firstName}&nbsp;{user.lastName}
                                        </div>
                                ))
                            } 
                            </div>
                        </div>
                    </div>
                    <Divider orintation="horisontal" />
                    <div className={classes.total}>Balance: {group.balance}</div>
                </Paper>
            </div>
    )
    
}

export default GroupView;