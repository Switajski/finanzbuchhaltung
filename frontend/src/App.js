import React, { useState, useEffect, useRef } from 'react'
import { ThemeProvider } from 'styled-components'
import Header from './Header'
import clipperTheme from './clipperTheme'
import { Input, Hr, Exceptions, StatusHeader, Padding, Screen, Scrollable, Table, Content } from './UIComponents'
import CurrencyInput from './CurrencyInput'
import DateInput from './DateInput'
import AccountNumberInput from './AccountNumberInput'
import KeyboardControls, { KeyButton } from './KeyboardControls'
import { Grid, Cell } from 'styled-css-grid'
import useKeys from './useKeys'
import './App.css';
import { Exception } from 'handlebars';

const indexSelector = r => parseInt(r.pos)

const attsToBeShownInTable = [
  { name: "Pos.", selector: r => r.pos },
  { name: "Datum", selector: r => r.date },
  { name: "Soll", selector: r => r.debitAccount },
  { name: "Haben", selector: r => r.creditAccount },
  { name: "Summe", selector: r => r.sum },
  { name: "Text", selector: r => r.text }
]
const emptyRec = {
  pos: undefined,
  debitAccount: '',
  creditAccount: '',
  date: '',
  accountedDate: '',
  sum: '',
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
  const [editedRec, setEditedRecord] = useState()
  const [focusedElements, setFocus] = useState([])

  const getRecord = pos => accountingRecords.find(e => pos === indexSelector(e))
  const existsPosition = pos => accountingRecords
    .map(r => indexSelector(r))
    .includes(pos)
  const isPositionValid = pos => existsPosition(pos) || pos === lastPos() + 1

  const whichMode = () => {
    if (accountingRecords.length === 0 || editedRec === undefined) {
      return modes.selectMode
    }
    return existsPosition(editedRec.pos) ? modes.editMode : modes.newMode
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
        setAccountingRecords(records)

        const lastPos = indexSelector(records[0])
        setEditedPos(lastPos + 1)
      })
      .catch(exc => setExceptions([...exceptions, exc]))
    fetch("/account-plan")
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
      .catch(exc => setExceptions([exc]))
  }, [])

  const goSelectMode = () => {
    setEditedRecord(undefined)
  }
  const goEditMode = pos => {
    setEditedRecord(getRecord(pos))
  }
  const goNewMode = (pos = lastPos() + 1) => {
    setEditedRecord({ ...emptyRec, pos: pos })
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
          nextRef(focusedRef) ? nextRef(focusedRef).current.focus() : saveEditedRow()
        }

      } else if (e.key === 'Escape')
        goSelectMode()
    }
  })

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
                value={editedRec.date}
                ref={refs.date}
                setValue={(v) => setEditedRecord(() => { return { ...editedRec, date: v } })}
                onFocus={() => setFocus([...focusedElements, 'date'])}
              /></label></Cell>

                <Cell><label>Buchungsdatum<DateInput
                  size={8}
                  value={editedRec.accountedDate}
                  ref={refs.accountedDate}
                  setValue={(v) => setEditedRecord(() => { return { ...editedRec, accountedDate: v } })}
                  onFocus={() => setFocus([...focusedElements, 'accountedDate'])}
                /></label><br /></Cell></>
              }
            </Grid>

            {!isSelectMode && <>
              <br />
              <AccountNumberInput
                value={editedRec.debitAccount}
                name="Konto Soll&nbsp;&nbsp;"
                ref={refs.debitAccount}
                onFocus={() => setFocus([...focusedElements, 'debitAccount'])}
                options={accountPlan}
                setValue={v => setEditedRecord({ ...editedRec, debitAccount: v })
                }//setValue for mouse input TODO
                onChange={({ target }) => onNumber(target.value, () => setEditedRecord({ debitAccount: target.value }))} //onchange for textinput
              />
              <br />

              <AccountNumberInput
                value={editedRec.creditAccount}
                name="Konto Haben&nbsp;"
                ref={refs.creditAccount}
                onFocus={() => setFocus([...focusedElements, 'creditAccount'])}
                setValue={v => setEditedRecord({ ...editedRec, creditAccount: v })}
                options={accountPlan}
                onChange={({ target }) => onNumber(target.value, () => setEditedRecord({ creditAccount: target.value }))} />
              <br />
              <br />

              <label>Summe<CurrencyInput
                value={editedRec.sum}
                ref={refs.sum}
                onFocus={() => setFocus([...focusedElements, 'sum'])}
                onChangeEvent={(e, maskedValue) => setEditedRecord({ ...editedRec, sum: maskedValue })}
              /></label>

              &nbsp; &nbsp;<label>Steuerschl.<Input
                size={6}
                ref={refs.tax}
                onFocus={() => setFocus([...focusedElements, 'tax'])}
                value={editedRec.tax}
              /></label><br />

              <label>Text&nbsp;<Input
                size={30}
                ref={refs.text}
                onFocus={() => setFocus([...focusedElements, 'text'])}
                onChange={e => setEditedRecord({ ...editedRec, text: e.target.value })}
                value={editedRec.text}
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
              <thead>
                <tr>{attsToBeShownInTable.map(att => <th key={att.name}>{att.name}</th>)}</tr>
              </thead>
              <tbody>
                {accountingRecords.map(r =>
                  <tr key={indexSelector(r)}>{attsToBeShownInTable.map((att, i) => <td key={i}>{att.selector(r)}</td>)}</tr>
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
