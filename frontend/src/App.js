import React, { useState, useEffect, useRef } from 'react'
import { ThemeProvider } from 'styled-components'
import Header from './Header'
import clipperTheme from './clipperTheme'
import { Input, Hr, Exceptions, StatusHeader, Padding, Screen, Scrollable, Table, Thead, Th, Content, TrWithHover } from './UIComponents'
import CurrencyInput from './CurrencyInput'
import DateInput from './DateInput'
import Select from './Select'
import KeyboardControls, { KeyButton } from './KeyboardControls'
import { Grid, Cell } from 'styled-css-grid'
import useKeys from './useKeys'
import './App.css';
import { Exception } from 'handlebars';
import validate from './validate'

const indexSelector = r => parseInt(r.pos)

const attsInTable = [
  { name: "Pos.", selector: r => r.pos },
  { name: "Datum", selector: r => r.date },
  { name: "Soll", selector: r => r.debitAccount },
  { name: "Haben", selector: r => r.creditAccount },
  { name: "Summe", selector: r => r.sum },
  { name: "Text", selector: r => r.text }
]
const newRecordTemplate = {
  pos: undefined,
  debitAccount: '',
  creditAccount: '',
  date: '',
  accountedDate: '',
  sum: '0.00',
  text: '',
  tax: ''
}

const modeTextInStatusHeader = {
  editMode: 'korrigiere',
  newMode: 'neue',
  default: ''
}
const modes = {
  selectMode: 'Waehle Pos. Nr. aus',
  newMode: 'Buche',
  editMode: 'Korrigiere',
}

const onNumber = (v, callback) => !isNaN(v) && callback()

const convertDate = date => {
  const a = date.split('-')
  const year = a[0].split('')
  return a[2] + '.' + a[1] + '.' + year[2] + year[3]
}

const enterTextOn = (i, mode = modes.selectMode) => {
  if (i === 0) return 'Waehle Pos. Nr. aus'
  else if (i === 7) return mode === modes.editMode ? 'korrigiere' : 'buche'
  else return 'naechstes Eingabefeld'
}


function App() {
  const [accountingRecords, setAccountingRecords] = useState([])
  const [accountPlan, setAccountPlan] = useState([])
  const [exceptions, setExceptions] = useState([])
  const [editedPos, setEditedPos] = useState()
  const [editedRecord, setEditedRecord] = useState()
  const [focusedElements, setFocus] = useState([])
  const [taxes, setTaxes] = useState([])

  const validations = validate(editedRecord, taxes.map(t => t.short), accountPlan.map(a => a.value))
  const getRecord = pos => accountingRecords.find(e => pos === indexSelector(e))
  const existsPosition = pos => accountingRecords
    .map(r => indexSelector(r))
    .includes(pos)
  const isPositionValid = pos => existsPosition(pos) || pos === lastPos() + 1
  const whichMode = () => {
    if (accountingRecords.length === 0 || editedRecord === undefined) {
      return modes.selectMode
    }
    return existsPosition(editedRecord.pos) ? modes.editMode : modes.newMode
  }
  const mode = whichMode()

  const refs = {
    pos: useRef(null),
    date: useRef(null),
    accountedDate: useRef(null),
    debitAccount: useRef(null),
    creditAccount: useRef(null),
    sum: useRef(null),
    tax: useRef(null),
    text: useRef(null),
  }
  const refsOrder = Object.keys(refs)
  const currentIndex = key => refsOrder.findIndex(v => key === v)
  function nextRef(key) {
    const i = currentIndex(key)
    if (i === undefined)
      throw Exception("Could not find ref of " + key)
    if (i < refsOrder.length) {
      return refs[refsOrder[i + 1]]
    }
  }

  useEffect(() => { // focus inputs on mode change
    if (mode === modes.newMode || mode === modes.editMode) {
      refs.date.current.focus()
    } else {
      refs.pos.current.focus()
    }
  }, [mode, refs.date, refs.pos])

  const lastPos = (records = accountingRecords) => records
    .sort((a, b) => indexSelector(b) - indexSelector(a))
    .map(indexSelector)[0]

  useEffect(() => {
    fetch("/accounting-records")
      .then(r => r.json())
      .then(r => {
        const records = r
          .slice(1)
          .sort((a, b) => indexSelector(b) - indexSelector(a))
          .map(a => {
            return {
              ...a,
              date: convertDate(a.date),
              accountedDate: convertDate(a.date)
            }
          })
        setAccountingRecords(records)

        const lastPos = indexSelector(records[0])
        setEditedPos(lastPos + 1)

        const lastDate = records[0].date.slice(0)
        newRecordTemplate.date = lastDate
        newRecordTemplate.accountedDate = lastDate
      })
      .catch(exc => setExceptions([...exceptions, exc]))

    fetch("/account-plan") //TODO: use redux with state machine
      .then(r => r.json())
      .then(r => {
        setAccountPlan(
          r.slice(1)
            .map(r => {
              return {
                name: r.name_kont,
                value: r.konto_nr
              }
            }))
      })

    fetch("/taxes")
      .then(r => r.json())
      .then(r => setTaxes(r))
      .catch(exc => setExceptions([exc]))
  }, [])

  const goSelectMode = () => {
    setEditedRecord(undefined)
    setFocus([])
  }
  const goEditMode = pos => {
    setEditedPos(pos)
    setEditedRecord(getRecord(pos))
  }
  const goNewMode = (pos = lastPos() + 1) => {
    setEditedRecord({ ...newRecordTemplate, pos: pos })
  }
  const select = editedPos => {
    if (isPositionValid(editedPos)) {
      existsPosition(editedPos) ? goEditMode(editedPos)
        : goNewMode(editedPos)
    }
  }
  const saveEditedRow = () => {
    alert('to be implemented')
  }
  const currentFocusIndex = () => currentIndex(focusedElements[focusedElements.length - 1])

  useKeys((e) => {
    if (e) {
      if (e.key === 'Enter') {
        if (mode === modes.selectMode) {
          select(editedPos)
        } else {
          const focusedRef = focusedElements[focusedElements.length - 1]
          if (nextRef(focusedRef)) {
            const validationMsgOfCurrentInput = validations[focusedElements[focusedElements.length - 1]]
            validationMsgOfCurrentInput === undefined && nextRef(focusedRef).current.focus()
          } else
            saveEditedRow()
        }

      } else if (e.key === 'Escape')
        goSelectMode()
    }
  }, [focusedElements, validations])

  const hasBeenSelected = att => {
    const focusedIndex = focusedElements.indexOf(att)
    const focused = (focusedIndex > -1)
    if (!focused)
      return false

    const currentFocus = (focusedIndex === focusedElements.length - 1)
    return !currentFocus
  }
  const isSelectMode = mode === modes.selectMode
  return (
    <ThemeProvider theme={clipperTheme}>
      <Screen>
        <Header />
        <Content>
          <Exceptions exceptions={exceptions} />
          <StatusHeader mode={modeTextInStatusHeader[mode] || modeTextInStatusHeader['default']} />
          <Hr />
          <Padding>
            <Grid columns={3}>
              <Cell><label>Position Nr.<Input
                size={6}
                ref={refs.pos}
                readOnly={mode !== modes.selectMode}
                value={editedPos}
                onChange={e => setEditedPos(parseInt(e.target.value))}
                onFocus={() => setFocus([...focusedElements, 'pos'])}
              /></label></Cell>

              {!isSelectMode && <><Cell><label>Datum<DateInput
                size={8}
                value={editedRecord.date}
                ref={refs.date}
                validationMsg={hasBeenSelected('date') && validations.date}
                setValue={(v) => setEditedRecord(() => { return { ...editedRecord, date: v } })}
                onFocus={() => setFocus([...focusedElements, 'date'])}
              /></label></Cell>

                <Cell><label>Buchungsdatum<DateInput
                  size={8}
                  value={editedRecord.accountedDate}
                  ref={refs.accountedDate}
                  validationMsg={hasBeenSelected('accountedDate') && validations.accountedDate}
                  setValue={(v) => setEditedRecord(() => { return { ...editedRecord, accountedDate: v } })}
                  onFocus={() => setFocus([...focusedElements, 'accountedDate'])}
                /></label><br /></Cell></>
              }
            </Grid>

            {!isSelectMode && <>
              <br />
              <Select
                value={editedRecord.debitAccount}
                name="Konto Soll&nbsp;&nbsp;"
                ref={refs.debitAccount}
                validationMsg={hasBeenSelected('debitAccount') && validations.debitAccount}
                onFocus={() => setFocus([...focusedElements, 'debitAccount'])}
                options={accountPlan}
                setValue={v => setEditedRecord({ ...editedRecord, debitAccount: v })
                }//setValue for mouse input TODO
                onChange={({ target }) => onNumber(target.value, () => setEditedRecord({ ...editedRecord, debitAccount: target.value }))} //onchange for textinput
              />
              <br />
              {/** TODO: setValue and onChange twice same function */}
              <Select
                value={editedRecord.creditAccount}
                name="Konto Haben&nbsp;"
                ref={refs.creditAccount}
                validationMsg={hasBeenSelected('creditAccount') && validations.creditAccount}
                onFocus={() => setFocus([...focusedElements, 'creditAccount'])}
                setValue={v => setEditedRecord({ ...editedRecord, creditAccount: v })}
                options={accountPlan}
                onChange={({ target }) => onNumber(target.value, () => setEditedRecord({ ...editedRecord, creditAccount: target.value }))} />
              <br />
              <br />

              <label>Summe<CurrencyInput
                value={editedRecord.sum}
                ref={refs.sum}
                onFocus={() => setFocus([...focusedElements, 'sum'])}
                validationMsg={validations.sum}
                setValue={value => setEditedRecord({ ...editedRecord, sum: value })}
              /></label>

              &nbsp; &nbsp;<label>Steuerschl.<Select
                size={7}
                ref={refs.tax}
                validationsMsg={hasBeenSelected('tax') && validations.tax}
                options={taxes.map(t => { return { value: t.short, name: t.name } })}
                onFocus={() => setFocus([...focusedElements, 'tax'])}
                value={editedRecord.tax}
                onChange={({ target }) => setEditedRecord({ ...editedRecord, tax: target.value })}
                setValue={v => setEditedRecord({ ...editedRecord, tax: v })}
              /></label><br />

              <label>Text&nbsp;<Input
                size={30}
                ref={refs.text}
                onFocus={() => setFocus([...focusedElements, 'text'])}
                onChange={(e) => setEditedRecord({ ...editedRecord, text: e.target.value })}
                value={editedRecord.text}
              /></label>
            </>}
          </Padding>
          <KeyboardControls>
            <KeyButton
              active={!isSelectMode}
              command={() => goSelectMode()}
              key='ESC'
              text='ESC: Abbrechen' />
            <KeyButton />
            <KeyButton />
            <KeyButton />
            <KeyButton
              active
              text={"Enter: " + enterTextOn(currentFocusIndex(), mode)}
              command={() => {
                if (existsPosition(editedPos))
                  return goEditMode
                else return goNewMode
              }}
            />
          </KeyboardControls>
          <Hr />
          <Scrollable>
            <Table>
              <Thead>
                <tr>{attsInTable.map(att => <Th key={att.name}>{att.name}</Th>)}</tr>
              </Thead>
              <tbody>
                {accountingRecords.map(r =>
                  <TrWithHover onClick={() => goEditMode(indexSelector(r))}
                    key={indexSelector(r)}>
                    {attsInTable.map((att, i) =>
                      <td key={i}>
                        {att.selector(r)}
                      </td>
                    )}
                  </TrWithHover>
                )}
              </tbody>
            </Table>
          </Scrollable>
        </Content>
      </Screen>
    </ThemeProvider >
  );
}

export default App;
