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
                throw new Error({
                    ...r,
                    name: r.status,
                    status: r.status,
                    message: r.statusText,
                    url: r.url
                })
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

export const saveEditedRow = formData => {
    return (dispatch, getState) => {
        const { editedPos } = getState()
        failureAwareFetch('/create-record', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...formData, pos: editedPos })
        }).then(r => {
            dispatch(fetchAccountingRecords())
            dispatch({ type: 'RECEIVE_SAVED_RECORD' })
            //TODO: show success
        }).catch(e => dispatch(addException(stringifyException(e))))
    }
}