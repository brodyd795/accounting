import * as yup from 'yup';

export const searchSchema = yup.object().shape({
    comment: yup.string(),
    fromAccountObject: yup
        .object()
        .shape({
            accountId: yup.number(),
            label: yup.string(),
            value: yup.string()
        })
        .test(
            'accounts-match',
            'To and From accounts must be different',
            // eslint-disable-next-line get-off-my-lawn/prefer-arrow-functions
            function () {
                if (
                    // eslint-disable-next-line no-invalid-this
                    this.parent.toAccountObject.accountId === undefined ||
                    // eslint-disable-next-line no-invalid-this
                    this.parent.fromAccountObject.accountId === undefined
                ) {
                    return true;
                }

                // eslint-disable-next-line no-invalid-this
                return this.parent.fromAccountObject.accountId !== this.parent.toAccountObject.accountId;
            }
        ),
    fromAmount: yup.number(),
    fromDate: yup.date(),
    toAccountObject: yup
        .object()
        .shape({
            accountId: yup.number(),
            label: yup.string(),
            value: yup.string()
        })
        .test(
            'accounts-match',
            'To and From accounts must be different',
            // eslint-disable-next-line get-off-my-lawn/prefer-arrow-functions
            function () {
                if (
                    // eslint-disable-next-line no-invalid-this
                    this.parent.toAccountObject.accountId === undefined ||
                    // eslint-disable-next-line no-invalid-this
                    this.parent.fromAccountObject.accountId === undefined
                ) {
                    return true;
                }

                // eslint-disable-next-line no-invalid-this
                return this.parent.fromAccountObject.accountId !== this.parent.toAccountObject.accountId;
            }
        ),
    toAmount: yup.number().min(yup.ref('fromAmount')),
    toDate: yup.date().when('fromDate', (fromDate, schema) => fromDate && schema.min(fromDate)),
});
