import React from 'react';
import styled from 'styled-components';
import {Formik, Field, Form, ErrorMessage} from 'formik';
import * as yup from 'yup';
import Select from 'react-select';

import DatePickerField from '../form-fields/date-selector';
import AmountSelector from '../form-fields/amount-selector';
import {validationSchema} from '../transaction-validation-schema';

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

export const TransactionModal = ({
    shouldShowModal,
    accounts,
    setShouldShowModal,
    handleSubmit,
    initialValues,
    updateStatusMessage,
    title
}) => (
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
);
