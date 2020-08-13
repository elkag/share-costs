import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, makeStyles } from '@material-ui/core';
import UserInGroupView from './UserInGroupView';
import { textsGreen, textsRed } from '../../styles/colors';
import { grey } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
    wrapper: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    accordion: {
        backgroundColor: grey[50],
        '&:hover': {
            backgroundColor: grey[100],
        }
    },
    red: {
        color: textsRed,
        textAlign: 'right',
    },
    green: {
        color: textsGreen,
        textAlign: 'right',
    },
    names: {
        fontWeight: "bold",
    },
}));


const UserDetails = ({user}) => {

    const classes = useStyles(makeStyles);
    
    return (
        <Accordion>
            <AccordionSummary 
                className={classes.accordion}
                aria-controls="panel1a-content"
                id="panel1a-header"
            > 
                <div className={classes.wrapper}>
                    <div className={classes.names}>{user.firstName}&nbsp;{user.lastName}</div> 
                    {(user.balance < 0) ?
                        <div className={classes.red}>{Number(user.balance).toFixed(2)}</div>
                        :
                        <div className={classes.green}>{Number(user.balance).toFixed(2)}</div>
                    }
                </div>
            </AccordionSummary>
            <AccordionDetails> 
                <UserInGroupView 
                    spending={Number(user.spending).toFixed(2)} 
                    costs={Number(user.costs).toFixed(2)}
                    balance={Number(user.balance).toFixed(2)} />
            </AccordionDetails>
        </Accordion>
    )
}

export default UserDetails;