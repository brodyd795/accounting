import {transactionCategories} from "../enums/transaction-categories";

export const formatBalanceForUI = (account) => {
    const {balance, category} = account;

    let balanceWithCorrectSign = balance / 100;

    if (balance < 0 && (category === transactionCategories.INCOME || category === transactionCategories.DEBTS)) {
        balanceWithCorrectSign = balanceWithCorrectSign * -1;
    }
    // TODO: return object with balance and isNegative or something

    return `$ ${balanceWithCorrectSign.toLocaleString()}`;
};
