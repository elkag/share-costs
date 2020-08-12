import React, { useContext } from 'react';
import { UserContext } from '../../contexts/userContext';
import { makeStyles, Fade } from '@material-ui/core';
import MemberAmountTextField from './MemberAmountTextField';
import MemberNameButton from './MemberNameButton';
import MemberWeightSelector from './MemberWeightSelector';
import PercentMeter from './PercentMeter';

const useStyles = makeStyles(theme => ({
    wrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: '20px',
        paddingRight: '20px',
        paddingTop: '10px',
        paddingBottom: '10px',
        
    },
    right: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    progressWrapper: {
        paddingLeft: '20px',
        paddingRight: '20px',
    },
}));

const ActiveMember = ({ user, 
                        disabledText,
                        disabledWeight, 
                        onClickUser, 
                        onChangeUserWeight, 
                        onChangeUserAmount, 
                        percent}) => {

    const [session, ] = useContext(UserContext);

    const IS_SESSION_USER = user.id === session.user.id;
    
    const classes = useStyles(makeStyles);
      
    const onChangeWeight = (weight) => {
        onChangeUserWeight(user, weight)
    }
    
    const onChangeAmount = (amount) => {
        onChangeUserAmount(user, amount)
    }

    const renderUser = () => {
        return (
            <div>
                <div className={classes.wrapper}>
                    <MemberNameButton 
                        user={user} 
                        isSessionUser={IS_SESSION_USER} 
                        onClick={onClickUser} />

                    <div className={classes.right}>
                        <MemberWeightSelector
                            disabled={disabledWeight}
                            value={user.weight} 
                            onChange={onChangeWeight}/>
                        <MemberAmountTextField
                            disabled={disabledText}
                            onChange={onChangeAmount}
                            amount={user.amount.stringValue} 
                            maxValue={user.amount.max}/>
                    </div>
                </div>
                <PercentMeter value={percent} />
            </div>
        )
    }

    return (
        <Fade in={true}  timeout={600}>
            { renderUser(user)}
        </Fade>
    )
}

export default ActiveMember;