import React, { useState } from 'react'

import SelectForm from '../Common/SelectForm'
import { StatusHeader, Hr, Loading, Scrollable, Failed } from '../UIComponents'
import Table from '../Table'
import {useAccountPlanAttributes, useAccountPlan} from '../useUrlForRead'
import { Redirect } from 'react-router-dom'

const indexSelector = r => r.konto_nr

function Konten() {
    const { result: attributes, loading: loadingAtts, error: attsErrorerd } = useAccountPlanAttributes()
    const atts = (attributes || []).map(a => a.name)
    const { result: accountMap, loading, error } = useAccountPlan()
    const accountList = Object.keys(accountMap || {}).map(no => accountMap[no])

    const [accountNo, setAccountNo] = useState('')
    const [redirect, setRedirect] = useState()

    const selectAccountNo = no => setRedirect('account-form/' + no)

    if (redirect)
    return <Redirect to={redirect}/>
    else return <><StatusHeader>Konten
    </StatusHeader>
        <SelectForm
            value={accountNo}
            onChange={setAccountNo}
            autoFocus
            newRecordButtonText='neues Konto'
            label='Kontennr.:'
            onSubmit={() => selectAccountNo(accountNo)}
        />
        <Hr />
        {(loading || loadingAtts) ? <Loading /> : (error || attsErrorerd) ? <Failed /> : <Scrollable>
            <Table
                attributes={(atts || []).map(att => att.toLowerCase()).map(att => {
                    return { name: att, selector: v => v[att] }
                })}
                keySelector={p => p.konto_nr}
                values={accountList}
                onRowClick={r => selectAccountNo(indexSelector(r))}
            />
        </Scrollable>}
    </>
}

export default Konten