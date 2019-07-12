const INVALID_DATE_MSG = 'Datum ex. nicht'
const INVALID_ACCOUNT_MSG = 'Konto ex. nicht'
const INVALID_TAX_MSG = 'Steuerschl. ex. nicht'

const validate = (editedRecord, taxes, accountPlan) => {
    const validations = {}
    if (editedRecord) {
        if (editedRecord.date === undefined)
            validations.date = INVALID_DATE_MSG
        if (editedRecord.accountedDate === undefined)
            validations.accountedDate = INVALID_DATE_MSG
        if (accountPlan.indexOf(editedRecord.debitAccount) > 0)
            validations.debitAccount = INVALID_ACCOUNT_MSG
        if (accountPlan.indexOf(editedRecord.creditAccount) > 0)
            validations.creditAccount = INVALID_ACCOUNT_MSG
        if (taxes.indexOf(editedRecord.tax) < 0)
            validations.tax = INVALID_TAX_MSG
    }
    return validations
}

export default validate