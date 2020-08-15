import React, { useState, useContext } from 'react';
import { grey } from '@material-ui/core/colors';
import { makeStyles, Divider, Typography, IconButton, Button } from '@material-ui/core';
import UserDetails from './UserDetails';
import ExpenseContainer from '../Expense/ExpenseContainer';
import WriteExpenseNameDialog from './WriteExpenseNameDialog';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import { GroupContext } from '../../pages/GroupPage/GroupPage';
import { textsRed, textsGrey, textsGreen } from '../../styles/colors';
import SearchUserComponent from '../Search/SearchUserComponent';
import EuroSymbolIcon from '@material-ui/icons/EuroSymbol';
import { UserContext } from '../../contexts/userContext';

const useStyles = makeStyles(theme => ({
    
    wrapper: {
        width: '100%',
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: textsGrey
    },
    buttonWrapper: {
        marginLeft: '10px',
        marginBottom: '10px',
        
    },
    iconButton: {
        color: textsRed,
        
    },
    removeIcon: {
       color: textsRed,
       width: 12,
       height: 12,
       marginRight: '12px'
    },
    addIcon: {
        color: textsGreen,
        width: 12,
        height: 12,
     },
    paper: {
        width: '100%',
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
        maxWidth: '600px',
        marginTop: '20px',
    },
    groupWrapper: {
        display: 'flex',
        width: '100%',
        paddingTop: '20px'
       
    },
    titleWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        textAlign: 'right',
        margin: '10px',
        height: 60
    },
    title: {
        fontWeight: 'bold'
    },
    total: {
        color: textsRed
    },
    description: {
        fontSize: '10pt',
        textAlign: 'left',
        paddingBottom: '30px'
    },
    box: {
        paddingLeft: '10px',
        paddingBottom: '10px',
    },
    namesGrey: {
        paddingLeft: '16px',
        color: grey[600],
    },
    expenseWrapper: {
        zIndex: 11,
        position: 'absolute',
        top: '0',
        bottom: '0',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    pendingUsersWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignContent: 'center',
        alignItems: 'center',
        textAlign: 'left',
        marginRight: '20px',
        paddingTop: '20px'
    }
    
}));

const GroupView = (
                {   
                    joinGroup, 
                    addToGroup,
                    removePendingUser
                }) => {

    const GROUP_VIEW = "GROUP_VIEW";
    const EXPENSE_VIEW = "EXPENSE_VIEW";
    const DIALOG_VIEW = "DIALOG_VIEW";

    const context = useContext(GroupContext);
    const [userContext, ] = useContext(UserContext);

    const group = context.group;
    const classes = useStyles(makeStyles);

    const [state, setState] = useState(GROUP_VIEW);
    const [expenseDescription, setExpenseDescription] = useState('');

    const openExpenseContainer = () => {
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

    const renderPopper = () => {
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

    const renderLoggedInPendingUser = () => {
        const pending = group.pendingUsers.filter(user => user.id === userContext.user.id);
        
        if(pending.length > 0) {
            
            const user = pending[0];

            return (
                <div className={classes.pendingUsersWrapper}>
                    <IconButton 
                    onClick={() => removePendingUser(user)}
                        className={classes.removeIcon}>
                        <RemoveIcon />
                    </IconButton>
                    <IconButton 
                        onClick={() => joinGroup()}
                        className={classes.addIcon}>
                        <AddIcon />
                    </IconButton>
                <div key={pending.id} className={classes.namesGrey}>
                    {user.firstName}&nbsp;{user.lastName}
                </div>
            </div>
            )
        }

        return null;
    }

    const renderLoggedInUsers = () => {
        return (
            group.pendingUsers.filter(user => user.id !== userContext.user.id).map((user, index) => (
                <div key={index} className={classes.pendingUsersWrapper}>
                    <IconButton 
                        onClick={() => removePendingUser(user)} 
                        className={classes.removeIcon}>
                        <RemoveIcon />
                    </IconButton>
                    <div key={user.id} className={classes.namesGrey}>
                        {user.firstName}&nbsp;{user.lastName}
                    </div>
                </div>
            ))
        )
    }

    return ( 
            (!group)  ? <div /> :
            <div className={classes.wrapper} >
                { renderPopper() }
                
                <div className={classes.paper} elevation={2}>
                        <div className={classes.titleWrapper}>
                            <Typography className={classes.title}>{group.name}</Typography>
                            <Button 
                                disabled={group.pendingUsers.filter(user => user.id === userContext.user.id).length > 0}
                                onClick={() => openExpenseContainer()}
                            >
                                <EuroSymbolIcon />
                                New Expense
                            </Button>
                        </div>
                        <Divider />
                        <div className={classes.titleWrapper}>
                            <SearchUserComponent onClick={addToGroup}/>
                            <Typography className={classes.title}>Balance: {group.balance.toFixed(2)}</Typography>
                        </div>
                        
                        {
                            group.users.map((user, index) => (
                                <UserDetails key={index} user={user}/>
                            ))
                        }
                        {group.pendingUsers.length > 0 && <Divider />}
                        { renderLoggedInPendingUser() }
                        { renderLoggedInUsers() }
                </div>
            </div>
    )
    
}

export default GroupView;