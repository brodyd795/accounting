import * as yup from 'yup';

export const validationSchema = yup.object().shape({
    amount: yup.number().required('Required'),
    comment: yup.string().notRequired(),
    date: yup.date().required('Required'),
    fromAccountName: yup
        .object()
        .shape({
            accountId: yup.number().required(),
            label: yup.string().required(),
            value: yup.string().required()
        })
        .test(
            'accounts-match',
            'To and From accounts must be different',
            // eslint-disable-next-line get-off-my-lawn/prefer-arrow-functions
            function () {
                // eslint-disable-next-line no-invalid-this
                return this.parent.fromAccountName.accountId !== this.parent.toAccountName.accountId;
            }
        ),
    toAccountName: yup
        .object()
        .shape({
            accountId: yup.number().required(),
            label: yup.string().required(),
            value: yup.string().required()
        })
        .test(
            'accounts-match',
            'To and From accounts must be different',
            // eslint-disable-next-line get-off-my-lawn/prefer-arrow-functions
            function () {
                // eslint-disable-next-line no-invalid-this
                return this.parent.fromAccountName.accountId !== this.parent.toAccountName.accountId;
            }
        )
});