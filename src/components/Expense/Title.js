import React from 'react';
import { IconButton, makeStyles } from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const useStyles = makeStyles(theme => ({
    title: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontWeight: 'bold', 
       
    },
    titleLeft: {
        paddingLeft: '20px'
    }, 
}));

const TitledHeader = ({title, onClose}) => {

    const classes = useStyles(makeStyles);

    return (
        <div className={classes.title}>
            <div className={classes.titleLeft}>{title}</div>
            <IconButton onClick={onClose}>
                <HighlightOffIcon />
            </IconButton>
        </div>
    )
}

export default TitledHeader