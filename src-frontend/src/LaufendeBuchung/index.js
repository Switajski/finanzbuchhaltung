import React, { useEffect, useState } from 'react'

import { useAlert } from "react-alert";
import useKey from 'use-key-hook'

import useAccountingRecords, { indexSelector } from './useAccountingRecords'
import SelectForm from '../Common/SelectForm'

import { Hr, StatusHeader, Scrollable, Emphasize, Loading, Space } from '../UIComponents'
import Table from '../Table'

import AccountingRecordForm from './AccountingRecordForm';

/**
 * converts Date to standardized DOM string
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/date
 * @param {Date} d 
 */
const toDomString = d => `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`

function LaufendeBuchung() {
    const [positionNr, setPositionNrRaw] = useState('')
    const setPositionNr = p => setPositionNrRaw(parseInt(p))
    const [dirty, setDirty] = useState(false)

    const { accountingRecords, arMessages, saveAccountingRecord, loading } = useAccountingRecords([indexSelector, dirty])

    const [recordTemplate, setRecordTemplate] = useState()
    const selectMode = recordTemplate === undefined
    const editMode = !selectMode

    /** cancel on ESC */
    const cancel = () => setRecordTemplate(undefined)
    useKey(() => cancel(), { detectKeys: [27] });

    /** select latest position from accounting records for new accounting record */
    useEffect(() => {
        if (accountingRecords.size > 0) {
            const firstAr = accountingRecords.values().next().value
            setPositionNr(indexSelector(firstAr) + 1)
        }
    }, [accountingRecords, dirty])
    function selectPosition(pos) {
        const newPos = accountingRecords.keys().next().value + 1
        if (pos === newPos) {
            const defaultDate = accountingRecords.size > 0 ? accountingRecords.values().next().value.date : toDomString(new Date())
            setRecordTemplate({
                date: defaultDate,
                accountedDate: defaultDate
            })
        } else if (accountingRecords.has(pos)) {
            if (pos !== positionNr)
                setPositionNr(pos)
            setRecordTemplate({ ...accountingRecords.get(pos) })
        } else {
            alert.info(`Position ${pos} nicht erlaubt.`)
        }
    }

    /** alerting on errors and success */
    const alert = useAlert()
    useEffect(() => {
        if (arMessages && arMessages.length > 0) {
            const newMessage = arMessages[arMessages.length - 1]
            if (newMessage instanceof Error) {
                alert.error(newMessage.message)
            } else if (newMessage.title && newMessage.title === 'success') {
                // TODO: create contract for that -  do that in a place that has control over the transaction - it's somehow an effect
                // perhaps with prop formState.isSubmitted from react-hook-form?
                alert.success(newMessage.message)
                cancel()
                setDirty(!dirty)
            } else alert.info(newMessage.message)
        }
    }, [arMessages])

    return (
        <>
            <StatusHeader>
                <Emphasize>
                    {selectMode ? <Space size={11} /> :
                        (accountingRecords.has(positionNr) ? 'korrigiere ' : <>neue <Space size={6}/></>)}
                </Emphasize>
                &nbsp;laufende Buchung
            </StatusHeader>
            {selectMode && <SelectForm
                autoFocus
                newRecordButtonText={accountingRecords.has(positionNr) ? 'korrigiere' : 'neue Buchung'}
                label='Pos.'
                value={positionNr}
                onSubmit={() => selectPosition(positionNr)}
                onChange={setPositionNr}
            />}
            {editMode && <AccountingRecordForm
                onSubmit={saveAccountingRecord}
                cancel={cancel}
                pos={positionNr}
                defaultValues={recordTemplate}
            />}
            <Hr />
            {loading ? <Loading /> : <Scrollable>
                <Table attributes={[
                    { name: "Pos.", selector: r => r.pos },
                    { name: "Datum", selector: r => r.date, date: true },
                    { name: "Soll", selector: r => r.debitAccount },
                    { name: "Haben", selector: r => r.creditAccount },
                    { name: "Summe", selector: r => r.sum, number: true },
                    { name: "Text", selector: r => r.text }
                ]}
                    values={Array.from(accountingRecords, ([k, v]) => v)}
                    keySelector={indexSelector}
                    onRowClick={v => selectPosition(indexSelector(v))} />
            </Scrollable>}
        </>
    );
}

export default LaufendeBuchung;
