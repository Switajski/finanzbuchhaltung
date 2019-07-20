import React, { useState, useEffect, useMemo } from 'react'
import useThunkReducer from 'react-hook-thunk-reducer'
import { ThemeProvider } from 'styled-components'
import Header from './Header'
import recordReducer from './recordReducer'
import clipperTheme from './clipperTheme'
import { Input, Hr, Exceptions, StatusHeader, Padding, Screen, Scrollable, Table, Thead, Th, Content, TrWithHover, Emphasize, Grid, InputWithValidation, NumberCell } from './UIComponents'
import CurrencyInput from './CurrencyInput'
import DateInput from './DateInput'
import Select from './Select'
import KeyboardControls, { KeyButton } from './KeyboardControls'
import { Cell } from 'styled-css-grid'
import './App.css';
import { selectPos, saveEditedRow, fetchAccountingRecords, fetchTaxes, fetchAccountPlan, setDebitAccount, setCreditAccount, CANCEL_EDITED_RECORD } from './actions'

export const indexSelector = r => parseInt(r.pos)

const attsInTable = [
  { name: "Pos.", selector: r => r.pos },
  { name: "Datum", selector: r => r.date },
  { name: "Soll", selector: r => r.debitAccount },
  { name: "Haben", selector: r => r.creditAccount },
  { name: "Summe", selector: r => r.sum, number: true },
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

const enterTextOn = (input, mode = modes.SELECT) => {
  if (input === 'pos') return 'Waehle Pos. Nr. aus'
  else if (input === 'text') return mode === modes.EDIT ? 'korrigiere' : 'buche'
  else return 'naechstes Eingabefeld'
}

const initialState = {
  exceptions: [],
  taxes: [],
  editedPos: '0',
  accountPlan: new Map()
}

function App() {

  const [focusedInputs, setFocus] = useState([])
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

  useEffect(() => {
    dispatch({ type: 'FETCH_INITIAL' })
    dispatch(fetchAccountingRecords())
    dispatch(fetchTaxes())
    dispatch(fetchAccountPlan())
  }, [])

  const isEditedRecordValid = validations => validations && Object.keys(validations).length === 0
  const editedRecordValid = isEditedRecordValid(validations)

  const showValidation = input => {
    return focusedInputs.slice(0, focusedInputs.length - 1).includes(input)
  }

  const createOnFocusFn = (att) => {
    return () => {
      setFocus(focusedInputs => [...focusedInputs, att])
    }
  }
  const cancel = () => {
    return { type: CANCEL_EDITED_RECORD }
  }

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
          <form onSubmit={e => {
            e.preventDefault()
            console.log('submit')
            if (editedRecordValid) {
              dispatch(saveEditedRow())
            }
          }} >
            <Padding>
              <Grid columns={3}>
                <Cell><label>Position Nr.<Input
                  autoFocus={mode === modes.SELECT}
                  size={6}
                  readOnly={mode !== modes.SELECT}
                  value={editedPos}
                  onChange={e => dispatch({ type: 'SET_EDITED_POS', value: parseInt(e.target.value) })}
                  onFocus={createOnFocusFn('pos')}
                /></label></Cell>

                {!isSelectMode && <><Cell><label>Datum<DateInput
                  autoFocus={mode !== modes.SELECT}
                  value={editedRecord.date}
                  validationMsg={showValidation('date') && validations.date}
                  onChange={({ target }) => dispatch({ type: 'SET_DATE', value: target.value })}
                  onFocus={createOnFocusFn('date')}
                /></label></Cell>

                  <Cell><label>Buchungsdatum<DateInput
                    value={editedRecord.accountedDate}
                    validationMsg={showValidation('accountedDate') && validations.accountedDate}
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
                    validationMsg={showValidation('debitAccount') && validations.debitAccount}
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
                    validationMsg={showValidation('creditAccount') && validations.creditAccount}
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
                  validationMsg={validations.sum}
                  onChange={({ target }) => dispatch({ type: 'SET_SUM', value: target.value })}
                  onFocus={createOnFocusFn('sum')}
                /></label>

                &nbsp; &nbsp;<label>Steuerschl.<Select
                  size={7}
                  name='tax'
                  validationsMsg={showValidation('tax') && validations.tax}
                  options={taxes.map(t => { return { value: t.fasuch, name: t.fatext } })}
                  value={editedRecord.tax}
                  onChange={({ target }) => dispatch({ type: 'SET_TAX', value: target.value })}
                  onFocus={createOnFocusFn('tax')}
                /></label><br />

                <label>Text&nbsp;<InputWithValidation
                  size={30}
                  onFocus={createOnFocusFn('text')}
                  validationMsg={showValidation('text') && validations.text}
                  onChange={({ target }) => dispatch({ type: 'SET_TEXT', value: target.value })}
                  value={editedRecord.text}
                /></label>
                {showValidation('text') && validations.text && '\u26A0'}
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
                    dispatch(saveEditedRow())
                  }
                }}
                key='F10'
                text='F10: Speichern'
              />
              <KeyButton
                active
                text={"Enter: " + enterTextOn(focusedInputs[focusedInputs.length], mode)}
                command={() => dispatch(selectPos(editedPos))}
              />
            </KeyboardControls>
          </form>
          <Hr />
          <Scrollable>
            <Table>
              <Thead>
                <tr>{attsInTable.map(att => <Th key={att.name}>{att.name}</Th>)}</tr>
              </Thead>
              <tbody>
                {(accountingRecords || []).map(r =>
                  <TrWithHover onClick={() => dispatch(selectPos(indexSelector(r)))}
                    key={indexSelector(r) + r.text}>
                    {attsInTable.map((att, i) =>
                      att.number ? <NumberCell
                        even={(att.selector(r) % 1) === 0} value={att.selector(r)} />
                        : <td key={i} {...att}>
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
