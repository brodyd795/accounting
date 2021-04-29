import React, {useState} from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import {Formik, Field, Form, ErrorMessage} from 'formik';
import * as yup from 'yup';
import Select from 'react-select';
import useSWR from 'swr';

import fetcher from '../../../lib/fetch';
import DatePickerField from '../form-fields/date-selector';
import AmountSelector from '../form-fields/amount-selector';

const StyledSelect = styled(Select)`
	width: 150px;
	color: black;
	text-align: left;
`;

const StyledModal = styled(Modal)`
    color: black;
    position: absolute;
    top: 50%;
    left: 50%;
    right: auto;
    bottom: auto;
    margin-right: -50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    background-color: white;
    width: 300px;
`;

const StyledModalHeader = styled.div`
    text-align: center;
    position: relative;
`;

const StyledModalHeading = styled.span`
    font-size: 20px;
`;

const StyledCloseModalButton = styled.button`
    position: absolute;
    top: 0;
    right: 0;
    background-color: transparent;
    border: none;
    margin-top: 5px;
`;

const StyledLabel = styled.label`
    margin-right: 10px;
    margin-bottom: 5px;
`;

const StyledForm = styled(Form)`
    margin-top: 30px;
`;

const StyledFieldContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 10px;
`;

const StyledButtonsContainer = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: center;
`;

const StyledButton = styled.button`
    margin-right: 5px;
    margin-left: 5px;
`;

const validationSchema = yup.object().shape({
    amount: yup.number().required('Required'),
    comment: yup.string().notRequired(),
    date: yup.date().required('Required'),
    fromAccountName: yup.object().shape({
        accountId: yup.number().required(),
        label: yup.string().required(),
        value: yup.string().required()
    }).test(
        'accounts-match',
        'To and From accounts must be different',
        // eslint-disable-next-line get-off-my-lawn/prefer-arrow-functions
        function () {
            // eslint-disable-next-line no-invalid-this
            return this.parent.fromAccountName.accountId !== this.parent.toAccountName.accountId;
        }
    ),
    toAccountName: yup.object().shape({
        accountId: yup.number().required(),
        label: yup.string().required(),
        value: yup.string().required()
    }).test(
        'accounts-match',
        'To and From accounts must be different',
        // eslint-disable-next-line get-off-my-lawn/prefer-arrow-functions
        function () {
            // eslint-disable-next-line no-invalid-this
            return this.parent.fromAccountName.accountId !== this.parent.toAccountName.accountId;
        }
    )
  });

export const TransactionEditModal = ({shouldShowEditModal, setShouldShowEditModal, transactionBeingEdited}) => {
    const {data: accounts, error} = useSWR(`/api/controllers/accounts-list-controller`, fetcher);
    const [updateStatusMessage, setUpdateStatusMessage] = useState('');
    const {
        amount,
        comment,
        date,
        fromAccountId,
        isMarkedAsSeen,
        toAccountId,
        transactionId
    } = transactionBeingEdited;

    if (error) {
        return 'Error!';
    }

    if (!accounts) {
        return 'Loading accounts...';
    }

    const handleSubmit = async (values) => {
        console.log(`values`, values)
        console.log(`transactionBeingEdited`, transactionBeingEdited)
        console.log('submitted!')
        const {amount: newAmount, comment: newComment, date: newDate, fromAccountName: newFromAccount, toAccountName: newToAccount} = values;
        const res = await fetch(
            `/api/controllers/transactions/edit-controller`,
            {
                body: JSON.stringify({
                    editedTransaction: {
                        amount: newAmount * 100,
                        comment: newComment,
                        date: new Date(newDate),
                        fromAccountId: newFromAccount.accountId,
                        toAccountId: newToAccount.accountId
                    },
                    originalTransaction: {
                        amount,
                        comment,
                        date: new Date(date),
                        fromAccountId,
                        isMarkedAsSeen,
                        toAccountId,
                        transactionId
                    }
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'PUT'
            }
        );

        // if (res.status === 200) {
        //     setUpdateStatusMessage('Success!');
        // } else {
        //     setUpdateStatusMessage('Sorry, something went wrong.');
        // }
    };

    const flatAccounts = accounts.reduce((acc, current) => [...acc, current.options], []).flat();
    const fromAccountOption = flatAccounts.find((account) => account.accountId === fromAccountId);
    const toAccountOption = flatAccounts.find((account) => account.accountId === toAccountId);

    return (
        <StyledModal
            ariaHideApp={false}
            contentLabel={'Edit Transaction Modal'}
            isOpen={shouldShowEditModal}
            onRequestClose={() => setShouldShowEditModal(false)}
        >
            <StyledModalHeader>
                <StyledModalHeading>{'Edit Transaction'}</StyledModalHeading>
                <StyledCloseModalButton
                    onClick={() => setShouldShowEditModal(false)}
                    type={'button'}
                >
                    {'X'}
                </StyledCloseModalButton>
            </StyledModalHeader>
            <Formik
                initialValues={{
                    amount: amount / 100,
                    comment,
                    date: new Date(date),
                    fromAccountName: fromAccountOption,
                    toAccountName: toAccountOption
                }}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
            >
                {({setFieldValue, values}) => (
                    <StyledForm>
                        <StyledFieldContainer>
                            <StyledLabel htmlFor={'date'}>{'Date'}</StyledLabel>
                            <DatePickerField name={'date'} type={'text'} />
                            <ErrorMessage name={'date'} />
                        </StyledFieldContainer>
                        <StyledFieldContainer>
                            <StyledLabel htmlFor={'fromAccountName'}>{'From account name'}</StyledLabel>
                            <StyledSelect
                                id={'fromAccountName'}
                                name={'fromAccountName'}
                                onChange={(option) => setFieldValue('fromAccountName', option)}
                                options={accounts}
                                value={values.fromAccountName}
                            />
                            <ErrorMessage name="fromAccountName" />
                        </StyledFieldContainer>
                        <StyledFieldContainer>
                            <StyledLabel htmlFor={'toAccountName'}>{'To account name'}</StyledLabel>
                            <StyledSelect
                                id={'toAccountName'}
                                name={'toAccountName'}
                                onChange={(option) => setFieldValue('toAccountName', option)}
                                options={accounts}
                                value={values.toAccountName}
                                />
                            <ErrorMessage name="toAccountName" />
                        </StyledFieldContainer>
                        <StyledFieldContainer>
                            <StyledLabel htmlFor={'amount'}>{'Amount'}</StyledLabel>
                            <Field component={AmountSelector} name={'amount'} />
                            <ErrorMessage name={'amount'} />
                        </StyledFieldContainer>
                        <StyledFieldContainer>
                            <StyledLabel htmlFor={'comment'}>{'Comment'}</StyledLabel>
                            <Field name={'comment'} type={'text'} />
                            <ErrorMessage name={'comment'} />
                        </StyledFieldContainer>
                        <StyledButtonsContainer>
                            <StyledButton
                                onClick={() => setShouldShowEditModal(false)}
                                type={'button'}
                            >
                                {'Cancel'}
                            </StyledButton>
                            <StyledButton
                                type={'submit'}
                            >
                                {'Update'}
                            </StyledButton>
                        </StyledButtonsContainer>
                        <div>
                            {updateStatusMessage}
                        </div>
                    </StyledForm>
                )}
            </Formik>
        </StyledModal>
    );
};
