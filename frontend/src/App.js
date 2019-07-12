import React, { useState, useEffect, useRef, useMemo } from 'react'
import useThunkReducer from 'react-hook-thunk-reducer'
import { ThemeProvider } from 'styled-components'
import Header from './Header'
import recordReducer from './recordReducer'
import clipperTheme from './clipperTheme'
import { Input, Hr, Exceptions, StatusHeader, Padding, Screen, Scrollable, Table, Thead, Th, Content, TrWithHover, Emphasize, Grid } from './UIComponents'
import CurrencyInput from './CurrencyInput'
import DateInput from './DateInput'
import Select from './Select'
import KeyboardControls, { KeyButton } from './KeyboardControls'
import { Cell } from 'styled-css-grid'
import useKeys from './useKeys'
import './App.css';
import { reset, selectPos, saveEditedRow, fetchAccountingRecords, fetchTaxes, fetchAccountPlan, setDebitAccount, setCreditAccount } from './actions'

export const indexSelector = r => parseInt(r.pos)

const attsInTable = [
  { name: "Pos.", selector: r => r.pos },
  { name: "Datum", selector: r => r.date },
  { name: "Soll", selector: r => r.debitAccount },
  { name: "Haben", selector: r => r.creditAccount },
  { name: "Summe", selector: r => r.sum },
  { name: "Text", selector: r => r.text }
]

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

const initialState = {
  exceptions: [],
  editedPos: '0',
  accountPlan: new Map()
}

function App() {
  const [focusedElements, setFocus] = useState([])

  const [state, dispatch] = useThunkReducer(recordReducer, initialState)

  const {
    editedPos,
    editedRecord,
    validations,
    accountingRecords,
    accountPlan,
    taxes,
    debitBalance,
    creditBalance,
    exceptions
  } = state

  const indexedPositions = useMemo(
    () => (accountingRecords || []).map(r => indexSelector(r)),
    [accountingRecords])

  const whichMode = () => {
    if (accountingRecords === undefined
      || accountingRecords.length === 0
      || editedRecord === undefined) {
      return modes.selectMode
    }
    const existsPosition = indexedPositions.includes(editedRecord.pos)
    return existsPosition ? modes.editMode : modes.newMode
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
  console.log(refs)
  const currentIndex = key => refsOrder.findIndex(v => key === v)
  function nextRef(key) {
    const i = currentIndex(key)
    console.log(i, key)
    if (i === undefined)
      throw new Error("Could not find ref of " + key)
    if (i < refsOrder.length) {
      return refs[refsOrder[i + 1]]
    }
  }

  useEffect(() => {
    dispatch({ type: 'FETCH_INITIAL' })
    dispatch(fetchAccountingRecords())
    dispatch(fetchTaxes())
    dispatch(fetchAccountPlan())
  }, [])

  const currentFocusIndex = () => currentIndex(focusedElements[focusedElements.length - 1])
  const isEditedRecordValid = validations && Object.keys(validations).length === 0
  useKeys((e) => {
    if (e) {
      if (e.key === 'Enter') {
        if (mode === modes.selectMode) {
          dispatch(selectPos(editedPos))
        } else {
          const focusedRef = focusedElements[focusedElements.length - 1]
          console.log('nextRef: ', focusedElements)
          if (nextRef(focusedRef)) {
            const validationMsgOfCurrentInput = validations[focusedElements[focusedElements.length - 1]]
            validationMsgOfCurrentInput === undefined && nextRef(focusedRef).current.focus()
          } else
            dispatch(saveEditedRow())
        }

      } else if (e.key === 'Escape')
        dispatch(reset())
    }
  }, [accountingRecords, editedPos, mode, focusedElements, validations])

  const hasBeenSelected = att => {
    const focusedIndex = focusedElements.indexOf(att)
    const focused = (focusedIndex > -1)
    if (!focused)
      return false

    const currentFocus = (focusedIndex === focusedElements.length - 1)
    return !currentFocus
  }
  const isSelectMode = mode === modes.selectMode
  const accountPlanOptions = useMemo(
    () => Array.from(
      (accountPlan || new Map()),
      ([k, v]) => { return { value: k, name: v } }),
    [accountPlan])
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
                autoFocus={mode === modes.selectMode}
                size={6}
                ref={refs.pos}
                readOnly={mode !== modes.selectMode}
                value={editedPos}
                onChange={e => dispatch({ type: 'SET_EDITED_POS', value: parseInt(e.target.value) })}
                onFocus={() => setFocus([...focusedElements, 'pos'])}
              /></label></Cell>

              {!isSelectMode && <><Cell><label>Datum<DateInput
                autoFocus={mode !== modes.selectMode}
                value={editedRecord.date}
                // TODO: default={lastDate}
                ref={refs.date}
                validationMsg={hasBeenSelected('date') && validations.date}
                onChange={({ target }) => dispatch({ type: 'SET_DATE', value: target.value })}
                onFocus={() => setFocus([...focusedElements, 'date'])}
              /></label></Cell>

                <Cell><label>Buchungsdatum<DateInput
                  value={editedRecord.accountedDate}
                  ref={refs.accountedDate}
                  validationMsg={hasBeenSelected('accountedDate') && validations.accountedDate}
                  onChange={({ target }) => dispatch({ type: 'SET_ACCOUNTED_DATE', value: target.value })}
                  onFocus={() => setFocus([...focusedElements, 'accountedDate'])}
                /></label><br />
                </Cell></>
              }
            </Grid>

            {!isSelectMode && <>
              <br />
              <Grid columns={3}>
                <Cell><Select
                  value={editedRecord.debitAccount}
                  name="Konto Soll&nbsp;&nbsp;"
                  ref={refs.debitAccount}
                  validationMsg={hasBeenSelected('debitAccount') && validations.debitAccount}
                  onFocus={() => setFocus([...focusedElements, 'debitAccount'])}
                  options={accountPlanOptions}
                  setValue={v => dispatch(setDebitAccount(v))
                  }//setValue for mouse input TODO
                  onChange={({ target }) => onNumber(target.value, () => dispatch({ type: 'SET_DEBIT_ACCOUNT', value: target.value }))} //onchange for textinput
                />
                </Cell>
                <Cell><Emphasize>
                  {debitBalance !== undefined && accountPlan.get(editedRecord.debitAccount)}
                </Emphasize></Cell>
                <Cell><Emphasize>
                  {debitBalance !== undefined && 'Saldo ' + debitBalance + ' S'}
                </Emphasize></Cell>
              </Grid>

              {/** TODO: setValue and onChange twice same function */}
              <Grid columns={3}>
                <Cell><Select
                  value={editedRecord.creditAccount}
                  name="Konto Haben&nbsp;"
                  ref={refs.creditAccount}
                  validationMsg={hasBeenSelected('creditAccount') && validations.creditAccount}
                  onFocus={() => setFocus([...focusedElements, 'creditAccount'])}
                  setValue={v => dispatch(setCreditAccount(v))}
                  options={accountPlanOptions}
                  onChange={({ target }) => onNumber(target.value, () => dispatch({ type: 'SET_CREDIT_ACCOUNT', value: target.value }))} /></Cell>
                <Cell><Emphasize>
                  {creditBalance !== undefined && accountPlan.get(editedRecord.creditAccount)}
                </Emphasize></Cell>
                <Cell><Emphasize>
                  {creditBalance !== undefined && 'Saldo ' + creditBalance + ' H'}
                </Emphasize></Cell>
              </Grid>
              <br />

              <label>Summe<CurrencyInput
                value={editedRecord.sum}
                ref={refs.sum}
                onFocus={() => setFocus([...focusedElements, 'sum'])}
                validationMsg={validations.sum}
                setValue={v => dispatch({ type: 'SET_SUM', value: v })}
              /></label>

              &nbsp; &nbsp;<label>Steuerschl.<Select
                size={7}
                ref={refs.tax}
                name='tax'
                validationsMsg={hasBeenSelected('tax') && validations.tax}
                options={taxes.map(t => { return { value: t.fasuch, name: t.fatext } })}
                onFocus={() => setFocus([...focusedElements, 'tax'])}
                value={editedRecord.tax}
                onChange={({ target }) => dispatch({ type: 'SET_TAX', value: target.value })}
                setValue={v => dispatch({ type: 'SET_TAX', value: v })}
              /></label><br />

              <label>Text&nbsp;<Input
                size={30}
                ref={refs.text}
                onFocus={() => setFocus([...focusedElements, 'text'])}
                onChange={({ target }) => dispatch({ type: 'SET_TEXT', value: target.value })}
                value={editedRecord.text}
              /></label>
            </>}
          </Padding>
          <KeyboardControls>
            <KeyButton
              active={!isSelectMode}
              command={() => reset()}
              key='ESC'
              text='ESC: Abbrechen' />
            <KeyButton />
            <KeyButton />
            <KeyButton
              active={!isSelectMode && isEditedRecordValid}
              command={() => isEditedRecordValid && dispatch(saveEditedRow())}
              key='F10'
              text='F10: Speichern'
            />
            <KeyButton
              active
              text={"Enter: " + enterTextOn(currentFocusIndex(), mode)}
              command={() => dispatch(selectPos(editedPos))}
            />
          </KeyboardControls>

          <Hr />
          <Scrollable>
            <Table>
              <Thead>
                <tr>{attsInTable.map(att => <Th key={att.name}>{att.name}</Th>)}</tr>
              </Thead>
              <tbody>
                {(accountingRecords || []).map(r =>
                  <TrWithHover onClick={() => dispatch(selectPos(indexSelector(r)))}
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
