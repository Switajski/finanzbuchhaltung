import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import useKey from 'use-key-hook'

import { StatusHeader, Hr, Loading, Scrollable, Failed } from '../UIComponents'
import Table from '../Table'
import KeyboardControls, { KeyButton } from '../KeyboardControls'
import useUrlForRead from '../useUrlForRead'

function Konten() {
    const { result: atts, loading: loadingAtts, error: attsErrorerd } = useUrlForRead('/account-plan-atts')
    const { result, loading, error } = useUrlForRead('/account-plan')
    const accounts = Object.keys(result || {}).map(no => result[no])

    const [redirect, setRedirect] = useState()
    useKey(() => setRedirect('/'), { detectKeys: [27] })
    if (redirect) return <Redirect to={redirect} />

    return <><StatusHeader middle>Konten</StatusHeader>
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
        {(loading || loadingAtts) ? <Loading /> : (error || attsErrorerd) ? <Failed /> : <Scrollable>
            <Table
                attributes={atts.map(att => att.toLowerCase()).map(att => {
                    return { name: att, selector: v => v[att] }
                })}
                keySelector={p => p.konto_nr}
                values={accounts}
            />
        </Scrollable>}
    </>
}

export default Konten