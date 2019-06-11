import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components'
import Header from './Header'
import clipperTheme from './clipperTheme'
import { Input, Hr, MoneyInput } from './UIComponents'
import AccountNumberInput from './AccountNumberInput'
import { Grid, Cell } from 'styled-css-grid'
import './App.css';

const Screen = styled.div`
height:600px;
display: block;
max-width:800px;
margin-left:auto;
margin-right:auto;
margin-top: 1em;`

const Content = styled.div`
height: 100%;
overflow:hidden;
border: 1px solid;`

const Table = styled.table`
width: 100%;`

const Scrollable = styled.div`
overflow:scroll;
padding:0 20px 0 20px;
height:100%`

const Padding = styled.div`
padding: 5px 20px 5px 20px;`

const indexSelector = r => r.pos

const attsToBeShown = [
  // { name: "Pos.", selector: indexSelector },
  // { name: "Datum", selector: r => r.dat },
  // { name: "Soll", selector: r => r.konto },
  // { name: "Haben", selector: r => r.gegen },
  // { name: "Summe", selector: r => r.betrag_s },
  // { name: "Text", selector: r => r.btext },

  { name: "Pos.", selector: r => r.pos },
  { name: "Datum", selector: r => r.date },
  { name: "Soll", selector: r => r.debitAccount },
  { name: "Haben", selector: r => r.creditAccount },
  { name: "Summe", selector: r => r.sum },
  { name: "Text", selector: r => r.text }
]
const emptyRec = {
  pos: '',
  debitAccount: '',
  creditAccount: '',
  date: '',
  accountedDate: '',
  sum: "0.00",
  text: '',
  tax: ''
}

function App() {
  const [accountingRecords, setAccountingRecords] = useState([])
  const [accountPlan, setAccountPlan] = useState([])
  const [exceptions, setExceptions] = useState([])
  const [editedRec, setEditedRecord] = useState({ ...emptyRec })

  const onDebitAccountChange = e => {
    const v = e.target.value
    !isNaN(v) && setEditedRecord({ debitAccount: v })
  }

  const onCreditAccountChange = e => {
    const v = e.target.value
    !isNaN(v) && setEditedRecord({ creditAccount: v })
  }

  useEffect(() => {
    fetch("/accounting-records")
      .then(r => r.json())
      .then(r => {
        const records = r
          .slice(1)
          .sort((a, b) => indexSelector(b) - indexSelector(a))
        setAccountingRecords(records)
        setEditedRecord({ pos: indexSelector(records[0]) + 1 })
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
            })
        )
      })
      .catch(exc => setExceptions([...exceptions, exc]))
  }, [])

  const existsPosition = pos => accountingRecords
    .map(r => indexSelector(r))
    .includes(pos)

  const getRecord = pos => accountingRecords.find(e => pos === indexSelector(e))

  const loadRecord = pos => setEditedRecord(getRecord(pos))

  return (
    <ThemeProvider theme={clipperTheme}>
      <Screen>
        <Header />
        <Content>
          {(exceptions.length > 0) && <div>
            <h3>Exception occured</h3>
            {exceptions.map(e => <>
              <h4>{e.message}</h4>
              {JSON.stringify(e)}
            </>)}
          </div>}
          <Padding>
            <Grid columns={3}>
              <Cell>FIBU 2.1</Cell>
              <Cell>laufende Buchung</Cell>
              <Cell>Pfau</Cell>
            </Grid>
          </Padding>
          <Hr />
          <Padding>
            <Grid columns={3}>
              <Cell><label>Position Nr.<Input size={6}
                value={editedRec.pos}
                onChange={e => setEditedRecord({
                  ...editedRec,
                  pos: e.target.value
                })}
                onBlur={() => existsPosition(editedRec.pos) ? loadRecord(editedRec.pos)
                  : setEditedRecord({ ...emptyRec })}
              /></label></Cell>
              <Cell><label>Datum<Input size={8} /></label></Cell>
              <Cell><label>Buchungsdatum<Input size={8} /></label><br /></Cell>
            </Grid>
            <br />
            <AccountNumberInput
              value={editedRec.debitAccount}
              name="Konto Soll&nbsp;&nbsp;"
              options={accountPlan}
              setValue={v => setEditedRecord({ ...editedRec, debitAccount: v })}
              onChange={onDebitAccountChange} />
            <br />
            <AccountNumberInput
              value={editedRec.creditAccount}
              name="Konto Haben&nbsp;"
              setValue={v => setEditedRecord({ ...editedRec, creditAccount: v })}
              options={accountPlan}
              onChange={onCreditAccountChange} />
            <br />
            <br />
            <label>Summe<MoneyInput
              value={editedRec.sum}
              onChangeEvent={(e, maskedValue) => setEditedRecord({ ...editedRec, sum: maskedValue })}
            /></label>
            &nbsp;&nbsp;<label>Steuerschl.<Input size={6} /></label><br />
            <label>Text&nbsp;<Input size={30} /></label>
          </Padding>

          <Hr />
          <Scrollable>
            <Table>
              <thead>
                <tr>{attsToBeShown.map(att => <th key={att.name}>{att.name}</th>)}</tr>
              </thead>
              <tbody>
                {accountingRecords.map(r =>
                  <tr key={indexSelector(r)}>{attsToBeShown.map((att, i) => <td key={i}>{att.selector(r)}</td>)}</tr>
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
