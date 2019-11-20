import React, { useState } from 'react'
import useKey from 'use-key-hook'
import { Redirect } from 'react-router-dom'

import { StatusHeader, Hr, Padding, Scrollable, Grid } from '../UIComponents'
import { Cell } from 'styled-css-grid'
import DateInput from '../Common/DateInput'
import Select from '../LaufendeBuchung/Select'
import useAccountingRecords, { indexSelector } from '../LaufendeBuchung/useAccountingRecords'
import useAccountPlan from '../LaufendeBuchung/useAccountPlan'
import KeyboardControls, { KeyButton } from '../KeyboardControls'
import Table from '../Table'

export default function () {
    const [redirect, setRedirect] = useState(false)
    useKey(() => setRedirect(true), { detectKeys: [27] });

    const [account, setAccount] = useState()
    const [filteredArs, setFilteredArs] = useState()

    const { accountingRecords } = useAccountingRecords([])

    const [{ accountPlan, isLoading, isError }] = useAccountPlan();
    const accountPlanOptions = Array.from(
        accountPlan,
        ([k, v]) => { return { value: k, name: v } })

    return redirect ? <Redirect to='/' /> : <><StatusHeader right='Kontenabfrage' /><Hr />
        <form onSubmit={e => {
            e.preventDefault()
            setFilteredArs(
                account ?
                    Array.from(accountingRecords).filter(kv => kv[1].debitAccount === account || kv[1].creditAccount === account)
                    : accountingRecords)
        }}>
            <Padding>

                <Grid columns={2}>
                    <Cell><Select
                        name='account'
                        label="Konto"
                        onChange={e => setAccount(e.target.value)}
                        options={accountPlanOptions}
                    /></Cell>
                    <Cell>
                        <DateInput name='from' label='von' /><br />
                        <DateInput name='to' label='bis' />
                    </Cell>
                </Grid>
            </Padding>
            <KeyboardControls>
                <KeyButton
                    active
                    text='ESC: Hauptmenue'
                    command={() => setRedirect(true)}
                />
                <KeyButton />
                <KeyButton />
                <KeyButton />
                <KeyButton
                    active
                    text='&#8617; : anwenden'
                // command={() => props.onSubmit()}
                />
            </KeyboardControls>
        </form>
        <Hr />
        <Scrollable>
            <Table attributes={[
                { name: "Pos.", selector: r => r.pos },
                { name: "Datum", selector: r => r.date },
                { name: "Soll", selector: r => r.debitAccount },
                { name: "Haben", selector: r => r.creditAccount },
                { name: "Summe", selector: r => r.sum, number: true },
                { name: "Text", selector: r => r.text }
            ]}
                values={filteredArs}
                keySelector={indexSelector}
            />
        </Scrollable>
    </>
}