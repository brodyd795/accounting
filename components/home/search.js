import React from 'react';
import styled from 'styled-components';
import {Formik, Field, Form, ErrorMessage} from 'formik';
import Select from 'react-select';
import 'react-datepicker/dist/react-datepicker.css';
import * as yup from 'yup';
import useSWR from 'swr';

import fetcher from '../../lib/fetch';

import DatePickerField from './form-fields/date-selector';
import AmountSelector from './form-fields/amount-selector';

const StyledSearchContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;


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
                if (this.parent.toAccountObject.accountId === undefined || this.parent.fromAccountObject.accountId === undefined) {
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
                if (this.parent.toAccountObject.accountId === undefined || this.parent.fromAccountObject.accountId === undefined) {
                    return true;
                }

                // eslint-disable-next-line no-invalid-this
                return this.parent.fromAccountObject.accountId !== this.parent.toAccountObject.accountId;
            }
        )
});

const initialValues = {
    fromAmount: undefined,
    toAmount: undefined,
    comment: undefined,
    toDate: undefined,
    fromDate: undefined,
    fromAccountObject: undefined,
    toAccountObject: undefined
};

export const Search = () => {
    const {data: accounts, error} = useSWR(`/api/controllers/accounts-list-controller`, fetcher);

    const handleSubmit = async (values) => {
        console.log('submitting!');
        console.log(`values`, values)
        
        const {
            comment,
            fromAccountObject,
            toAccountObject,
            fromDate,
            toDate,
            fromAmount,
            toAmount
        } = values;
        

        // const res = await fetch(`/api/controllers/transactions/search`, {
        //     body: JSON.stringify({
        //         input: {
        //             comment,
        //             fromAccount: fromAccountObject.accountId,
        //             fromAmount: fromAmount * 100,
        //             fromDate: fromDate ? new Date(fromDate) : undefined,
        //             toAccount: toAccountObject.accountId,
        //             toAmount: toAmount * 100,
        //             toDate: toDate ? new Date(toDate) : undefined
        //         }
        //     }),
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     method: 'GET'
        // });
    };

    return (
        <StyledSearchContainer>
            <h2>{'Search'}</h2>
            <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
                {({setFieldValue, values}) =>
                    (
                        <StyledForm>
                            <StyledFieldContainer>
                                <StyledLabel htmlFor={'fromDate'}>{'From Date'}</StyledLabel>
                                <DatePickerField name={'fromDate'} type={'text'} />
                                <ErrorMessage name={'fromDate'} />
                            </StyledFieldContainer>
                            <StyledFieldContainer>
                                <StyledLabel htmlFor={'toDate'}>{'To Date'}</StyledLabel>
                                <DatePickerField name={'toDate'} type={'text'} />
                                <ErrorMessage name={'toDate'} />
                            </StyledFieldContainer>
                            <StyledFieldContainer>
                                <StyledLabel htmlFor={'fromAccountObject'}>{'From account'}</StyledLabel>
                                <StyledSelect
                                    id={'fromAccountObject'}
                                    name={'fromAccountObject'}
                                    onChange={(option) => setFieldValue('fromAccountObject', option)}
                                    options={accounts}
                                    value={values.fromAccountObject}
                                />
                                <ErrorMessage name="fromAccountObject" />
                            </StyledFieldContainer>
                            <StyledFieldContainer>
                                <StyledLabel htmlFor={'toAccountObject'}>{'To account'}</StyledLabel>
                                <StyledSelect
                                    id={'toAccountObject'}
                                    name={'toAccountObject'}
                                    onChange={(option) => setFieldValue('toAccountObject', option)}
                                    options={accounts}
                                    value={values.toAccountObject}
                                />
                                <ErrorMessage name="toAccount" />
                            </StyledFieldContainer>
                            <StyledFieldContainer>
                                <StyledLabel htmlFor={'fromAmount'}>{'From Amount'}</StyledLabel>
                                <Field component={AmountSelector} name={'fromAmount'} />
                                <ErrorMessage name={'fromAmount'} />
                            </StyledFieldContainer>
                            <StyledFieldContainer>
                                <StyledLabel htmlFor={'toAmount'}>{'To Amount'}</StyledLabel>
                                <Field component={AmountSelector} name={'toAmount'} />
                                <ErrorMessage name={'toAmount'} />
                            </StyledFieldContainer>
                            <StyledFieldContainer>
                                <StyledLabel htmlFor={'comment'}>{'Comment'}</StyledLabel>
                                <Field name={'comment'} type={'text'} />
                                <ErrorMessage name={'comment'} />
                            </StyledFieldContainer>
                            <StyledButtonsContainer>
                                {/* <StyledButton onClick={() => setShouldShowModal(false)} type={'button'}>
                                    {'Cancel'}
                                </StyledButton> */}
                                <StyledButton type={'submit'}>{'Update'}</StyledButton>
                            </StyledButtonsContainer>
                            {/* <div>{updateStatusMessage}</div> */}
                        </StyledForm>
                    )
                }
            </Formik>
        </StyledSearchContainer>
    )
};
