export const getRandomDollarAmount = (max = 100000) => {
    const min = 1;

    return Math.floor(Math.random() * (max - min) + min);
};

export const getRandomAccountBalance = (account) => {
    const randomNum = getRandomDollarAmount(100000);

    if (account.accountName.includes('US_Bank')) {
        return 1000000;
    } else if (account.accountName.includes('Loan')) {
        return 0;
    }

    return randomNum / 100;
};
