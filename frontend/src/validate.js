const INVALID_DATE_MSG = 'Datum ex. nicht'
const INVALID_ACCOUNT_MSG = 'Konto ex. nicht'
const INVALID_TAX_MSG = 'Steuerschl. ex. nicht'
const TEXT_EMPTY_MSG = 'Keinen Text eingegeben'
const INVALID_SUM_MSG = 'Keinen Betrag eingegeben'

const isDate = v => !isNaN(Date.parse(v))
const validate = (editedRecord, taxes, accountPlan) => {
    const validations = {}
    if (editedRecord) {
        if (!isDate(editedRecord.date))
            validations.date = INVALID_DATE_MSG
        if (!isDate(editedRecord.accountedDate) === undefined)
            validations.accountedDate = INVALID_DATE_MSG
        if (!accountPlan.has(editedRecord.debitAccount))
            validations.debitAccount = INVALID_ACCOUNT_MSG
        if (editedRecord.sum === undefined)
            validations.sum = INVALID_SUM_MSG
        if (!accountPlan.has(editedRecord.creditAccount))
            validations.creditAccount = INVALID_ACCOUNT_MSG
        if (!taxes.includes(editedRecord.tax))
            validations.tax = INVALID_TAX_MSG
        if (editedRecord.text === '')
            validations.text = TEXT_EMPTY_MSG
    }
    return validations
}

export default validate