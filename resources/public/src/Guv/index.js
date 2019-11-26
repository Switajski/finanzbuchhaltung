import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import useKey from 'use-key-hook'

import KeyboardControls, { KeyButton } from '../KeyboardControls'
import { StatusHeader, Centered, Hr } from '../UIComponents'
import useUrlForRead from '../useUrlForRead'
import Table from '../Table'

function Guv() {
    const { result, loading, error } = useUrlForRead('/guv')
    const [redirect, setRedirect] = useState()

    useKey(() => setRedirect('/'), { detectKeys: [27] });

    const months = result ? Object.keys((result.ertraege || {})) : []
    months.sort((a, b) => a === b ? 0 : a > b ? 1 : -1)

    const values = []
    let accumulated = 0
    months.forEach(month => {
        const aufwand = result.aufwendungen[month]
        const ertrag = result.ertraege[month]
        const gewinn = ertrag - aufwand
        accumulated = gewinn + accumulated
        values.push({ month, ertrag, aufwand, gewinn, accumulated })
    })

    if (redirect) return <Redirect to={redirect} />

    return <><StatusHeader>
        <Centered>Gewinn und Verlustrechnung</Centered>
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
            <KeyButton />
        </KeyboardControls>
        <Hr />
        {loading ? 'laedt...' : <Table accountingSummary attributes={[{
            name: "Monat",
            selector: r => r.month
        }, {
            name: "Aufwendungen", summarize: 'C',
            selector: r => r.aufwand,
            number: true,
            suffix: 'S'
        }, {
            name: "Ertraege", summarize: 'D',
            selector: r => r.ertrag,
            number: true,
            suffix: 'H'
        }, {
            name: "Gewinn",
            selector: r => r.gewinn,
            number: true,
            creditDebitSuffix: true,
            customFooter: values.reduce((a, r) => r.gewinn + a, 0)
        }, {
            name: "Akkumuliert",
            selector: r => r.accumulated,
            number: true,
            creditDebitSuffix: true,
            customFooter: accumulated
        },]}
            values={values}
            keySelector={r => r.month}
        />}
    </>

}

export default Guv