import React, { useState, useContext } from 'react';
import { grey } from '@material-ui/core/colors';
import { makeStyles, Divider, Typography, IconButton, Button } from '@material-ui/core';
import UserDetails from './UserDetails';
import ExpenseContainer from '../Expense/ExpenseContainer';
import WriteExpenseNameDialog from './WriteExpenseNameDialog';
import CloseIcon from '@material-ui/icons/Close';
import { GroupContext } from '../../pages/GroupPage/GroupPage';
import { textsRed, textsGrey } from '../../styles/colors';
import SearchUserComponent from '../Search/SearchUserComponent';
import { addUserToGroupApi } from '../../api/services/addUserToGroupApi';
import { removePendingUserApi } from '../../api/services/removePendingUserApi';
import Loader from '../common/Loader';
import { SERVER_ERROR } from '../../config/systemMessages';
import EuroSymbolIcon from '@material-ui/icons/EuroSymbol';

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
       height: 12
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

const GroupView = ({onUpdate}) => {

    const GROUP_VIEW = "GROUP_VIEW";
    const EXPENSE_VIEW = "EXPENSE_VIEW";
    const DIALOG_VIEW = "DIALOG_VIEW";

    const context = useContext(GroupContext);

    const group = context.group;
    const classes = useStyles(makeStyles);

    const [state, setState] = useState(GROUP_VIEW);
    const [expenseDescription, setExpenseDescription] = useState('');

    const [loading, setLoading] = React.useState(false); 
    const [error, setError] = React.useState('');

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

    /**
     * @param {*} userId
     */
    const addToGroup = async (userId) => {
        setLoading(true);
        const response = await addUserToGroupApi.addUser(group.id, userId);
        setLoading(false);
        if(response.error){
            setError(SERVER_ERROR);
        } else {
            onUpdate(response);
        }
    }

    const removePendingUser = async (user) => {
        setLoading(true);
        const response = await removePendingUserApi.removeUser(group.id, user.id);
        setLoading(false);
        if(response.error){
            setError(SERVER_ERROR);
        } else {
            onUpdate(response);
        }
        
    }


    const addToGroupHandler = (userId) => {
        addToGroup(userId)
    }

    const removeUser = (userId) => {
        removePendingUser(userId);
    }

    return ( 
            (!group)  ? <div /> :
            <div className={classes.wrapper} >
                <Loader loading={loading} error={error} />
                { renderPopper() }
                
                <div className={classes.paper} elevation={2}>
                        <div className={classes.titleWrapper}>
                            <Typography className={classes.title}>{group.name}</Typography>
                            <Button onClick={() => openExpenseContainer()}>
                                <EuroSymbolIcon />
                                New Expense
                            </Button>
                        </div>
                        <Divider />
                        <div className={classes.titleWrapper}>
                            <SearchUserComponent onClick={addToGroupHandler}/>
                            <Typography className={classes.title}>Balance: {group.balance.toFixed(2)}</Typography>
                        </div>
                        
                        {
                            group.users.map((user, index) => (
                                <UserDetails key={index} user={user}/>
                            ))
                        }
                        {group.pendingUsers.length > 0 && <Divider />}
                        {
                            group.pendingUsers.map(user => (
                                <div className={classes.pendingUsersWrapper}>
                                    <IconButton 
                                        onClick={() => removeUser(user)} 
                                        className={classes.removeIcon}>
                                        <CloseIcon />
                                    </IconButton>
                                    <div key={user.id} className={classes.namesGrey}>
                                        {user.firstName}&nbsp;{user.lastName}
                                    </div>
                                </div>
                            ))
                        } 
                </div>
            </div>
    )
    
}

export default GroupView;