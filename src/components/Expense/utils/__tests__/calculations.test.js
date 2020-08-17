import { calculateWeightedUserPercent, 
        recalculateOnChangeUserAmount, 
        recalculateOnAddMember, 
        recalculateAllUsersAmount, 
        recalculateOnChangeInputType, 
        recalculateOnChangeWeight } from '../calculations';
        
import { INPUT_TYPE } from '../../constants/constants';

const getUser = (id) => {
    return (
        {
            id: id,
            amount: {
                value: 0,
                stringValue: '',
                updated: false,
                max: 0
            },
            weight: 1
        }
    )
}

const getExpense = () => {
    return (
    {
        total:"",
        totalInCents:0,
        description:"",
        inputType:"",
        users:[
            {
                amount: {
                    value: 0,
                    stringValue: '',
                    updated: false,
                    max: 0
                },
                weight: 1
            }
        ]
    })
}

describe('calculations on add new member to the expense', () => {

    const expense = getExpense();
    const user = getUser();

    //Set input type
    const proportional = Object.assign(recalculateOnChangeInputType(expense, INPUT_TYPE.PROPORTIONAL));

    // Set total amount
    const beforeAddUser = Object.assign(recalculateAllUsersAmount(proportional, 100));

    expect(beforeAddUser.users[0].amount.value).toBe(10000);

    // Add 2 new members
    let afterAddUser = Object.assign(beforeAddUser);
    afterAddUser = recalculateOnAddMember(beforeAddUser, user);
    afterAddUser = recalculateOnAddMember(beforeAddUser, user);
    
    
    test('Count of the users is 3', () => {
        expect(afterAddUser.users.length).toBe(3);
    });
    
    test('First user amount is 33.33', () => {
        expect(afterAddUser.users[0].amount.value).toBe(3333);
        expect(afterAddUser.users[0].amount.stringValue.toString()).toBe("33.33");
    });

    test('Second user amount is 33.33', () => {
        expect(afterAddUser.users[1].amount.value).toBe(3333);
        expect(afterAddUser.users[1].amount.stringValue.toString()).toBe("33.33");
    });

    test('Third user amount is 33.33', () => {
        expect(afterAddUser.users[2].amount.value).toBe(3333);
        expect(afterAddUser.users[2].amount.stringValue.toString()).toBe("33.33");
    });

    test('Percent of each is 33', () => {
        expect(calculateWeightedUserPercent(afterAddUser, afterAddUser.users[0])).toBe(33);
        expect(calculateWeightedUserPercent(afterAddUser, afterAddUser.users[1])).toBe(33);
        expect(calculateWeightedUserPercent(afterAddUser, afterAddUser.users[1])).toBe(33);
    });
});

describe('calculations on change total amount', () => {
    
    test('total amount is in cents', () => {
        const expense = getExpense();

        //Set input type
        const proportional = recalculateOnChangeInputType(expense, INPUT_TYPE.PROPORTIONAL);
        const changeTotal = recalculateAllUsersAmount(proportional, 100);

        //Total is in cents
        expect(changeTotal.total).toBe(100);
        expect(changeTotal.totalInCents).toBe(10000);

    });

    test('total amount distribution', () => {
        let expense = getExpense();
        const user = getUser();

        //Set input type
        expense = recalculateOnChangeInputType(expense, INPUT_TYPE.PROPORTIONAL);
        
        // Add 3 users, all are 4
        [...Array(3)].map(item => expense = recalculateOnAddMember(expense, user));

        expect(expense.users[0].amount.value).toBe(0);
        expect(expense.users[1].amount.value).toBe(0);
        expect(expense.users[2].amount.value).toBe(0);
        expect(expense.users[3].amount.value).toBe(0);

        //Set new total
        expense = recalculateAllUsersAmount(expense, 100);
       
        expect(expense.users[0].amount.value).toBe(2500);
        expect(expense.users[1].amount.value).toBe(2500);
        expect(expense.users[2].amount.value).toBe(2500);
        expect(expense.users[3].amount.value).toBe(2500);
    });

    test('total amount distribution by weights', () => {
        let expense = getExpense();
        
        //Set input type
        expense = recalculateOnChangeInputType(expense, INPUT_TYPE.PROPORTIONAL);
        
        const user1 = getUser();
        const user2 = getUser();

        // Set weights
        expense.users[0].weight = 1;
        user1.weight = 2;
        user2.weight = 3;
        
        // Add the users, 3 users all with weights: 1, 2, 3
        expense = recalculateOnAddMember(expense, user1);
        expense = recalculateOnAddMember(expense, user2);
        
        expect(expense.users[0].amount.value).toBe(0);
        expect(expense.users[1].amount.value).toBe(0);
        expect(expense.users[2].amount.value).toBe(0);
        
        //Set new total
        expense = recalculateAllUsersAmount(expense, 100);

        expect(expense.totalInCents).toBe(10000);
        expect(expense.users[0].amount.value).toBe(1667);
        expect(expense.users[1].amount.value).toBe(3333);
        expect(expense.users[2].amount.value).toBe(5000);
    });
});

describe('calculations on TYPE=MONEY', () => {
    
    test('Set total to 100, add 3 new members, check amounts', () => {
        let expense = getExpense();

        //Set input type
        expense = recalculateOnChangeInputType(expense, INPUT_TYPE.MONEY);

        expect(expense.totalInCents).toBe(0);
        expect(expense.users[0].amount.value).toBe(0);
        
        expense = recalculateAllUsersAmount(expense, 100);
        
        expect(expense.totalInCents).toBe(10000);
        expect(expense.users[0].amount.value).toBe(10000);
        
        // Setup 3 users with id 1, 2, 3, all are 4
        const users = [getUser(1), getUser(2), getUser(3)];
        [...Array(3)].map((item, index) => expense = recalculateOnAddMember(expense, users[index]));

        expect(expense.users[0].amount.value).toBe(2500);
        expect(expense.users[1].amount.value).toBe(2500);
        expect(expense.users[2].amount.value).toBe(2500);
        expect(expense.users[3].amount.value).toBe(2500);

    });

    test('Add new members, change amount of each of them and the check the other\'s amounts', () => {
        let expense = getExpense();

        //Set input type
        expense = recalculateOnChangeInputType(expense, INPUT_TYPE.MONEY);

        expect(expense.totalInCents).toBe(0);
        expect(expense.users[0].amount.value).toBe(0);
        
        expense = recalculateAllUsersAmount(expense, 100);
        
        expect(expense.totalInCents).toBe(10000);
        expect(expense.users[0].amount.value).toBe(10000);
        
        // Setup 3 users with id 1, 2, 3, all are 4
        const users = [getUser(1), getUser(2), getUser(3)];
        [...Array(3)].map((item, index) => expense = recalculateOnAddMember(expense, users[index]));

        expect(expense.users[0].amount.value).toBe(2500);
        expect(expense.users[1].amount.value).toBe(2500);
        expect(expense.users[2].amount.value).toBe(2500);
        expect(expense.users[3].amount.value).toBe(2500);

        expense = recalculateOnChangeUserAmount(expense, expense.users[0], 20);
 
        expect(expense.users[0].amount.value).toBe(2000);
        expect(expense.users[1].amount.value).toBe(2667);
        expect(expense.users[2].amount.value).toBe(2667);
        expect(expense.users[3].amount.value).toBe(2667);

        expense = recalculateOnChangeUserAmount(expense, expense.users[1], 20);
 
        expect(expense.users[0].amount.value).toBe(2000);
        expect(expense.users[1].amount.value).toBe(2000);
        expect(expense.users[2].amount.value).toBe(3000);
        expect(expense.users[3].amount.value).toBe(3000);
        
        expense = recalculateOnChangeUserAmount(expense, expense.users[2], 20);
 
        expect(expense.users[0].amount.value).toBe(2000);
        expect(expense.users[1].amount.value).toBe(2000);
        expect(expense.users[2].amount.value).toBe(2000);
        expect(expense.users[3].amount.value).toBe(4000);

        expense = recalculateOnChangeUserAmount(expense, expense.users[3], 20);

        expect(expense.users[0].amount.value).toBe(2667);
        expect(expense.users[1].amount.value).toBe(2667);
        expect(expense.users[2].amount.value).toBe(2667);
        expect(expense.users[3].amount.value).toBe(2000);
    });

    test('Check max value for each user', () => {
        let expense = getExpense();

        //Set input type
        expense = recalculateOnChangeInputType(expense, INPUT_TYPE.MONEY);

        expect(expense.totalInCents).toBe(0);
        expect(expense.users[0].amount.value).toBe(0);
        
        expense = recalculateAllUsersAmount(expense, 50);
        
        expect(expense.totalInCents).toBe(5000);
        
        // Setup 3 users with id 1, 2, 3, all are 4
        const users = [getUser(1), getUser(2), getUser(3)];
        [...Array(3)].map((item, index) => expense = recalculateOnAddMember(expense, users[index]));
        
        expect(expense.users[0].amount.value).toBe(1250);
        expect(expense.users[1].amount.value).toBe(1250);
        expect(expense.users[2].amount.value).toBe(1250);
        expect(expense.users[3].amount.value).toBe(1250);

        expense = recalculateOnChangeUserAmount(expense, expense.users[0], 60);
 
        expect(expense.users[0].amount.value).toBe(5000);
        expect(expense.users[1].amount.value).toBe(0);
        expect(expense.users[2].amount.value).toBe(0);
        expect(expense.users[3].amount.value).toBe(0);
        
        expense = recalculateOnChangeUserAmount(expense, expense.users[1], 10);

        expect(expense.users[0].amount.value).toBe(1333);
        expect(expense.users[1].amount.value).toBe(1000);
        expect(expense.users[2].amount.value).toBe(1333);
        expect(expense.users[3].amount.value).toBe(1333);

        expense = recalculateOnChangeUserAmount(expense, expense.users[2], 10);

        expect(expense.users[0].amount.value).toBe(1500);
        expect(expense.users[1].amount.value).toBe(1000);
        expect(expense.users[2].amount.value).toBe(1000);
        expect(expense.users[3].amount.value).toBe(1500);

        expense = recalculateOnChangeUserAmount(expense, expense.users[0], 30);

        expect(expense.users[0].amount.value).toBe(3000);
        expect(expense.users[1].amount.value).toBe(1000);
        expect(expense.users[2].amount.value).toBe(1000);
        expect(expense.users[3].amount.value).toBe(0);

    });
});