import React from 'react';
import {green, red, grey } from '@material-ui/core/colors';
import { makeStyles, Paper, Divider } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
    
    center: {
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
    balancePaper: {
        width: '60px',
        height: '20px',
        borderRadius: '3px',
        color: 'white',
        backgroundColor: red[400],
        fontWeight: 'bold',
        fontSize: '9pt',
        textAlign: 'center',
    },
    balancePaperGreen: {
        width: '60px',
        height: '20px',
        borderRadius: '3px',
        color: 'white',
        backgroundColor: green[400],
        fontWeight: 'bold',
        fontSize: '9pt',
        textAlign: 'center',
    },
    balancePaperGrey: {
        width: '60px',
        height: '20px',
        borderRadius: '3px',
        color: 'white',
        backgroundColor: grey[400],
        fontWeight: 'bold',
        fontSize: '9pt',
        textAlign: 'center',
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
        width: '50%',
        
    },
    names: {
        width: '90%',
        alignSelf: 'flex-end',
        marginRight: '20px',
        paddingTop: '3px',
        paddingLeft: '3px',
        paddingBottom: '20px',
        textAlign: 'right',
    },
    namesGrey: {
        color: grey[400],
        width: '90%',
        alignSelf: 'flex-end',
        marginRight: '20px',
        paddingTop: '3px',
        paddingLeft: '3px',
        paddingBottom: '20px',
        textAlign: 'right',
    },
    table: {
        tableLayout: 'auto',
    },
    total: {
        textAlign: 'right',
        padding: '2% 2% 2% 2%',
    }

    
}));
/**
 * Group example responce:
 * 
 * {
  "id": "2b45ade7-5298-4d2f-925c-518e8a8bbeac",
  "name": "My group",
  "owner": {
      "id": String,
      "username": String,
      "firstName": String,
      "lastName": String,
      "email": String
      "balance": String
  },
  "date": "2020-07-31T14:50:23.028+0000",
  "status": String,
  "balance": Integer,
  "description": String,
  "users": [
      {
          "id": String,
          "username": String,
          "firstName": String,
          "lastName": String,
          "email": String,
          "balance": String
      }, ...
  ],
  "pendingUsers": [
      {
         "id": String,
          "username": String,
          "firstName": String,
          "lastName": String,
          "email": String,
          "balance": String
      }, ...
  ]
}*/

//const useStyles = makeStyles(theme => ({));
const GroupView = ({group}) => {

    const classes = useStyles(makeStyles);

    return (
        (!group ) ? <div /> :
            <div  className={classes.center} >
            <Paper className={classes.paper} elevation={2}>
            <div className={classes.center}>
                <div className={classes.titleWrapper}>
                    <div className={classes.titleLeft}>{group.name}</div>
                    <div className={classes.titleRight}><a href="#">Add People</a></div>
                </div>
                <Divider orintation="horisontal" />
               
                <div  className={classes.description}>{group.description}</div>
                <div className={classes.box}>
                
                <div className={classes.groupWrapper}>
                    <div className={classes.namesWrapper}>
                    {
                    group.users.map(user => (
                        <div className={classes.names}>{user.firstName}&nbsp;{user.lastName}</div>
                    ))
                    } 
                    
                    </div>
                    <div className={classes.namesWrapper}>
                    {
                    group.users.map(user => (
                        <div className={classes.names} onClick={() => console.log(user.balance)}>
                            {
                                (user.balance < 0) ?
                                    <div className={classes.balancePaper}>{user.balance}</div>
                                    :
                                    <div className={classes.balancePaperGreen}>{user.balance}</div>
                                
                            }
                        
                        </div>
                    ))}`
                
                </div>
                
            </div>
            {group.pendingUsers.length > 0 && <Divider orintation="horisontal" />}
            <div className={classes.groupWrapper}>
                    <div className={classes.namesWrapper}>
                    {
                    group.pendingUsers.map(user => (
                        <div className={classes.namesGrey}>{user.firstName}&nbsp;{user.lastName}</div>
                    ))
                    } 
                    
                    </div>
                    <div className={classes.namesWrapper}>
                    {
                    group.pendingUsers.map(user => (
                        <div className={classes.names} onClick={() => console.log(user.balance)}>
                            <div className={classes.balancePaperGrey}>...</div>
                        
                        </div>
                    ))}
                
                </div>
                
            </div>
            </div>
          </div>
          
          <Divider orintation="horisontal" />
          
          <div className={classes.total}>Total: {group.balance}</div>
          </Paper>
          </div>
    )
    
}

export default GroupView;