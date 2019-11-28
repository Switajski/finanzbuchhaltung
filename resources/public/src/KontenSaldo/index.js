import React, { useState, useEffect } from 'react'
import { useParams, Redirect } from 'react-router-dom'
import useKey from 'use-key-hook'
import { useAlert } from "react-alert";


import { StatusHeader, Hr, Scrollable, Centered, Emphasize, Loading, Failed } from '../UIComponents'
import Select from '../Common/Select'
import KeyboardControls, { KeyButton } from '../KeyboardControls'
import useUrlForRead from '../useUrlForRead'
import Table from '../Table'

function KontenSaldo() {
    const { accountNo } = useParams()
    const [account, setAccount] = useState(accountNo)
    const { result, loading, error } = useUrlForRead('/account-expressive?accountNo=' + accountNo)
    const { result: accountPlan, error: apErrored } = useUrlForRead('/account-plan')
    const accountPlanOptions = Object.keys((accountPlan || {}))
        .map(k => {
            return {
                value: accountPlan[k].konto_nr,
                name: accountPlan[k].name_kont
            }
        })

    const alert = useAlert()
    useEffect(() => {
        error && alert.error('Konnte Kontensaldo nicht vom Server laden')
        apErrored && alert.error('Konnte Kontenplan (konten.dbf) nicht vom Server laden')
    }, [error, apErrored])

    const [redirect, setRedirect] = useState()
    useKey(() => setRedirect('/'), { detectKeys: [27] });

    const AccountSelect = () => <form onSubmit={e => {
        e.preventDefault()
        setRedirect('/reload/konten-saldo/' + account)
    }}><Select options={accountPlanOptions}
        autoFocus
        label='Kontonr.:'
        name='account'
        value={account}
        onChange={e => setAccount(e.target.value)} />
    </form>

    if (redirect) {
        return <Redirect from={'/konten-saldo/' + account} to={redirect} />
    }

    return <>
        <StatusHeader right={<AccountSelect />}>
            <Centered>Kontosaldo von {accountPlan && accountPlan[accountNo] && <Emphasize>&nbsp;{(accountPlan[accountNo].name_kont)}</Emphasize>}</Centered>
        </StatusHeader>
        <KeyboardControls>
            <KeyButton
                active
                text='ESC: Hauptmenue'
                command={() => setRedirect('/')}
            />
            <KeyButton
                active
                text="Kontenabfrage"
                command={() => setRedirect('/kontenabfrage')} />
            <KeyButton />
            <KeyButton />
            <KeyButton />
        </KeyboardControls>
        <Hr />
        {loading ? <Loading /> : error ? <Failed />
            : (result && result.length < 1) ? <Centered>Keine Buchungen gefunden</Centered>
                : <Scrollable><Table attributes={[
                    { name: "Beleg", selector: r => r.pos },
                    { name: "Buchung", date: true, selector: r => r.accountedDate },
                    { name: "Haben", summarize: 'H', number: true, suffix: 'H', selector: r => r.debit !== 0 && r.debit },
                    { name: "Soll", summarize: 'S', number: true, suffix: 'S', selector: r => r.credit !== 0 && r.credit },
                    { name: "Buchungstext", expressive: true, selector: r => r.text },
                    { name: "Gegen", selector: r => r.gegen },
                ]}
                    values={result}
                    keySelector={r => r.pos}
                    accountingSummary />
                </Scrollable>}
    </>
}

export default KontenSaldo