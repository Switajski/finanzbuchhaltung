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
              {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
              <Route path="/laufende-buchung">
                <LaufendeBuchung />
              </Route>
              <Route path="/">
                <HauptMenue />
              </Route>
            </Switch>
          </Content>
        </Screen>
      </Router>
    </ThemeProvider >
  );
}

export default App;
