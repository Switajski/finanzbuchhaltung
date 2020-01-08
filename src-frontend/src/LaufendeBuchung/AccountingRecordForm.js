import React, { useState, useEffect } from 'react'
import useForm from "react-hook-form";
import { EditFormKeyboardControls } from '../KeyboardControls'
import { Padding, Emphasize, HorSpacer, Loading } from '../UIComponents'
import styled from 'styled-components'

import useBalance from './useBalance'

import LabeledInput from '../Common/LabeledInput'
import TextInput from './TextInput'
import CurrencyInput from './CurrencyInput'
import DateInput from '../Common/DateInput'
import Select from '../Common/Select'
import useUrlForRead from '../useUrlForRead';

const Flex = styled.div`
display:flex;
justify-content: space-between;`
const FlexEnd = styled.div`
display:flex;
justify-content: flex-start;`

const INVALID_ACCOUNT_MSG = 'Konto ex. nicht'
const INVALID_DATE_MSG = 'Datum ex. nicht'
const INVALID_TAX_MSG = 'Steuerschl. ex. nicht'
const TEXT_EMPTY_MSG = 'Keinen Text eingegeben'
const INVALID_SUM_MSG = 'Keinen Betrag eingegeben'

const isDate = v => isNaN(Date.parse(v))

const AlignRight = styled.div`text-align:right;`
const NoWrap = styled.span`white-space: nowrap;`
const Saldo = ({ value }) => <>Saldo <NoWrap>{(value < 0 ? -value : value).toLocaleString()} {value < 0 ? 'S' : 'H'} </NoWrap></>

function AccountingRecordForm(props) {

    const { result: accountPlan, loading, error } = useUrlForRead('/account-plan')
    const accountPlanOptions = Object.keys((accountPlan || {}))
        .map(k => {
            return {
                value: accountPlan[k].konto_nr,
                name: accountPlan[k].name_kont
            }
        })
    const { result: taxesRaw /* find way to combine errors */ } = useUrlForRead('/taxes')
    const taxes = (taxesRaw || [])
    const { handleSubmit, register, errors, reset } = useForm({
        defaultValues: props.defaultValues
    });

    useEffect(() => reset(props.defaultValues), [props.defaultValues, reset])

    const [creditAccount, setCreditAccount] = useState()
    const [debitAccount, setDebitAccount] = useState()
    const [{ creditBalance, debitBalance }] = useBalance({ accountPlan, debitAccount, creditAccount })

    const validTaxOptions = taxes.map(v => v.fasuch)

    /* The loading condition ensures that the select input is rendered only when the app already received 'accountPlan' prop from api-call. The 'register' fn from 'react-form-hook'-lib takes args from 1st render only. As result the args are not updated, when accountPlan or taxes are loaded :/ */
    // TODO: reproduce in Codesandbox and report lib-owner
    if (error) return <p>Konnte Buchungsplan nicht vom Server laden.</p>
    return loading ? <Loading /> : <form
        onSubmit={handleSubmit(props.onSubmit)} >
        <Padding>
            <Flex>
                <div><LabeledInput
                    name='pos'
                    label='Pos.'
                    size={6}
                    readOnly={true}
                    value={props.pos}
                    ref={register}
                /></div>

                <div><DateInput
                    name='date'
                    label='Datum'
                    autoFocus
                    ref={register({
                        validate: v => !isDate(v) || INVALID_DATE_MSG
                    })}
                    validationMsg={errors.date}
                /></div>

                <div><DateInput
                    name='accountedDate'
                    label='Buchungsdatum'
                    ref={register({
                        validate: v => !isDate(v) || INVALID_DATE_MSG
                    })}
                    validationMsg={errors.accountedDate}
                /><br />
                </div>
            </Flex>

            <br />
            <Flex>
                <div><Select
                    name='debitAccount'
                    label="Konto Soll&nbsp;&nbsp;"
                    onChange={e => setDebitAccount(e.target.value)}
                    options={accountPlanOptions}
                    ref={register({
                        validate: v => accountPlan[v] || INVALID_ACCOUNT_MSG
                    })}
                    validationMsg={errors.debitAccount}
                />
                </div>
                {debitBalance !== undefined && <>
                    <div><Emphasize>
                        {debitBalance !== undefined && accountPlan[debitAccount] && accountPlan[debitAccount].name_kont}
                    </Emphasize></div>
                    <AlignRight><Emphasize>
                        {debitBalance !== undefined && <Saldo value={debitBalance} />}
                    </Emphasize></AlignRight>
                </>}
            </Flex>

            <Flex>
                <div><Select
                    name='creditAccount'
                    label="Konto Haben&nbsp;"
                    onChange={e => setCreditAccount(e.target.value)}
                    options={accountPlanOptions}
                    ref={register({
                        validate: v => accountPlan[v] || INVALID_ACCOUNT_MSG
                    })}
                    validationMsg={errors.creditAccount}
                />
                </div>
                {creditBalance !== undefined && <>
                    <div><Emphasize>
                        {creditBalance !== undefined && accountPlan[creditAccount].name_kont}
                    </Emphasize></div>
                    <AlignRight><Emphasize>
                        {creditBalance !== undefined && <Saldo value={creditBalance} />}
                    </Emphasize></AlignRight>
                </>}
            </Flex>
            <br />
            <FlexEnd>
                <div>
                    <CurrencyInput
                        name='sum'
                        size={7}
                        label='Summe'
                        ref={register({ required: INVALID_SUM_MSG, min: 0 })}
                        validationMsg={errors.sum}
                    />
                    <HorSpacer />
                </div>
                <div>
                    <Select
                        size={7}
                        name='tax'
                        label='Steuerschl.'
                        options={taxes.map(t => { return { value: t.fasuch, name: t.fatext } })}
                        ref={register({ validate: v => (validTaxOptions.indexOf(v) > -1) || INVALID_TAX_MSG })}
                        validationMsg={errors.tax}
                    />
                </div>
            <br />
            </FlexEnd>
            <TextInput
                name='text'
                label='Text&nbsp;'
                size={30}
                ref={register({ required: TEXT_EMPTY_MSG })}
                validationMsg={errors.text}
            />
        </Padding>
        <EditFormKeyboardControls cancel={props.cancel} />
    </form>


}

export default AccountingRecordForm