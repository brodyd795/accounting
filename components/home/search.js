import React, {useState} from 'react';
import styled from 'styled-components';
import {Formik, Field, Form, ErrorMessage} from 'formik';
import Select from 'react-select';
import 'react-datepicker/dist/react-datepicker.css';
import useSWR from 'swr';

import fetcher from '../../lib/fetch';

import {searchSchema} from './schemas/search-schema';
import DatePickerField from './form-fields/date-selector';
import AmountSelector from './form-fields/amount-selector';
import {TransactionsTable} from './transactions-table';
import {StyledH2} from './headers';

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
    display: flex;
    flex-direction: column;
    border: 2px solid black;
    border-radius: 10px;
    margin: 10px;
    padding: 10px;
`;

const StyledFieldContainer = styled.div`
    display: flex;
    align-items: center;
    margin: 10px 10px 0;
`;

const StyledFieldsGroupContainer = styled.div`
    display: block;

    @media (min-width: 576px) {
        display: flex;
    }
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

const initialValues = {
    comment: undefined,
    fromAccountObject: undefined,
    fromAmount: undefined,
    fromDate: undefined,
    toAccountObject: undefined,
    toAmount: undefined,
    toDate: undefined
};

export const Search = () => {
    const {data: accounts} = useSWR(`/api/controllers/accounts-list-controller`, fetcher);
    const [searchLoading, setSearchLoading] = useState(false);
    const [searchError, setSearchError] = useState(false);
    const [searchResults, setSearchResults] = useState(null);

    const handleSubmit = async (values) => {
        const {comment, fromAccountObject, toAccountObject, fromDate, toDate, fromAmount, toAmount} = values;

        setSearchLoading(true);

        const res = await fetch(`/api/controllers/transactions/search-controller`, {
            body: JSON.stringify({
                input: {
                    comment: comment || undefined,
                    fromAccount: fromAccountObject?.accountId || undefined,
                    fromAmount: fromAmount * 100 || undefined,
                    fromDate: fromDate ? new Date(fromDate) : undefined,
                    toAccount: toAccountObject?.accountId || undefined,
                    toAmount: toAmount * 100 || undefined,
                    toDate: toDate ? new Date(toDate) : undefined
                }
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        });
        const json = await res.json();

        if (!res.ok) {
            setSearchError(true);
        } else {
            setSearchError(false);
            setSearchResults(json);
        }

        setSearchLoading(false);
    };

    return (
        <StyledSearchContainer>
            <StyledH2>{'Search'}</StyledH2>
            <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={searchSchema}>
                {({setFieldValue, values}) => (
                    <StyledForm>
                        <StyledFieldsGroupContainer>
                            <StyledFieldContainer>
                                <StyledLabel htmlFor={'fromDate'}>{'From Date:'}</StyledLabel>
                                <DatePickerField name={'fromDate'} type={'text'} />
                                <ErrorMessage name={'fromDate'} />
                            </StyledFieldContainer>
                            <StyledFieldContainer>
                                <StyledLabel htmlFor={'toDate'}>{'To Date:'}</StyledLabel>
                                <DatePickerField name={'toDate'} type={'text'} />
                                <ErrorMessage name={'toDate'} />
                            </StyledFieldContainer>
                        </StyledFieldsGroupContainer>
                        <StyledFieldsGroupContainer>
                            <StyledFieldContainer>
                                <StyledLabel htmlFor={'fromAccountObject'}>{'From account:'}</StyledLabel>
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
                                <StyledLabel htmlFor={'toAccountObject'}>{'To account:'}</StyledLabel>
                                <StyledSelect
                                    id={'toAccountObject'}
                                    name={'toAccountObject'}
                                    onChange={(option) => setFieldValue('toAccountObject', option)}
                                    options={accounts}
                                    value={values.toAccountObject}
                                />
                                <ErrorMessage name="toAccount" />
                            </StyledFieldContainer>
                        </StyledFieldsGroupContainer>
                        <StyledFieldsGroupContainer>
                            <StyledFieldContainer>
                                <StyledLabel htmlFor={'fromAmount'}>{'From Amount:'}</StyledLabel>
                                <Field component={AmountSelector} name={'fromAmount'} showWhileDemo />
                                <ErrorMessage name={'fromAmount'} />
                            </StyledFieldContainer>
                            <StyledFieldContainer>
                                <StyledLabel htmlFor={'toAmount'}>{'To Amount:'}</StyledLabel>
                                <Field component={AmountSelector} name={'toAmount'} showWhileDemo />
                                <ErrorMessage name={'toAmount'} />
                            </StyledFieldContainer>
                        </StyledFieldsGroupContainer>
                        <StyledFieldContainer>
                            <StyledLabel htmlFor={'comment'}>{'Description:'}</StyledLabel>
                            <Field name={'comment'} type={'text'} />
                            <ErrorMessage name={'comment'} />
                        </StyledFieldContainer>
                        <StyledButtonsContainer>
                            <StyledButton type={'submit'}>{'Submit'}</StyledButton>
                        </StyledButtonsContainer>
                        {searchError ? <div>{'Error!'}</div> : null}
                        {searchLoading ? <div>{'Loading...'}</div> : null}
                    </StyledForm>
                )}
            </Formik>
            {searchResults ? (
                <TransactionsTable
                    data={searchResults}
                    header={'Search Results'}
                    noResultsText={'No results for this search'}
                />
            ) : null}
        </StyledSearchContainer>
    );
};
