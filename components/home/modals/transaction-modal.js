import React from 'react';
import styled from 'styled-components';
import {Formik, Field, Form, ErrorMessage} from 'formik';
import * as yup from 'yup';
import Select from 'react-select';

import DatePickerField from '../form-fields/date-selector';
import AmountSelector from '../form-fields/amount-selector';

import {Modal} from './modal';

const StyledSelect = styled(Select)`
    width: 150px;
    color: black;
    text-align: left;
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

export const TransactionModal = ({
    shouldShowModal,
    accounts,
    setShouldShowModal,
    transactionBeingEdited,
    handleSubmit,
    initialValues,
    updateStatusMessage,
    title
}) => { 
    console.log('here')
    console.log(`shouldShowModal`, shouldShowModal)
    return (
    <Modal
        isOpen={shouldShowModal}
        onRequestClose={() => setShouldShowModal(false)}
        setShouldShowModal={setShouldShowModal}
        title={title}
    >
        <Formik
            initialValues={initialValues}
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
                        <StyledButton onClick={() => setShouldShowModal(false)} type={'button'}>
                            {'Cancel'}
                        </StyledButton>
                        <StyledButton type={'submit'}>{'Update'}</StyledButton>
                    </StyledButtonsContainer>
                    <div>{updateStatusMessage}</div>
                </StyledForm>
            )}
        </Formik>
    </Modal>
)};
