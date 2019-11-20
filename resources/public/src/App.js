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
import HauptMenue from './HauptMenue';
import Kontenabfrage from './Kontenabfrage'

import Header from './Header'
import { Screen, Content } from './UIComponents'

function App() {

  return (
    <ThemeProvider theme={clipperTheme}>
      <Router>
        <Screen>
          <Header />
          <Content>
            <Switch>
              <Route path="/laufende-buchung"><LaufendeBuchung /></Route>
              <Route path='/kontenabfrage'><Kontenabfrage /></Route>
              <Route path="/"><HauptMenue /></Route>
            </Switch>
          </Content>
        </Screen>
      </Router>
    </ThemeProvider >
  );
}

export default App;
