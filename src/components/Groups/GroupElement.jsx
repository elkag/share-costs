import React from 'react';
import { grey, deepOrange } from '@material-ui/core/colors';
import { makeStyles, Button, Fade } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { VIEW_GROUP_PAGE } from '../../config/routes';


const useStyles = makeStyles(theme => ({
    root: { 
        fontFamily: 'Arial, Helvetica, sans-serif',
        color: grey[900],
        display: 'flex',
        marginTop: '5px',
        marginBottom: '5px',
        border: "1px solid",
        borderColor:  grey[100],
        borderRadius: '5px',
        backgroundColor: 'rgba(253, 252, 252, 1)',
        paddingTop: '8px',
        paddingBottom: '8px',
        width: '100%',
        textTransform: "none"
    },
    label: {
        alignItems: 'none',
    },
    firstColumnWrapper: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        alignContent: 'top',
    },
    secondColumnWrapper: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        alignContent: 'stretch',
        
    },
    title: {
        fontWeight: 'bold',
        fontSize: '12pt',
        color: grey[800],
        paddingBottom: '5px',
    },
    description: {
        fontSize: '10pt',
        color: grey[700],
        paddingBottom: '20px',
    },
    participants: {
        fontSize: '10pt',
        color: grey[800],
    },
    status: {
        fontWeight: 'bold',
        fontSize: '10pt',
        color: deepOrange[700],
        height: '100%',
    },
    balance: {
        fontWeight: 'bold',
        fontSize: '10pt',
        height: '100%',
    },
  }
  ));
const GroupElement = ({group}) => {

    const history = useHistory();
    const classes = useStyles(makeStyles);

    return (
        <Fade in={true} out={true}>
        <Button className={classes.root} onClick={() => history.push(VIEW_GROUP_PAGE + group.id)}>
            <div className={classes.firstColumnWrapper}>
                <div className={classes.title}>{group.name}</div>
                <div className={classes.description}>{group.description}</div>
                <div className={classes.participants}>Participants: {group.users.length}</div>
                
            </div>
            <div className={classes.secondColumnWrapper}>
                <div className={classes.status}>{group.status.toUpperCase()}</div>
                <div className={classes.balance}>Balance: {group.balance}</div>
            </div>
        </Button>
        </Fade>
    )
    
}

export default GroupElement;