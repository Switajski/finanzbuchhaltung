import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [accountingRecords, setAccountingRecords] = useState([])
  const [exceptions, setExceptions] = useState([])
  const [fetched, setFetched] = useState(false)

  useEffect(() => {
    !fetched &&
      fetch("/api")
        .then(r => r.json())
        .then(r => {
          setFetched(true)
          setAccountingRecords(r)
        })
        .catch(exc => setExceptions([...exceptions, exc]))
  })

  return (
    <div className="App">
      <header className="App-header">
        <div><h3>Exception occured</h3>{exceptions.map(e => e.message)}</div>
        <ul>
          {accountingRecords.map(r => <li>{r.btext}</li>)}
        </ul>
      </header>
    </div>
  );
}

export default App;
