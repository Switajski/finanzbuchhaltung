import { indexSelector } from './App'

const stringifyException = (e, action) => {
    if (e.name === undefined)
        return JSON.stringify(e)
    return e.name + ': ' + e.message + (action ? action : '') + (e.statusText ? e.statusText : '')
}

const fetchBalance = accountNo =>
    failureAwareFetch('/balance?accountNo=' + accountNo)
        .then(r => r.sum)

export const RECEIVE_DEBIT_BALANCE = "RECEIVE_DEBIT_BALANCE";
export const fetchDebitBalance = accountNo =>
    dispatch => fetchBalance(accountNo)
        .then(balance => dispatch({ type: RECEIVE_DEBIT_BALANCE, value: balance }))
        .catch(e => dispatch(addException(stringifyException(e), RECEIVE_DEBIT_BALANCE)))

export const RECEIVE_CREDIT_BALANCE = "RECEIVE_CREDIT_BALANCE";
export const fetchCreditBalance = accountNo =>
    dispatch => fetchBalance(accountNo)
        .then(balance => dispatch({ type: RECEIVE_CREDIT_BALANCE, value: balance }))
        .catch(e => dispatch(addException(stringifyException(e), RECEIVE_CREDIT_BALANCE)))

export const selectPos = pos => {
    return (dispatch, getState) => {
        const { accountingRecords } = getState()
        accountingRecords.sort((a, b) => indexSelector(b) - indexSelector(a))
        const newPos = indexSelector(accountingRecords[0]) + 1
        if (pos === newPos)
            dispatch({
                type: 'SET_NEW_RECORD',
                pos,
                initialDate: accountingRecords[0].date
            })
        else {
            const foundRecordWithPosition = accountingRecords.find(e => pos === indexSelector(e))
            if (foundRecordWithPosition) {
                fetchBalance(foundRecordWithPosition.debitAccount)
                    .then(balance => dispatch({
                        type: "RECEIVE_DEBIT_BALANCE",
                        value: balance
                    }))
                fetchBalance(foundRecordWithPosition.creditAccount)
                    .then(balance => dispatch({
                        type: "RECEIVE_CREDIT_BALANCE",
                        value: balance
                    }))
                dispatch({
                    type: 'SET_OLD_RECORD',
                    pos: indexSelector(foundRecordWithPosition)
                })
            }
        }
    }
}

const failureAwareFetch = (url, opts) => {
    return fetch(url, opts)
        .then(r => {
            if (!r.ok) {
                throw {
                    ...r,
                    name: r.status,
                    status: r.status,
                    message: r.statusText,
                    url: r.url
                }
            }
            return r.json()
        })
}

const RECEIVE_ACCOUNTING_RECORDS = 'RECEIVE_ACCOUNTING_RECORDS'
export const fetchAccountingRecords = () => {
    return dispatch => failureAwareFetch("/accounting-records")
        .then(r => {
            dispatch({
                type: RECEIVE_ACCOUNTING_RECORDS,
                value: r.slice(1)
                    .sort((a, b) => indexSelector(b) - indexSelector(a))
            })
        })
        .catch(e => dispatch(addException(stringifyException(e), RECEIVE_ACCOUNTING_RECORDS)))
}
export const RECEIVE_ACCOUNT_PLAN = 'RECEIVE_ACCOUNT_PLAN';
export const fetchAccountPlan = () => {
    return dispatch => failureAwareFetch("/account-plan") //TODO: use redux with state machine
        .then(r => {
            dispatch({
                type: RECEIVE_ACCOUNT_PLAN,
                value: r.slice(1)
                    .reduce((a, account) => {
                        a.set(account.konto_nr, account.name_kont)
                        return a
                    }, new Map())
            })
        })
        .catch(e => dispatch(addException(stringifyException(e), RECEIVE_ACCOUNT_PLAN)))
}

export const RECEIVE_TAXES = 'RECEIVE_TAXES';
export const fetchTaxes = () => {
    return dispatch => failureAwareFetch("/taxes")
        .then(r => dispatch({ type: RECEIVE_TAXES, value: r }))
        .catch(e => dispatch(addException(stringifyException(e))))
}

export const SET_DEBIT_ACCOUNT = 'SET_DEBIT_ACCOUNT'
export const setDebitAccount = newValue => {
    return (dispatch, getState) => {
        dispatch({
            type: SET_DEBIT_ACCOUNT,
            value: newValue
        })
        const { validations } = getState()
        if (validations.debitAccount === undefined) {
            dispatch(
                fetchDebitBalance(newValue))
        }
    }
}

export const SET_CREDIT_ACCOUNT = 'SET_CREDIT_ACCOUNT'
export const setCreditAccount = newValue => {
    return (dispatch, getState) => {
        const { validations } = getState()
        dispatch({
            type: SET_CREDIT_ACCOUNT,
            value: newValue
        })
        if (validations.debitAccount === undefined) {
            dispatch(
                fetchCreditBalance(newValue))
        }
    }
}

export const CANCEL_EDITED_RECORD = 'CANCEL_EDITED_RECORD'
export const cancelEditedRecord = () => {
    return dispatch => {
        return dispatch({ type: CANCEL_EDITED_RECORD })
    }
}

export const addException = e => {
    return (dispatch, getState) => {
        const { exceptions } = getState()
        return dispatch({
            type: 'SET_EXCEPTION',
            value: [...exceptions, e]
        })
    }
}

export const saveEditedRow = () => {
    return (dispatch, getState) => {
        const { editedRecord } = getState()
        failureAwareFetch('/create-record', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editedRecord)
        }).then(r => {
            dispatch(fetchAccountingRecords())
            dispatch({ type: 'RECEIVE_SAVED_RECORD' })
        }).catch(e => dispatch(addException(stringifyException(e))))
    }
}