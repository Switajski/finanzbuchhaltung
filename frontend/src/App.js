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
import { selectPos, saveEditedRow, fetchAccountingRecords, fetchTaxes, fetchAccountPlan, setDebitAccount, setCreditAccount, CANCEL_EDITED_RECORD } from './actions'

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
  SELECT: 'Waehle Pos. Nr. aus',
  NEW: 'Buche',
  EDIT: 'Korrigiere',
}

const enterTextOn = (i, mode = modes.SELECT) => {
  if (i === 0) return 'Waehle Pos. Nr. aus'
  else if (i === 7) return mode === modes.EDIT ? 'korrigiere' : 'buche'
  else return 'naechstes Eingabefeld'
}

const initialState = {
  exceptions: [],
  editedPos: '0',
  accountPlan: new Map()
}

function App() {

  const focusedInputsRef = useRef([]) // weird workaround to have current state in useKeys effect hook: https://stackoverflow.com/questions/53633698/referencing-outdated-state-in-react-useeffect-hook
  const [focusedInputs, setFocus] = useState(focusedInputsRef.current)

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
      return modes.SELECT
    }
    const existsPosition = indexedPositions.includes(editedRecord.pos)
    return existsPosition ? modes.EDIT : modes.NEW
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

  const inputOrder = Object.keys(refs)
  const nextInput = name => inputOrder[inputOrder.indexOf(name) + 1]
  const currentIndex = name => inputOrder.indexOf(name)
  function inputRefOf(key) {
    const i = currentIndex(key)
    if (i === undefined)
      throw new Error("Could not find ref of " + key)
    return refs[key]
  }

  useEffect(() => {
    dispatch({ type: 'FETCH_INITIAL' })
    dispatch(fetchAccountingRecords())
    dispatch(fetchTaxes())
    dispatch(fetchAccountPlan())
  }, [])

  const currentFocusIndex = () => currentIndex(focusedInputs[focusedInputs.length - 1])
  const isEditedRecordValid = validations => validations && Object.keys(validations).length === 0
  const editedRecordValid = isEditedRecordValid(validations)
  useKeys((e) => {
    const focusedInputs = focusedInputsRef.current
    if (e) {
      if (e.key === 'Enter') {
        if (mode === modes.SELECT) {
          dispatch(selectPos(editedPos))
        } else {
          const current = focusedInputs[focusedInputs.length - 1]
          const next = nextInput(current)
          if (inputRefOf(next)) {
            const validMsg = validations[current]
            validMsg === undefined && inputRefOf(next).current.focus()
          } else if (isEditedRecordValid(validations)) {
            dispatch(saveEditedRow())
          }
        }

      } else if (e.key === 'Escape')
        dispatch(cancel())
    }
  }, [accountingRecords, editedPos, mode, focusedInputs, validations])

  const hasBeenFocused = input => focusedInputs.slice(0, focusedInputs.length - 2).includes(input)

  const createOnFocusFn = (att) => {
    return () => {
      focusedInputsRef.current = [...focusedInputs, att]
      setFocus(focusedInputsRef.current)
    }
  }
  const resetFocus = () => {
    setFocus([])
  }
  const cancel = () => {
    resetFocus()
    return { type: CANCEL_EDITED_RECORD }
  }

  console.log(focusedInputs)

  const isSelectMode = mode === modes.SELECT
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
                autoFocus={mode === modes.SELECT}
                size={6}
                ref={refs.pos}
                readOnly={mode !== modes.SELECT}
                value={editedPos}
                onChange={e => dispatch({ type: 'SET_EDITED_POS', value: parseInt(e.target.value) })}
                onFocus={createOnFocusFn('pos')}
              /></label></Cell>

              {!isSelectMode && <><Cell><label>Datum<DateInput
                autoFocus={mode !== modes.SELECT}
                value={editedRecord.date}
                // TODO: default={lastDate}
                ref={refs.date}
                validationMsg={hasBeenFocused('date') && validations.date}
                onChange={({ target }) => dispatch({ type: 'SET_DATE', value: target.value })}
                onFocus={createOnFocusFn('date')}
              /></label></Cell>

                <Cell><label>Buchungsdatum<DateInput
                  value={editedRecord.accountedDate}
                  ref={refs.accountedDate}
                  validationMsg={hasBeenFocused('accountedDate') && validations.accountedDate}
                  onChange={({ target }) => dispatch({ type: 'SET_ACCOUNTED_DATE', value: target.value })}
                  onFocus={createOnFocusFn('accountedDate')}
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
                  validationMsg={hasBeenFocused('debitAccount') && validations.debitAccount}
                  options={accountPlanOptions}
                  onChange={({ target }) => dispatch(setDebitAccount(target.value))}
                  onFocus={createOnFocusFn('debitAccount')}
                />
                </Cell>
                <Cell><Emphasize>
                  {debitBalance !== undefined && accountPlan.get(editedRecord.debitAccount)}
                </Emphasize></Cell>
                <Cell><Emphasize>
                  {debitBalance !== undefined && 'Saldo ' + debitBalance + ' S'}
                </Emphasize></Cell>
              </Grid>

              <Grid columns={3}>
                <Cell><Select
                  value={editedRecord.creditAccount}
                  name="Konto Haben&nbsp;"
                  ref={refs.creditAccount}
                  validationMsg={hasBeenFocused('creditAccount') && validations.creditAccount}
                  onFocus={createOnFocusFn('creditAccount')}
                  options={accountPlanOptions}
                  onChange={({ target }) => dispatch(setCreditAccount(target.value))} /></Cell>
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
                validationMsg={validations.sum}
                onChange={({ target }) => dispatch({ type: 'SET_SUM', value: target.value })}
                onFocus={createOnFocusFn('sum')}
              /></label>

              &nbsp; &nbsp;<label>Steuerschl.<Select
                size={7}
                ref={refs.tax}
                name='tax'
                validationsMsg={hasBeenFocused('tax') && validations.tax}
                options={taxes.map(t => { return { value: t.fasuch, name: t.fatext } })}
                value={editedRecord.tax}
                onChange={({ target }) => dispatch({ type: 'SET_TAX', value: target.value })}
                onFocus={createOnFocusFn('tax')}
              /></label><br />

              <label>Text&nbsp;<Input
                size={30}
                ref={refs.text}
                onFocus={createOnFocusFn('text')}
                onChange={({ target }) => dispatch({ type: 'SET_TEXT', value: target.value })}
                value={editedRecord.text}
              /></label>
            </>}
          </Padding>
          <KeyboardControls>
            <KeyButton
              active={!isSelectMode}
              command={() => cancel()}
              key='ESC'
              text='ESC: Abbrechen' />
            <KeyButton />
            <KeyButton />
            <KeyButton
              active={!isSelectMode && editedRecordValid}
              command={() => {
                if (editedRecordValid) {
                  dispatch(saveEditedRow(resetFocus))
                }
              }}
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
