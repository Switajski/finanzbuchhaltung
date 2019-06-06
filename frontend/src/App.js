import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import { Grid, Cell } from 'styled-css-grid'
import './App.css';

const Screen = styled.div`
max-width:800px;
height:600px;
overflow: hidden;
display: block;
margin-left:auto;
margin-right:auto;
margin-top: 1em;`
const Content = styled.div`
padding: 5px 20px 5px 20px;
border: 1px solid;
margin: 5px;`

const Pill = styled.span`
background-color: rgb(0,113,110);
color: white;`
const Table = styled.table`width: 100%;
`

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
    <Screen>
      <Grid columns={2}>
        <Cell>
          <Pill>
            &nbsp;{new Date().toLocaleDateString()}&nbsp;
          </Pill>
        </Cell>
        <Cell>
          <Pill>Georg Switajski&nbsp;&nbsp;&nbsp;</Pill>
        </Cell>
      </Grid>
      <Content>
        {(exceptions.length > 0) && <div>
          <h3>Exception occured</h3>{exceptions.map(e => e.message)}
        </div>}
        <Grid columns={3}>
          <Cell>FIBU 3.0</Cell>
          <Cell>laufende Buchung</Cell>
          <Cell>Pfau</Cell>
        </Grid>
        <hr />
        <Table>
          <thead>
            {attsToBeShown.map(att => <th>{att.name}</th>)}
          </thead>
          <tbody>
            {accountingRecords.map(r => <tr>
              {attsToBeShown.map(att => <td>{att.selector(r)}</td>)}
            </tr>)}
          </tbody>
        </Table>

      </Content>
    </Screen>
  );
}

export default App;
