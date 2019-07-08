const parseDate = str => {
    if (str === undefined)
        return
    const splitted = str.split('.')
    const d = new Date(`20${splitted[2]}-${splitted[1]}-${splitted[0]}`)
    if (!isNaN(d.getTime()))
        return d
}
const INVALID_DATE_MSG = 'Datum ex. nicht'
const INVALID_ACCOUNT_MSG = 'Konto ex. nicht'
const INVALID_TAX_MSG = 'Steuerschl. ex. nicht'

const validate = (editedRecord, taxes, accountPlan) => {
    const validations = {}
    if (editedRecord) {
        if (parseDate(editedRecord.date) === undefined)
            validations.date = INVALID_DATE_MSG
        if (parseDate(editedRecord.accountedDate) === undefined)
            validations.accountedDate = INVALID_DATE_MSG
        if (accountPlan[editedRecord.debitAccount] === undefined)
            validations.debitAccount = INVALID_ACCOUNT_MSG
        if (accountPlan[editedRecord.creditAccount] === undefined)
            validations.creditAccount = INVALID_ACCOUNT_MSG
        if (taxes.indexOf(editedRecord.tax) < 0)
            validations.tax = INVALID_TAX_MSG
    }
    return validations
}

export default validate