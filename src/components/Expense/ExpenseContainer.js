import React, { useState, useContext } from 'react';
import { Paper, Divider, makeStyles, Button} from '@material-ui/core';
import { UserContext } from '../../contexts/userContext';
import ActiveMember from './ActiveMember';
import InactiveMember from './InactiveMember';
import ControlsContainer from './ControlsContainer';
import TitledHeader from './Title';
import { green } from '@material-ui/core/colors';
import { INPUT_TYPE } from './constants/constants';
import * as utils from './utils/calcs';
import * as converter from './utils/expenseConverter';
import { sendExpenseApi } from '../../api/services/sendExpenseApi';
import { SERVER_ERROR } from '../../config/systemMessages';
import Loader from '../common/Loader';

const useStyles = makeStyles(theme => ({
    wrapper: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignSelf: 'center',
        justifyContent: 'center',
        width: '500px',
        
    },
    buttonsContainer: {
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
    },
    membersWrapper: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'left',
        textAlign: 'left',
        minWidth: '200px',
        transition: 'max-height 0.25s ease-in',
    },
    buttonWrapper: {
        width: '100%',
        display: 'flex',
        alignItems: "center",
        justifyContent: 'flex-end',
        paddingTop: "10px",
        paddingBottom: "10px"
    },
    button: {
        paddingRight: "20px",
        paddingTop: "10px",
    },
    submitButton: {
        color: theme.palette.getContrastText(green[700]),
        backgroundColor: green[600],
        width: '120px',
        '&:hover': {
        backgroundColor: green[600],
        corners: '0dp',
        width: '120px'
        },
    }
}));


/**
 * 
 *  @param {*} group group object
    @param {*} submit SubmitHandler
    @param {*} close  CloseHandler
 */
const ExpenseContainer = ({group, description, submit, close}) => {

    const [session, ] = useContext(UserContext);
    const classes = useStyles(makeStyles);

    const [activeMembers, setActiveMembers] = useState(() => {
        return [{
                id: session.user.id,
                firstName: session.user.firstName,
                lastName: session.user.lastName,
                weight: 1,
                amount: {
                    updated: false,
                    value: 0,
                    stringValue: '',
                    max: 0
                }
            }]
        });

    const [inactiveMembers, setInactiveMembers] = useState(() => {
        return group.users
                        .filter(current => current.id !== session.user.id)
                        .map(current => {
                            return {
                                id: current.id,
                                firstName: current.firstName,
                                lastName: current.lastName,
                                weight: 1,
                                amount: {
                                    updated: false,
                                    value: 0,
                                    stringValue: '',
                                    max: 0
                                }
                            }
                        })
                    });

    const [expense, setExpense] = useState(() => {
        return {
             total: 0,
             totalInCents: 0,
             description: description,
             inputType: INPUT_TYPE.PROPORTIONAL,
             users: activeMembers
        }
    });

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState('');

   
    const onChangeTotal = (total) => {

        const updated = utils.recalculateAllUsersAmount(expense, total)
        setExpense(updated);
    }

    const onChangeMemberWeight = (user, weight) => {
        const updated = utils.recalculateOnChangeWeight(expense, user, weight)
        setExpense(updated);
    } 
    
    const onChangeUserAmount = (user, amount) => {

        const updated = utils.recalculateOnChangeUserAmount(expense, user, amount)
        setExpense(updated);
        console.log(JSON.stringify(updated))
    }

    const getAmountPercentage = (user) => {
        if(expense.inputType === INPUT_TYPE.PROPORTIONAL) {
            return utils.calculateWeightedUserPercent(expense, user)
        } 

        if(expense.totalInCents > 0) {
            return Math.round((user.amount.value/expense.totalInCents)*100)
        }
        
        return 0;
    }

    const onChangeInputType = (event) => {
        
        let updated;
        if(event.target.checked) {
            updated = utils.recalculateOnChangeInputType(expense, INPUT_TYPE.PROPORTIONAL);
        } else {
            updated = utils.recalculateOnChangeInputType(expense, INPUT_TYPE.MONEY);
        }
        
        setExpense(updated);
    }

    const renderActiveMembers = () => {
        return (
            <div className={classes.membersWrapper}>
                { 
                    expense.users.map( user => 
                        <ActiveMember 
                            key={user.id} 
                            user={user} 
                            amount={user.amount.stringValue}
                            maxAmount={user.amount.max}
                            disabledText={expense.inputType===INPUT_TYPE.PROPORTIONAL}
                            disabledWeight={expense.inputType===INPUT_TYPE.MONEY}
                            checked={expense.inputType===INPUT_TYPE.PROPORTIONAL}
                            onChangeUserWeight={onChangeMemberWeight}
                            onChangeUserAmount={onChangeUserAmount}
                            percent={getAmountPercentage(user)}
                            onClickUser={() => addToInactiveHandler(user)} />
                    )
                }
            </div>
        )   
    }
    const renderInactiveMembers = () => {
        return (
            <div className={classes.membersWrapper}>
            { 
                inactiveMembers.map(user => 
                    <InactiveMember 
                        key={user.id} 
                        user={user} 
                        onClickUser={() => addToActiveHandler(user)} />
                )
            }
            </div>
        )
    }

    const addToActiveHandler = (user) => {
        setActiveMembers(activeMembers.concat(user));
        setInactiveMembers(inactiveMembers.filter(current => current !== user));

        const mapped = {
            id: user.id, 
            firstName: user.firstName,
            lastName: user.lastName,
            amount: {
                value: 0,
                stringValue: '',
                updated: false,
            },
            weight: 1
        }

        const updated = utils.recalculateForNewMember(expense, mapped);
        setExpense(updated)
    }

    const addToInactiveHandler = (user) => {
        
        if(user.id !== session.user.id) {
            setInactiveMembers(inactiveMembers.concat(user));
            setActiveMembers(activeMembers.filter(current => current !== user));
            
            const updated = utils.recalculateOnRemoveUser(expense, user)
            setExpense(updated);
        }
    }

    const onSubmit = async () => {
        const request = converter.convertToRequest(group, expense);
        setLoading(true);
        const response = await sendExpenseApi.requestExpense(request);
        
        if(response.error) {
            setError(SERVER_ERROR)
        } else {
            submit();
        }
        setLoading(false);
    }

    return (
        <div >
           
            <div className={classes.wrapper}>
                
                <Paper className={classes.paper} elevation={0}>
                    <TitledHeader title={expense.description} onClose={close} />
                    <Divider />
                    <ControlsContainer 
                        checked={expense.inputType === INPUT_TYPE.PROPORTIONAL}
                        amount={expense.totalAsString}
                        onChangeTotal={onChangeTotal}
                        onChangeInputType={onChangeInputType} />
                    <Divider />
                    { renderActiveMembers() }
                    <div className={classes.buttonWrapper}>
                        <div className={classes.button} >
                            <Button variant="contained" onClick={onSubmit} className={classes.submitButton} >Submit</Button>
                        </div>
                    </div>
                    { renderInactiveMembers() }
               </Paper>
            </div>
            <Loader loading={loading} isError={error !== ''} error={error} />
            </div>
    )
}

export default ExpenseContainer;