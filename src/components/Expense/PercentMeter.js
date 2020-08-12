import React, { useEffect } from 'react';
import useInterval from './hooks/useInterval';
import { LinearProgressWithLabel } from './LinearProgress';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    wrapper: {
        width: '80%',
    },
    progress: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
    }
}));

const PercentMeter = ({ value }) => {

    const [progress, setProgress] = React.useState(value);
    const [delay, setDelay] = React.useState(null);
    
    const classes = useStyles(makeStyles);
      
    useInterval(() => {
        setProgress(
            (prevProgress) => {
                if(prevProgress < value){
                   return prevProgress + 5;
                }
                if(prevProgress > value) {
                    return prevProgress - 5;
                }
            } 
        );

        if(progress > value - 5 && progress < value + 5) {
            setProgress(value);
            setDelay(null);
        }
    }, delay);

    useEffect(() => {
        setDelay(10);
    },[value])

    return (
        <div>
            <div className={classes.progressWrapper}>
                <LinearProgressWithLabel className={classes.progress} value={progress} />
            </div>
        </div>
    )
}

export default PercentMeter;