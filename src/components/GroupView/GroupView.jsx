import React, { useState } from 'react';
import { grey } from '@material-ui/core/colors';
import { makeStyles, Paper, Divider, Button } from '@material-ui/core';
import UserDetails from './UserDetails';
import ExpenseContainer from '../Expense/ExpenseContainer';
import WriteExpenseNameDialog from './WriteExpenseNameDialog';


const useStyles = makeStyles(theme => ({
    
    wrapper: {
        paddingTop: '20px',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    expenseWrapper: {
        zIndex: '1',
        position: 'absolute',
        top: '0',
        bottom: '0',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
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

    const GROUP_VIEW = "GROUP_VIEW";
    const EXPENSE_VIEW = "EXPENSE_VIEW";
    const DIALOG_VIEW = "DIALOG_VIEW";

    const classes = useStyles(makeStyles);

    const [state, setState] = useState(GROUP_VIEW);
    const [expenseDescription, setExpenseDescription] = useState('');

    const openExpenseContainer = (event) => {
        console.log(event.target)
        event.preventDefault();
        setState(DIALOG_VIEW);
    }

    const onSubmitDescriptionDialog = (description) => {
        setExpenseDescription(description);
        setState(EXPENSE_VIEW);
    }
    
    const onCancelDescriptionDialog = ({description}) => {
        setState(GROUP_VIEW)
    }

    
    const closeExpenseContainer = () => {
        setState(GROUP_VIEW);
    }

    const onSubmitExpense = () => {
        setState(GROUP_VIEW);
    }

    const renderExpenseContainer = () => {
        console.log(state);
        if(state === EXPENSE_VIEW) {
            return (
                <div className={classes.expenseWrapper}>
                    <ExpenseContainer 
                        group={group} 
                        description={expenseDescription} 
                        submit={onSubmitExpense} 
                        close={closeExpenseContainer}/>
                </div>
            )
        }

        if(state === DIALOG_VIEW) {
            return <WriteExpenseNameDialog 
                onSubmit={onSubmitDescriptionDialog} 
                onCancel={onCancelDescriptionDialog} />
        }
        return null;
    }

    return ( 
            (!group)  ? <div /> :
            <div className={classes.wrapper} >
                { renderExpenseContainer() }
               
            <div  className={classes.wrapper} ></div>
                <Paper className={classes.paper} elevation={2}>
                    <div className={classes.wrapper}>
                        <div className={classes.titleWrapper}>
                            <div className={classes.titleLeft}>{group.name}</div>
                            <div className={classes.titleRight}>
                                <Button onClick={openExpenseContainer}>New Expense</Button></div>
                        </div>
                        <Divider />
                    
                        <div  className={classes.description}>{group.description}</div>
                        <div className={classes.box}>
                            <div className={classes.groupWrapper}>
                                
                                <div className={classes.namesWrapper}>
                                {
                                    group.users.map(user => (
                                        <UserDetails key={user.id} user={user}/>
                                    ))
                                } 
                                </div>
                            </div>
                        </div>
                        {group.pendingUsers.length > 0 && <Divider />}
                        <div className={classes.groupWrapper}>
                            <div className={classes.namesWrapper}>
                            {
                                group.pendingUsers.map(user => (
                                        <div  key={user.id} className={classes.namesGrey}>
                                            {user.firstName}&nbsp;{user.lastName}
                                        </div>
                                ))
                            } 
                            </div>
                        </div>
                    </div>
                    <Divider />
                    <div className={classes.total}>Balance: {group.balance}</div>
                </Paper>
            </div>
    )
    
}

export default GroupView;