import validate from './validate'

const validate2 = (editedRecord, taxes, accountPlan) => {
    return validate(
        editedRecord,
        taxes.map(t => t.fasuch),
        Object.keys(accountPlan))
}
const resetState = state => {
    return {
        ...state,
        editedRecord: undefined,
        validations: {},
        creditBalance: undefined,
        balance: undefined,
        focus: []
    }
}
const validateAndMerge = (editedRecord, taxes, accountPlan) => {
    return {
        validations: validate2(editedRecord, taxes, accountPlan),
        editedRecord: editedRecord
    }
}

const lastPosition = (records) => records
    .sort((a, b) => indexSelector(b) - indexSelector(a))
    .map(indexSelector)[0]
export const indexSelector = r => parseInt(r.pos)
const getRecord = (pos, accountingRecords) =>
    accountingRecords.find(e => pos === indexSelector(e))

function recordReducer(state, action) {
    switch (action.type) {
        case 'FETCH_INITIAL': {
            return {
                ...state,
                loading: true
            }
        }
        case 'RECEIVE_ACCOUNTING_RECORDS': {
            const accountingRecords = action.value
            return {
                ...state,
                accountingRecords,
                editedPos: accountingRecords[0].pos + 1,
                loading: false
            }
        }
        case 'RECEIVE_TAXES': {
            return {
                ...state,
                taxes: action.value,
                loading: false
            }
        }
        case 'RECEIVE_ACCOUNT_PLAN': {
            return {
                ...state,
                accountPlan: action.value,
                loading: false
            }
        }
        case 'RECEIVE_CREDIT_BALANCE': {
            return {
                ...state,
                creditBalance: action.value
            }
        }
        case 'RECEIVE_DEBIT_BALANCE': {
            return {
                ...state,
                debitBalance: action.value
            }
        }
        case 'SET_OLD_RECORD':
            const pos = action.pos
            const existsPosition = (pos, accountingRecords) => accountingRecords
                .map(r => indexSelector(r))
                .includes(pos)

            if (!existsPosition(pos, state.accountingRecords)) {
                //TODO notify, that position does not exist
                return { ...state, exceptions: [...state.exceptions, 'Position ex. nicht'] }
            } else {
                const resettedRecordState = resetState(state)
                const editRecord = getRecord(pos, state.accountingRecords)

                return {
                    ...resettedRecordState,
                    editedPos: editRecord.pos,
                    editedRecord: editRecord,
                    validations: validate(editRecord, state.taxes, state.accountPlan)
                }
            }

        case 'SET_NEW_RECORD':
            const lastPos2 = lastPosition(state.accountingRecords)
            if (action.pos !== (1 + lastPos2)) {
                return {
                    ...state,
                    exceptions: [...state.exceptions, `Position ${action.pos} ist nicht fortlaufend`]
                }
            } else {
                const newRecord0 = {
                    pos: action.pos,
                    debitAccount: '',
                    creditAccount: '',
                    date: action.initialDate || '',
                    accountedDate: action.initialDate || '',
                    sum: '0.00',
                    text: '',
                    tax: ''
                }
                return {
                    ...resetState(state),
                    editedRecord: newRecord0,
                    validations: validate2(state.editedRecord, state.taxes, state.accountPlan),
                    balance: undefined,
                    creditBalance: undefined
                }
            }
        case 'RESET':
            return {
                ...resetState(state)
            }

        case 'SET_DEBIT_ACCOUNT':
            const newRecord = { ...state.editedRecord, debitAccount: action.value }
            const validations = validate2(
                newRecord,
                state.taxes,
                state.accountPlan)
            // if (validations.debitAccount === undefined)
            //     return dispatch => {
            //         return {
            //             type: 'FETCH_DEBIT_BALANCE',
            //             value: action.value
            //         }
            //     }
            return {
                ...state,
                editedRecord: newRecord,
                validations
            }
        case 'SET_CREDIT_ACCOUNT':
            const newRecord2 = { ...state.editedRecord, creditAccount: action.value }
            const validations2 = validate2(
                newRecord2,
                state.taxes,
                state.accountPlan)
            // if (validations2.creditAccount === undefined)
            //     return dispatch => {
            //         return {
            //             type: 'FETCH_CREDIT_BALANCE',
            //             value: action.value
            //         }
            //     }
            return {
                ...state,
                editedRecord: newRecord2,
                validations: validations2
            }
        case 'SET_EDITED_POS': {
            return {
                ...state,
                editedPos: action.value
            }
        }
        case 'SET_DATE':
            return {
                ...state,
                ...validateAndMerge({ ...state.editedRecord, date: action.value },
                    state.taxes, state.accountPlan)
            }
        case 'SET_ACCOUNTED_DATE':
            return {
                ...state,
                ...validateAndMerge({ ...state.editedRecord, accountedDate: action.value },
                    state.taxes, state.accountPlan)
            }
        case 'SET_SUM':
            return {
                ...state,
                ...validateAndMerge({ ...state.editedRecord, sum: action.value },
                    state.taxes, state.accountPlan)
            }
        case 'SET_TEXT':
            return {
                ...state,
                ...validateAndMerge({ ...state.editedRecord, text: action.value },
                    state.taxes, state.accountPlan)
            }
        case 'SET_TAX':
            return {
                ...state,
                ...validateAndMerge({ ...state.editedRecord, tax: action.value },
                    state.taxes, state.accountPlan)
            }

        case 'SET_EXCEPTION':
            return {
                ...state,
                exceptions: action.value
            }

        default:
            throw new Error('action not found: ' + JSON.stringify(action))
    }
}

export default recordReducer