import React from 'react';
import { makeStyles } from '@material-ui/core';
import { textsRed, textsGreen } from '../../styles/colors';

const useStyles = makeStyles((theme) => ({
   
    wrapper: { 
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '100%'
    },
    labels: {
        width: '100px',
        display: 'flex',
        flexDirection: "column",
        alignItems: "flex-end",
    },
    amountRed: {
        width:'100px',
        textAlign:"right",
        color: textsRed,
    },
    amountGreen: {
        width:'100px',
        textAlign:"right",
        color: textsGreen,
    }
}));

const UserInGroupView = ({spending, costs, balance}) => {

    const classes = useStyles(makeStyles);

    return(
        <div className={classes.wrapper}>
            <div className={classes.labels}>
                <div className={classes.label}>
                    Spending: 
                </div>
                <div className={classes.label}>
                    Costs: 
                </div>
                <div className={classes.label} >
                    Balance: 
                </div>
            </div>
            <div className={classes.balance} >
                <div className={classes.amountRed}>
                    {spending}
                </div>
                    <div className={classes.amountGreen}>
                    {costs}
                </div>
                <div className={balance < 0 ? classes.amountRed : classes.amountGreen}>
                    {balance}
                </div>
            </div>
        </div>
    )
}

export default UserInGroupView;