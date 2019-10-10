import React, { useEffect, useMemo } from 'react'
import useThunkReducer from 'react-hook-thunk-reducer'
import { ThemeProvider } from 'styled-components'
import { useAlert } from "react-alert";

import Header from './Header'
import recordReducer from './recordReducer'
import clipperTheme from './clipperTheme'
import { Hr, StatusHeader, Padding, Screen, Scrollable, Table, Thead, Th, Content, TrWithHover, Grid, NumberCell } from './UIComponents'
import LabeledInput from './LabeledInput'
import KeyboardControls, { KeyButton } from './KeyboardControls'
import { Cell } from 'styled-css-grid'
import './App.css';
import { selectPos, saveEditedRow, fetchAccountingRecords } from './actions'

import AccountingRecordForm from './AccountingRecordForm';

export const indexSelector = r => parseInt(r.pos)

/**
 * converts Date to standardized DOM string
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/date
 * @param {Date} d 
 */
const toDomString = d => `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`

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

const initialState = {
  exceptions: [],
  editedPos: '0'
}

function App() {

  const [state, dispatch] = useThunkReducer(recordReducer, initialState)
  const alert = useAlert()

  const {
    editedPos,
    editedRecord,
    accountingRecords,
    exceptions
  } = state

  const indexedPositions = useMemo(
    () => (accountingRecords || []).map(r => indexSelector(r)),
    [accountingRecords])

  const defaultDate = accountingRecords ? accountingRecords[0].date
    : toDomString(new Date())

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
  const isSelectMode = mode === modes.SELECT

  useEffect(() => {
    dispatch({ type: 'FETCH_INITIAL' })
    dispatch(fetchAccountingRecords())
  }, [])
  useEffect(() => {
    exceptions.length > 0 && alert.error(exceptions[exceptions.length - 1])
  }, [exceptions])

  const saveEditedRecordCommand = formData => {
    dispatch(saveEditedRow(formData))
  }

  return (
    <ThemeProvider theme={clipperTheme}>
      <Screen>
        <Header />
        <Content>
          <StatusHeader mode={modeTextInStatusHeader[mode] || modeTextInStatusHeader['default']} />
          <Hr />

          {isSelectMode &&
            <form onSubmit={e => {
              e.preventDefault()
              dispatch(selectPos(editedPos))
            }} >
              <Padding>
                <Grid columns={3}>
                  <Cell><LabeledInput
                    autoFocus
                    label='Position Nr.'
                    size={6}
                    value={editedPos}
                    onChange={e => dispatch({ type: 'SET_EDITED_POS', value: parseInt(e.target.value) })}
                  /></Cell>
                </Grid>
              </Padding>
              <KeyboardControls>
                <KeyButton />
                <KeyButton />
                <KeyButton />
                <KeyButton />
                <KeyButton
                  active
                  text='Enter: neue Buchung'
                  command={() => dispatch(selectPos(editedPos))}
                />
              </KeyboardControls>
            </form>
          }
          {!isSelectMode && <AccountingRecordForm
            onSubmit={saveEditedRecordCommand}
            cancel={() => console.error('TODO: implement me!')}
            pos={editedPos}
            defaultDate={defaultDate}
          />}
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
                    {attsInTable.map((att, i) => att.number
                      ? <NumberCell value={att.selector(r)} key={indexSelector(r) + r.text} />
                      : <td key={i}>{att.selector(r)}</td>
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
