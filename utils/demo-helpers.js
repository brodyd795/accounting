export const getRandomDollarAmount = () => {
    const precision = 100;
    const maxDigits = 5;
    const minDigits = 1;
    const randomNumDigits = Math.floor(
        Math.random() * (Math.floor(maxDigits) - Math.ceil(minDigits)) + Math.ceil(minDigits)
    );

    return Math.floor(Math.random() * (10 ** randomNumDigits * precision - precision) + 1) / precision;
};
