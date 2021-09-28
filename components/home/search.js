import React, {useState, useRef} from 'react';
import styled from 'styled-components';
import {Formik, Field, Form, ErrorMessage} from 'formik';
import Select from 'react-select';
import 'react-datepicker/dist/react-datepicker.css';
import useSWR from 'swr';

import fetcher from '../../lib/fetch';
import {colors, buttonStyles, StyledSection} from '../../styles';

import {searchSchema} from './schemas/search-schema';
import DatePickerField from './form-fields/date-selector';
import AmountSelector from './form-fields/amount-selector';
import {formFieldStyles} from './form-fields/styles';
import {TransactionsTable} from './transactions-table';
import {StyledH2} from './headers';
import {TransactionsTableSkeleton} from './skeletons';

const StyledSelect = styled(Select)`
    width: 142px;
    color: black;
    text-align: left;
    font-size: 14px;
    color: ${colors.darkGrey};
`;

const StyledForm = styled(Form)`
    display: flex;
    flex-direction: column;
    border-radius: 8px;
`;

const StyledFieldContainer = styled.div`
    display: flex;
    align-items: center;
    margin: 10px 10px 0;
`;

const StyledFieldsGroupContainer = styled.div`
    display: flex;
`;

const StyledButton = styled.button`
    ${buttonStyles};
    margin: 30px auto 0;
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

const StyledField = styled(Field)`
    border-radius: 10px;
    ${formFieldStyles};
`;

const header = 'Search Results';

export const Search = () => {
    const {data: accounts} = useSWR(`/api/controllers/accounts-list-controller`, fetcher);
    const [searchLoading, setSearchLoading] = useState(false);
    const [searchError, setSearchError] = useState(false);
    const [searchResults, setSearchResults] = useState(null);
    const searchResultsRef = useRef(null);

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
            searchResultsRef.current.scrollIntoView({behavior: 'smooth'});
            setSearchError(false);
            setSearchResults(json);
        }

        setSearchLoading(false);
    };

    return (
        <StyledSection>
            <StyledH2>{'Search'}</StyledH2>
            <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={searchSchema}>
                {({setFieldValue, values}) => (
                    <StyledForm>
                        <StyledFieldsGroupContainer>
                            <StyledFieldContainer>
                                <DatePickerField name={'fromDate'} placeholderText={'From date'} />
                                <ErrorMessage name={'fromDate'} />
                            </StyledFieldContainer>
                            <StyledFieldContainer>
                                <DatePickerField name={'toDate'} placeholderText={'To date'} />
                                <ErrorMessage name={'toDate'} />
                            </StyledFieldContainer>
                        </StyledFieldsGroupContainer>
                        <StyledFieldsGroupContainer>
                            <StyledFieldContainer>
                                <StyledSelect
                                    id={'fromAccountObject'}
                                    name={'fromAccountObject'}
                                    onChange={(option) => setFieldValue('fromAccountObject', option)}
                                    options={accounts}
                                    placeholder={'From account'}
                                    value={values.fromAccountObject}
                                />
                                <ErrorMessage name="fromAccountObject" />
                            </StyledFieldContainer>
                            <StyledFieldContainer>
                                <StyledSelect
                                    id={'toAccountObject'}
                                    name={'toAccountObject'}
                                    onChange={(option) => setFieldValue('toAccountObject', option)}
                                    options={accounts}
                                    placeholder={'To account'}
                                    value={values.toAccountObject}
                                />
                                <ErrorMessage name="toAccount" />
                            </StyledFieldContainer>
                        </StyledFieldsGroupContainer>
                        <StyledFieldsGroupContainer>
                            <StyledFieldContainer>
                                <StyledField
                                    component={AmountSelector}
                                    name={'fromAmount'}
                                    placeholder={'From amount'}
                                />
                                <ErrorMessage name={'fromAmount'} />
                            </StyledFieldContainer>
                            <StyledFieldContainer>
                                <StyledField component={AmountSelector} name={'toAmount'} placeholder={'To amount'} />
                                <ErrorMessage name={'toAmount'} />
                            </StyledFieldContainer>
                        </StyledFieldsGroupContainer>
                        <StyledFieldContainer>
                            <StyledField name={'comment'} placeholder={'Description'} type={'text'} />
                            <ErrorMessage name={'comment'} />
                        </StyledFieldContainer>
                        <StyledButton type={'submit'}>{'Submit'}</StyledButton>
                        {searchError ? <div>{'Error!'}</div> : null}
                    </StyledForm>
                )}
            </Formik>
            {searchLoading && <TransactionsTableSkeleton header={header} />}
            <div ref={searchResultsRef}>
                {!searchLoading && searchResults && (
                    <TransactionsTable
                        data={searchResults}
                        header={header}
                        noResultsText={'No results for this search'}
                    />
                )}
            </div>
        </StyledSection>
    );
};
