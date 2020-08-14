import React, { useEffect } from 'react';
import { makeStyles, Switch } from '@material-ui/core';
import * as utils from './utils/selectFieldOnFocus';


const useStyles = makeStyles(theme => ({
    wrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: '20px',
        paddingRight: '20px',
        paddingTop: '20px',
        paddingBottom: '10px',
    },
    switch: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-start', 
        alignItems: 'center',
        paddingLeft: '20px',
    },
    label: {
        fontSize: '9pt',
        fontWeight: 'bold',
        paddingRight: '20px',
    },
    amount: {
        maxWidth: '100px',
    }
}));

const ControlsContainer = ({amount, onChangeTotal, checked, onChangeInputType}) => {

    const classes = useStyles(makeStyles);

    useEffect(() => {
        if(amount === 0) {
            utils.selectTarget(document.getElementById("text-amount"));
        }
    },[amount])

    
    const onChangeAmount = (event) => {
        const value = event.target.value;
          
        if(value.charAt(0) === '0' && value.charAt(1) && value.charAt(1) !== '.') {
            return;
        }

        if(value === '') {
            onChangeTotal(0);
        } else if((!isNaN(value) && parseFloat(value) >= 0)) {
            onChangeTotal(value);
        }
    }

    const render = () => {
        return (
            <div className={classes.wrapper}>
                <div className={classes.switch}>
                    <div className={classes.label}>Proportional:</div>
                    <Switch 
                        checked={checked} 
                        size="small"
                        onChange={onChangeInputType} 
                        name="checkedC" />
                    
                </div>
                <input 
                    id="text-amount"
                    value={amount}
                    onChange={onChangeAmount}
                    onFocus={utils.selectValue}
                    className={classes.amount} 
                    type="text" 
                    placeholder="0.00"  />
            </div>
        )
    }

    return (
        render()
    )
}

export default ControlsContainer;