import React, { useState } from 'react'
import useKey from 'use-key-hook'
import { Redirect } from 'react-router-dom'

import { StatusHeader, Hr, Padding, Scrollable, Grid, UpperCase } from '../UIComponents'
import { Cell } from 'styled-css-grid'
import DateInput from '../Common/DateInput'
import KeyboardControls, { KeyButton } from '../KeyboardControls'
import Table from '../Table'
import useUrlForRead from '../useUrlForRead'

function Kontenabfrage() {
    const [redirect, setRedirect] = useState()
    useKey(() => setRedirect(true), { detectKeys: [27] });

    const { result: accountOverview, loading, error } = useUrlForRead('/account-overview')
    const { result: accountPlan } = useUrlForRead('/account-plan')
    const safeAccountPlan = (accountPlan || {})
    const { result: accountConfig } = useUrlForRead('/account-config')

    if (redirect)
        return <Redirect to={redirect} />

    return <><StatusHeader right='Kontenabfrage' /><Hr />
        <form onSubmit={e => {
            e.preventDefault()
        }}>
            <Padding>
                {loading ? 'Laedt...' :
                    <Grid columns={1}>
                        <Cell>
                            <DateInput name='from' label='von' /><br />
                            <DateInput name='to' label='bis' />
                        </Cell>
                    </Grid>}
            </Padding>
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
                />
            </KeyboardControls>
        </form>
        <Hr />
        <Scrollable>
            {Object.keys((accountOverview || {})).map(k => <>
                <UpperCase>{accountConfig ? accountConfig.kklasse_name[k] : k}</UpperCase>
                <Table accountingSummary attributes={[
                    { name: "Konto", selector: r => r.account },
                    { name: "Kontoname", selector: r => safeAccountPlan[r.account] ? safeAccountPlan[r.account].name_kont : r.account },
                    { name: "Haben", summarize: 'D', number: true, selector: r => r.credit },
                    { name: "Soll", summarize: 'C', number: true, selector: r => r.debit },
                    { name: "Saldo", summarize: 'S', number: true, selector: r => r.debit - r.credit },
                ]}
                    values={accountOverview[k]}
                    keySelector={r => r.account}
                    onRowClick={r => setRedirect("/konten-saldo/" + r.account)}
                /></>
            )}
        </Scrollable>
    </>
}

export default Kontenabfrage