// Funcionalidades
import React from 'react';
import { Switch, Route } from 'react-router-dom';
// Importações
import Login from './pages/Login';
import Game from './pages/Game';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/" component={ Login } />
        <Route path="/game" component={ Game } />
      </Switch>
    );
  }
}

export default App;
