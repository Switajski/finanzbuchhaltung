import { CANCEL_EDITED_RECORD } from './actions'

const resetState = state => {
    return {
        ...state,
        editedRecord: undefined,
        validations: {},
        creditBalance: undefined,
        debitBalance: undefined
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
        case 'RECEIVE_SAVED_RECORD': {
            return resetState(state)
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
                    sum: '',
                    text: '',
                    tax: ''
                }
                return {
                    ...resetState(state),
                    editedRecord: newRecord0,
                    balance: undefined,
                    creditBalance: undefined,
                }
            }
        case CANCEL_EDITED_RECORD:
            return {
                ...resetState(state)
            }


        case 'SET_EDITED_POS': {
            return {
                ...state,
                editedPos: action.value
            }
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