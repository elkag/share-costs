import { INPUT_TYPE } from "../constants/constants";


export const calculateWeightedUserPercent = (expense, user) => {
    
    const count = expense.users.map(current => current.weight).reduce((a, b) => Number(a) + Number(b), 0);

    return Math.round((user.weight / count) * 100);
}

/**
 * 
 * @param {*} expense
 * @param {*} user 
 */
export const recalculateOnChangeUserAmount = (expense, user, amount) => {
    
    const clone = Object.assign({}, expense);

    const amountInCents = Math.round(amount * 100);
    
    clone.users.filter(current => current.id === user.id).map(current => {
        current.amount.updated = true;
        current.amount.value = amountInCents;
        current.amount.max = clone.total;
        current.amount.stringValue = amount;
        return current;
    })

    let count = clone.users.filter(current => !current.amount.updated).length;

    let totalPaid = clone.users
                .filter(current => current.amount.updated)
                .map(current => current.amount.value)
                .reduce((a, b) => parseFloat(a) + parseFloat(b), 0);

    
    if(count === 0) {
        clone.users
            .filter(current => user.id !== current.id)
            .map(current => {
                current.amount.updated = false;
                current.amount.max = clone.total;
                return current;
            })
    
        count = clone.users.length - 1;
    }

    let amountPerUser = (clone.total - totalPaid) / count;
    
    if(amountPerUser < 0) {
        clone.users
        .filter(current => user.id !== current.id)
        .map(current => {
            current.amount.updated = false;
            current.amount.max = clone.total;
            return current;
        })

        totalPaid = clone.users
                .filter(current => current.amount.updated)
                .map(current => current.amount.value)
                .reduce((a, b) => parseFloat(a) + parseFloat(b), 0);
    }

    amountPerUser = (clone.total - totalPaid) / count;

    clone.users.filter(current => !current.amount.updated).map(current => {
        current.amount.value = amountPerUser
        current.amount.max = clone.total;
        current.amount.stringValue = amountPerUser;
        return current;
    })

    return clone;
}

export const recalculateAllUsersAmount = (expense, total) => {
    
    const clone = Object.assign({}, expense);

    clone.total = total;
    clone.totalInCents = Math.round(clone.total * 100);

    if(clone.inputType === INPUT_TYPE.PROPORTIONAL) {
        return recalculatePerWeight(clone);
    }
    
    let count = clone.users.length;
    
    const amountPerUser = clone.totalInCents / count;
    
    clone.users.map(current => {
        current.amount.value = amountPerUser
        current.amount.max = amountPerUser;
        current.amount.stringValue = (amountPerUser/100).toString();
        return current;
    })

    return clone;
}

export const recalculateForNewMember = (expense, user) => {
    const clone = Object.assign({}, expense);

    clone.users.push(user);
    
    if(clone.inputType === INPUT_TYPE.PROPORTIONAL) {
        return recalculatePerWeight(clone);
    }
    
    let count = clone.users.length;
    
    const amountPerUser = Math.round(clone.totalInCents / count);
    
    clone.users.map(current => {
        current.amount.value = amountPerUser
        current.amount.max = amountPerUser;
        current.amount.stringValue = (amountPerUser/100).toString();
        return current;
    })

    return clone;
}

export const recalculateOnRemoveUser = (expense, user) => {
    let clone = Object.assign({}, expense);

    clone = {...clone,  users: [...clone.users.filter(value => value.id !== user.id)] }
    
    if(clone.inputType === INPUT_TYPE.PROPORTIONAL) {
        return recalculatePerWeight(clone);
    }

    const count = clone.users.length;
    const amountPerUser = Math.round(clone.totalInCents / count);

    clone.users.map(current => {
        current.amount.value = amountPerUser
        current.amount.max = amountPerUser;
        current.amount.stringValue = (amountPerUser/100).toString();
        return current;
    })    

    return clone;
}

export const recalculateOnChangeWeight = (expense, user, weight) => {
    
    const clone = Object.assign({}, expense);

    clone.users.filter(current => current.id === user.id).map(current => {
        current.weight = weight;
        return current;
    })

    const count = clone.users.map(current => current.weight).reduce((a, b) => a + b, 0);

    const perCount = clone.totalInCents/count;

    clone.users.map(current => {
        const amount = perCount * current.weight;
        current.amount.updated = false;
        current.amount.value = amount;
        current.amount.stringValue = (amount/100).toString();
        current.amount.max = clone.totalInCents;
        return current;
    });

    return clone;
}

export const recalculateOnChangeInputType = (expense, inputType) => {
    const clone = Object.assign({}, expense);
    clone.inputType = inputType;

    return recalculateAllUsersAmount(clone, clone.total);
}

/**
 * Max possible amount that user is allowed to type in the amount text field
 * Returns: Number
 * @param {*} user 
 */
export const getMaxPossibleAmount = (expense, user) => {
    const sum = expense.users
            .filter(current => current.id !== user.id && current.amount.updated)
            .map(current => current.amount.value)
            .reduce((a, b) => parseFloat(a) + parseFloat(b), 0);
            
    const maxPossible = expense.total - sum;
    return maxPossible;
}

const recalculatePerWeight = (expense) => {
    
    let clone = Object.assign({}, expense);
    
    const count = clone.users.map(current => current.weight).reduce((a, b) => a + b, 0);
    
    const amountPerUser = clone.totalInCents / count;

    clone.users.map(current => {
        const amount = Math.round(amountPerUser * current.weight);
        current.amount.value = amount
        current.amount.max = clone.total;
        current.amount.stringValue = (amount/100).toFixed(2).toString();
        return current;
    })    

    return clone;
}

