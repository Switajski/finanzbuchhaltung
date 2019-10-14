import React, { useMemo, useState, useEffect } from 'react'
import useForm from "react-hook-form";
import KeyboardControls, { KeyButton } from './KeyboardControls'
import { Padding, Grid, Emphasize, HorSpacer } from './UIComponents'
import { Cell } from 'styled-css-grid'

import useAccountPlan from './useAccountPlan'
import useBalance from './useBalance'

import LabeledInput from './LabeledInput'
import TextInput from './TextInput'
import CurrencyInput from './CurrencyInput'
import DateInput from './DateInput'
import Select from './Select'

const INVALID_ACCOUNT_MSG = 'Konto ex. nicht'
const INVALID_DATE_MSG = 'Datum ex. nicht'
const INVALID_TAX_MSG = 'Steuerschl. ex. nicht'
const TEXT_EMPTY_MSG = 'Keinen Text eingegeben'
const INVALID_SUM_MSG = 'Keinen Betrag eingegeben'

const isDate = v => isNaN(Date.parse(v))

function AccountingRecordForm(props) {

    const [{ accountPlan, taxes, isLoading, isError }] = useAccountPlan();
    const { handleSubmit, register, errors, reset } = useForm({
        defaultValues: props.defaultValues
    });

    useEffect(() => reset(props.defaultValues), [props.defaultValues])

    const [creditAccount, setCreditAccount] = useState()
    const [debitAccount, setDebitAccount] = useState()
    const [{ creditBalance, debitBalance }, balanceErrored] = useBalance({ accountPlan, debitAccount, creditAccount })

    const validTaxOptions = taxes.map(v => v.fasuch)

    const accountPlanOptions = useMemo(
        () => Array.from(
            accountPlan,
            ([k, v]) => { return { value: k, name: v } }),
        [accountPlan])

    /* The is loading condition ensures that the select input is rendered only when the app already received 'accountPlan' prop from api-call. The 'register' fn from 'react-form-hook'-lib takes args from 1st render only. As result the args are not updated, when accountPlan or taxes are loaded :/ */
    // TODO: reproduce in Codesandbox and report lib-owner
    if (isError) return <p>Konnte Buchungsplan nicht vom Server laden.</p>
    return isLoading ? <p>Laedt...</p> : <form
        onSubmit={handleSubmit(props.onSubmit)} >
        <Padding>
            <Grid columns={3}>
                <Cell><LabeledInput
                    name='pos'
                    label='Position Nr.'
                    size={6}
                    readOnly={true}
                    value={props.pos}
                    ref={register}
                /></Cell>

                <Cell><DateInput
                    name='date'
                    label='Datum'
                    autoFocus
                    ref={register({
                        validate: v => !isDate(v) || INVALID_DATE_MSG
                    })}
                    validationMsg={errors.date}
                /></Cell>

                <Cell><DateInput
                    name='accountedDate'
                    label='Buchungsdatum'
                    ref={register({
                        validate: v => !isDate(v) || INVALID_DATE_MSG
                    })}
                    validationMsg={errors.accountedDate}
                /><br />
                </Cell>
            </Grid>

            <br />
            <Grid columns={debitBalance === undefined ? 1 : 3}>
                <Cell><Select
                    name='debitAccount'
                    label="Konto Soll&nbsp;&nbsp;"
                    onChange={e => setDebitAccount(e.target.value)}
                    options={accountPlanOptions}
                    ref={register({
                        validate: v => accountPlan.has(v) || INVALID_ACCOUNT_MSG
                    })}
                    validationMsg={errors.debitAccount}
                />
                </Cell>
                {debitBalance !== undefined && <>
                    <Cell><Emphasize>
                        {debitBalance !== undefined && accountPlan.get(debitAccount)}
                    </Emphasize></Cell>
                    <Cell><Emphasize>
                        {debitBalance !== undefined && 'Saldo ' + debitBalance + ' S'}
                    </Emphasize></Cell>
                </>}
            </Grid>

            <Grid columns={creditBalance === undefined ? 1 : 3}>
                <Cell><Select
                    name='creditAccount'
                    label="Konto Haben&nbsp;"
                    onChange={e => setCreditAccount(e.target.value)}
                    options={accountPlanOptions}
                    ref={register({
                        validate: v => accountPlan.has(v) || INVALID_ACCOUNT_MSG
                    })}
                    validationMsg={errors.creditAccount}
                />
                </Cell>
                {creditBalance !== undefined && <>
                    <Cell><Emphasize>
                        {creditBalance !== undefined && accountPlan.get(creditAccount)}
                    </Emphasize></Cell>
                    <Cell><Emphasize>
                        {creditBalance !== undefined && 'Saldo ' + creditBalance + ' H'}
                    </Emphasize></Cell>
                </>}
            </Grid>
            <br />

            <CurrencyInput
                name='sum'
                label='Summe'
                ref={register({ required: INVALID_SUM_MSG, min: 0 })}
                validationMsg={errors.sum}
            />
            <HorSpacer />
            <Select
                size={7}
                name='tax'
                label='Steuerschl.'
                options={taxes.map(t => { return { value: t.fasuch, name: t.fatext } })}
                ref={register({ validate: v => (validTaxOptions.indexOf(v) > -1) || INVALID_TAX_MSG })}
                validationMsg={errors.tax}
            />
            <br />
            <TextInput
                name='text'
                label='Text&nbsp;'
                size={30}
                ref={register({ required: TEXT_EMPTY_MSG })}
                validationMsg={errors.text}
            />
        </Padding>
        <KeyboardControls>
            <KeyButton
                active
                type='reset'
                command={props.cancel}
                key='ESC'
                text='ESC: Abbrechen' />
            <KeyButton />
            <KeyButton />
            <KeyButton
                active
                text='TAB: naechstes Eingabefeld'
            />
            <KeyButton
                active
                text='Enter: speichern'
                type='submit'
            />
        </KeyboardControls>
    </form>


}

export default AccountingRecordForm