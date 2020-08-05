import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, makeStyles } from '@material-ui/core';
import UserInGroupView from './UserInGroupView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { green, red } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
    balancePaper: {
        width: '60px',
        height: '20px',
        borderRadius: '3px',
        color: 'white',
        backgroundColor: red[400],
        fontWeight: 'bold',
        fontSize: '9pt',
        textAlign: 'center',
        padding: '6px',
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
        paddingTop: "6px",
        paddingBottom: "6px",
        padding: '6px',
    },
    
    names: {
        width: '90%',
        alignSelf: 'center',
        marginRight: '20px',
        textAlign: 'left',
        fontWeight: "bold",
        fontSize: "11pt"
    },
}));


const UserDetails = ({user}) => {

    const classes = useStyles(makeStyles);
    
    return (
        <Accordion>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            > 
        <div className={classes.names}>{user.firstName}&nbsp;{user.lastName}</div> 
                {(user.balance < 0) ?
                    <div className={classes.balancePaper}>{Number(user.balance).toFixed(2)}</div>
                    :
                    <div className={classes.balancePaperGreen}>{Number(user.balance).toFixed(2)}</div>
                }
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