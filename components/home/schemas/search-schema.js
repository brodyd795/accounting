import * as yup from 'yup';

export const searchSchema = yup.object().shape({
    fromAmount: yup.number(),
    toAmount: yup.number().min(yup.ref('fromAmount')),
    comment: yup.string(),
    fromDate: yup.date(),
    toDate: yup.date().when('fromDate', (fromDate, schema) => fromDate && schema.min(fromDate)),
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
                    this.parent.toAccountObject.accountId === undefined ||
                    this.parent.fromAccountObject.accountId === undefined
                ) {
                    return true;
                }

                // eslint-disable-next-line no-invalid-this
                return this.parent.fromAccountObject.accountId !== this.parent.toAccountObject.accountId;
            }
        ),
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
                    this.parent.toAccountObject.accountId === undefined ||
                    this.parent.fromAccountObject.accountId === undefined
                ) {
                    return true;
                }

                // eslint-disable-next-line no-invalid-this
                return this.parent.fromAccountObject.accountId !== this.parent.toAccountObject.accountId;
            }
        )
});
