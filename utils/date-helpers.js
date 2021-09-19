export const formatDateForDb = (date) => date.toISOString().slice(0, 10);

export const formatDateForUI = (date) =>
    date.toDateString().replace(/(\w{3}) (\w{3}) (\d{2}) (\d{4})/u, '$2. $3, $4 ($1)');
