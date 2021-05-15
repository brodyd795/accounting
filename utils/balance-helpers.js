import {transactionCategories} from "../enums/transaction-categories";

export const formatBalanceForUI = (account) => {
    const {balance, category} = account;
    const {INCOME, EXPENSES, DEBTS, ASSETS} = transactionCategories;

    let balanceWithCorrectSign = balance / 100;
    let isNegative = false;

    if (balance < 0 && (category === INCOME || category === DEBTS)) {
        balanceWithCorrectSign = balanceWithCorrectSign * -1;
    }
    
    if (
        ((category === INCOME || category === DEBTS) && balance > 0) || 
        ((category === EXPENSES || category === ASSETS) && balance < 0)
    ) {
        isNegative = true;
    }

    return {
        balance: `$ ${balanceWithCorrectSign.toLocaleString()}`,
        isNegative
    };
};
