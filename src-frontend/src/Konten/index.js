import React, { useState } from 'react'

import SelectForm from '../Common/SelectForm'
import KontenRecordForm from './KontenRecordForm'
import { StatusHeader, Hr, Loading, Scrollable, Failed } from '../UIComponents'
import Table from '../Table'
import useUrlForRead from '../useUrlForRead'
import useEditableRecord from '../Common/useEditableRecord'

const indexSelector = r => r.konto_nr

function Konten() {
    const { result: atts, loading: loadingAtts, error: attsErrorerd } = useUrlForRead('/account-plan-atts')
    const { result: accountMap, loading, error } = useUrlForRead('/account-plan')
    const accountList = Object.keys(accountMap || {}).map(no => accountMap[no])

    const [accountNo, setAccountNo] = useState('')

    const { editMode, selectMode, recordTemplate, setRecordTemplate } = useEditableRecord()
    const selectAccountNo = r => setRecordTemplate(accountMap[r])

    return <><StatusHeader middle>Konten</StatusHeader>
        {selectMode && <SelectForm
            value={accountNo}
            onChange={setAccountNo}
            autoFocus
            newRecordButtonText='neues Konto'
            label='Kontennr.:'
            onSubmit={() => selectAccountNo(accountNo)}
        />}
        {editMode && <KontenRecordForm defaultValues={recordTemplate} />}
        <Hr />
        {(loading || loadingAtts) ? <Loading /> : (error || attsErrorerd) ? <Failed /> : <Scrollable>
            <Table
                attributes={atts.map(att => att.toLowerCase()).map(att => {
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