import React, { useEffect, useState } from 'react'
import { ThemeProvider } from 'styled-components'
import { useAlert } from "react-alert";
import useKey from 'use-key-hook'

import useAccountingRecords from './useAccountingRecords'
import PositionSelectInputForm from './PositionSelectForm'

import Header from './Header'
import clipperTheme from './clipperTheme'
import { Hr, StatusHeader, Screen, Scrollable, Content } from './UIComponents'
import Table from './Table'
import './App.css';

import AccountingRecordForm from './AccountingRecordForm';

export const indexSelector = r => parseInt(r.pos)

/**
 * converts Date to standardized DOM string
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/date
 * @param {Date} d 
 */
const toDomString = d => `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`

function App() {
  const [editedPos, setEditedPos] = useState(0)
  const [dirty, setDirty] = useState(false)
  const [recordTemplate, setRecordTemplate] = useState()
  const selectMode = recordTemplate === undefined
  const editMode = !selectMode

  const { accountingRecords, arMessages, saveAccountingRecord } = useAccountingRecords(indexSelector, dirty)

  const cancel = () => setRecordTemplate(undefined)

  useEffect(() => {
    if (accountingRecords.size > 0) {
      const firstAr = accountingRecords.values().next().value
      setEditedPos(indexSelector(firstAr) + 1)
    }
  }, [accountingRecords, dirty])

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

  function selectPos(pos) {
    const newPos = accountingRecords.keys().next().value + 1
    if (pos === newPos) {
      const defaultDate = accountingRecords.size > 0 ? accountingRecords.values().next().value.date : toDomString(new Date())
      setRecordTemplate({
        date: defaultDate,
        accountedDate: defaultDate
      })
    } else if (accountingRecords.has(pos)) {
      if (pos !== editedPos)
        setEditedPos(pos)
      setRecordTemplate({ ...accountingRecords.get(pos) })
    } else {
      alert.info(`Position ${pos} nicht erlaubt.`)
    }
  }

  useKey((pressedKey) => {
    cancel()
  }, {
    detectKeys: [27]
  });

  return (
    <ThemeProvider theme={clipperTheme}>
      <Screen>
        <Header />
        <Content>
          <StatusHeader mode={selectMode ? '' :
            (accountingRecords.has(editedPos) ? 'korrigiere' : 'neue')} />
          <Hr />
          {selectMode && <PositionSelectInputForm
            autoFocus
            label='Position Nr.'
            size={6}
            value={editedPos}
            onSubmit={() => selectPos(editedPos)}
            pos={editedPos}
            onChange={setEditedPos}
          />}
          {editMode && <AccountingRecordForm
            onSubmit={saveAccountingRecord}
            cancel={cancel}
            pos={editedPos}
            defaultValues={recordTemplate}
          />}
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
              values={accountingRecords}
              keySelector={indexSelector}
              onRowClick={v => selectPos(indexSelector(v))} />
          </Scrollable>
        </Content>
      </Screen>
    </ThemeProvider >
  );
}

export default App;
