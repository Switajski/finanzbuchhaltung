import React, { useState, useEffect } from 'react'
import useKey from 'use-key-hook'
import { useAlert } from 'react-alert'
import { Redirect } from 'react-router-dom'

import { StatusHeader, Hr, Scrollable, UpperCase, Loading, Failed } from '../UIComponents'
import DateInput from '../Common/DateInput'
import KeyboardControls, { KeyButton } from '../KeyboardControls'
import Table from '../Table'
import useUrlForRead from '../useUrlForRead'

const toString = d => `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
const createQuery = (from, to) => `/account-overview?from=${from}&to=${to}`

function Kontenabfrage() {
    const [from, setFrom] = useState('2000-01-01')
    const [to, setTo] = useState(toString(new Date()))
    const [query, setQuery] = useState(createQuery(from, to))

    const [redirect, setRedirect] = useState()
    useKey(() => setRedirect(true), { detectKeys: [27] });

    const { result: accountOverview, loading, error: aoErrored } = useUrlForRead(query)
    const { result: accountPlan, error: apErrored } = useUrlForRead('/account-plan')
    const safeAccountPlan = (accountPlan || {})
    const { result: accountConfig, acErrored } = useUrlForRead('/account-config')

    const alert = useAlert()
    useEffect(() => {
        aoErrored && alert.error('Konnte Kontenabfrage nicht vom Server laden')
        apErrored && alert.error('Konnte Kontenplan (konten.dbf) nicht vom Server laden')
        acErrored && alert.error('Konnte Kontenkonfiguration (account-config.edn) nicht vom Server laden')
    }, [aoErrored, apErrored, acErrored, alert])

    if (redirect)
        return <Redirect to={redirect} />

    return <>
        <form onSubmit={e => {
            e.preventDefault()
            setQuery(createQuery(from, to))
        }}>
            <StatusHeader join >
                Kontenabfrage
                <DateInput value={from}
                    onChange={e => setFrom(e.target.value)}
                    autoFocus name='from' label=' von' />
                &nbsp;<DateInput value={to}
                    onChange={e => setTo(e.target.value)}
                    name='to' label='bis' />
            </StatusHeader>

            <KeyboardControls>
                <KeyButton
                    active
                    text='ESC: Hauptmenue'
                    command={() => setRedirect('/')}
                />
                <KeyButton />
                <KeyButton />
                <KeyButton />
                <KeyButton
                    active
                    text='&#8617; : anwenden'
                    submit
                />
            </KeyboardControls>
        </form>
        <Hr />
        {loading ? <Loading /> : aoErrored ? <Failed /> :
            <Scrollable>
                {Object.keys((accountOverview || {})).map(k => <>
                    <UpperCase>{accountConfig ? accountConfig.kklasse_name[k] : k}</UpperCase>
                    <Table accountingSummary attributes={[
                        { name: "Konto", selector: r => r.account },
                        { name: "Kontoname", selector: r => safeAccountPlan[r.account] ? safeAccountPlan[r.account].name_kont : r.account },
                        { name: "Haben", summarize: 'H', suffix: 'H', number: true, selector: r => r.debit !== 0 && r.debit },
                        { name: "Soll", summarize: 'S', suffix: 'S', number: true, selector: r => r.credit !== 0 && r.credit },
                        { name: "Saldo", expressive: true, creditDebitSuffix: true, number: true, selector: r => r.debit - r.credit },
                    ]}
                        values={accountOverview[k]}
                        keySelector={r => r.account}
                        onRowClick={r => setRedirect("/konten-saldo/" + r.account)}
                    /></>
                )}
            </Scrollable>
        }
    </>
}

export default Kontenabfrage