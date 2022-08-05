// Funcionalidades
import React from 'react';
import { Switch, Route } from 'react-router-dom';
// Importações
import Login from './pages/Login';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/" component={ Login } />
      </Switch>
    );
  }
}

export default App;
