import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components'
import Header from './Header'
import clipperTheme from './clipperTheme'
import { Input } from './UIComponents'
import { Grid, Cell } from 'styled-css-grid'
import './App.css';

const Screen = styled.div`
height:600px;
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

const attsToBeShown = [
  { name: "Pos.", selector: r => r.rech_nr },
  { name: "Datum", selector: r => r.dat },
  { name: "Soll", selector: r => r.konto },
  { name: "Haben", selector: r => r.gegen },
  { name: "Summe", selector: r => r.betrag_s },
  { name: "Text", selector: r => r.btext },
]

function App() {
  const [accountingRecords, setAccountingRecords] = useState([])
  const [exceptions, setExceptions] = useState([])

  useEffect(() => {
    fetch("/api")
      .then(r => r.json())
      .then(r => {
        setAccountingRecords(r
          .slice(1)
          .filter(r => r.datensatz == "A")
          .sort((a, b) => b.rech_nr - a.rech_nr))
      })
      .catch(exc => setExceptions([...exceptions, exc]))
  }, [])

  return (
    <ThemeProvider theme={clipperTheme}>
      <Screen>
        <Header />
        <Content>
          {(exceptions.length > 0) && <div>
            <h3>Exception occured</h3>{exceptions.map(e => e.message)}
          </div>}
          <Padding>
            <Grid columns={3}>
              <Cell>FIBU 3.0</Cell>
              <Cell>laufende Buchung</Cell>
              <Cell>Pfau</Cell>
            </Grid>
          </Padding>
          <hr />
          <Padding>
            <Grid columns={3}>
              <Cell><label>Position Nr.<Input size={6} /></label></Cell>
              <Cell><label>Datum<Input size={8} /></label></Cell>
              <Cell><label>Buchungsdatum<Input size={8} /></label><br /></Cell>
            </Grid>
            <br />
            <label>Konto Soll&nbsp;&nbsp;<Input size={7} /></label><br />
            <label>Konto Haben&nbsp;<Input size={7} /></label><br />
            <br />
            <label>Summe<Input size={8} /></label>
            &nbsp;&nbsp;<label>Steuerschl.<Input size={6} /></label><br />
            <label>Text&nbsp;<Input size={50} /></label>
          </Padding>

          <hr />
          <Scrollable>
            <Table>
              <thead>
                {attsToBeShown.map(att => <th>{att.name}</th>)}
              </thead>
              <tbody>
                {accountingRecords.map(r =>
                  <tr>
                    {attsToBeShown.map(att => <td>{att.selector(r)}</td>)}
                  </tr>
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
