import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import { ThemeProvider } from 'styled-components'
import clipperTheme from './clipperTheme'
import './App.css';
import LaufendeBuchung from './LaufendeBuchung'
import HauptMenue from './HauptMenue'
import Kontenabfrage from './Kontenabfrage'
import KontenSaldo from './KontenSaldo'
import Reload from './KontenSaldo/Reload'
import Konten from './Konten'
import Guv from './Guv'

import { Screen, Content } from './UIComponents'

function App() {

  return (
    <ThemeProvider theme={clipperTheme}>
      <Router>
        <Screen>
          <Content>
            <Switch>
              <Route path="/laufende-buchung"><LaufendeBuchung /></Route>
              <Route path='/reload/:url/:param'><Reload /></Route>
              <Route path='/kontenabfrage'><Kontenabfrage /></Route>
              <Route path='/konten-saldo/:accountNo'><KontenSaldo /></Route>
              <Route path='/konten-saldo'><KontenSaldo /></Route>
              <Route path='/guv'><Guv /></Route>
              <Route path='/accounts'><Konten /></Route>
              <Route path="/"><HauptMenue /></Route>
            </Switch>
          </Content>
        </Screen>
      </Router>
    </ThemeProvider >
  );
}

export default App;
