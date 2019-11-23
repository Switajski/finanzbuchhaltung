import React, { useState } from 'react'
import { useParams, Redirect } from 'react-router-dom'
import useKey from 'use-key-hook'

import { StatusHeader, Hr, Scrollable, Padding } from '../UIComponents'
import Select from '../LaufendeBuchung/Select'
import KeyboardControls, { KeyButton } from '../KeyboardControls'
import useUrlForRead from '../useUrlForRead'
import Table from '../Table'

function KontenSaldo() {
    const { accountNo } = useParams()
    const [account, setAccount] = useState(accountNo)
    const { result, loading, error } = useUrlForRead('/account-expressive?accountNo=' + accountNo)
    const { result: accountPlan } = useUrlForRead('/account-plan')
    const accountPlanOptions = Object.keys((accountPlan || {}))
        .map(k => {
            return {
                value: accountPlan[k].konto_nr,
                name: accountPlan[k].name_kont
            }
        })

    const [redirect, setRedirect] = useState()
    useKey(() => setRedirect('/'), { detectKeys: [27] });
    useKey(() => setRedirect('/kontenabfrage'), { detectKeys: ['1'] });

    if (redirect) {
        return <Redirect from={'/konten-saldo/' + account} to={redirect} />
    }

    return <>
        <StatusHeader right={(accountNo === undefined) ? `Kontensaldo` : `Kontensaldo von ${accountNo}`} />
        <Hr />
        <Padding>
            Kontenausdruck von {accountNo} {accountPlan && accountPlan[accountNo] && (' - ' + accountPlan[accountNo].name_kont)}
            <form onSubmit={e => {
                e.preventDefault()
                setRedirect('/reload/konten-saldo/' + account)
            }}><Select options={accountPlanOptions}
                name='account'
                label="Konto &nbsp;"
                value={account}
                onChange={e => setAccount(e.target.value)} />
            </form>
        </Padding>
        <KeyboardControls>
            <KeyButton
                active
                text='ESC: Hauptmenue'
                command={() => setRedirect('/')}
            />
            <KeyButton
                active
                text="1: Kontenabfrage"
                command={() => setRedirect('/kontenabfrage')} />
            <KeyButton />
            <KeyButton />
            <KeyButton />
        </KeyboardControls>
        <Hr />
        <Scrollable><Table attributes={[
            { name: "Beleg", selector: r => r.pos },
            { name: "Buchung", selector: r => r.accountedDate },
            { name: "Haben", summarize: 'D', number: true, selector: r => { if (r.debit !== 0) return r.debit } },
            { name: "Soll", summarize: 'C', number: true, selector: r => { if (r.credit !== 0) return r.credit } },
            { name: "Buchungstext", selector: r => r.text },
            { name: "Gegen", summarize: 'S', selector: r => r.gegen },
        ]}
            values={result}
            keySelector={r => r.pos}
            accountingSummary />
        </Scrollable>
    </>
}

export default KontenSaldo