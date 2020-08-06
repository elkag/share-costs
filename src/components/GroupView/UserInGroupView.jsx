import React from 'react';
import { makeStyles, Button } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    button: { 
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Arial, Helvetica, sans-serif',
        border: "1px solid",
        borderColor:  grey[100],
        borderRadius: '5px',
        backgroundColor: grey[50],
        width: '100%',
        textTransform: "none",
        textAlign: 'center',
        '&:hover': {
            backgroundColor: grey[100],
        }
    },
    wrapper: {
        width: '100%',
        display: 'flex',
        flexDirection: "column",
        alignItems: "flex-end", 
        fontSize: "11pt",
    },
    rowWrapper: {
        width: '100%',
        display: 'flex',
        flexDirection: "row",
        alignItems: "right",
        
    },
    label: {
        width: "100%",
        alignSelf: "left",
        textAlign:"right",
        paddingRight: "10px",
        
    },
    amountRed: {
        width: "10%",
        textAlign:"right",
        color: "red",
        fontWeight: "bold",
        paddingRight: "20px"
    },
    amountGreen: {
        width: "10%",
        textAlign:"right",
        color: "green",
        fontWeight: "bold",
        paddingRight: "20px"
    }
}));

const UserInGroupView = ({spending, costs, balance}) => {

    const classes = useStyles(makeStyles);

    return(
        <Button className={classes.button}>
            <div className={classes.wrapper}>
                <div className={classes.rowWrapper}>
                    <div className={classes.label}>
                        Spending: 
                    </div>
                    <div className={classes.amountRed}>
                        {spending}
                    </div>
                </div>
                <div className={classes.rowWrapper}>
                    <div className={classes.label}>
                        Costs: 
                    </div>
                    <div className={classes.amountGreen}>
                        {costs}
                    </div>
                </div>
                <div className={classes.rowWrapper}>
                    <div className={classes.label} >
                        Balance: 
                    </div>
                    <div className={balance < 0 ? classes.amountRed : classes.amountGreen}>
                        {balance}
                    </div>
                </div>
            </div>
        </Button>
    )
}

export default UserInGroupView;