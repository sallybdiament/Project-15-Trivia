// Funcionalidades
import React from 'react';
import { Switch, Route } from 'react-router-dom';
// Importações
import Login from './pages/Login';
import Settings from './pages/Settings';
import Game from './pages/Game';
import Feedback from './pages/Feedback';
import Ranking from './pages/Ranking';
import GameShuffle from './pages/GameShuffle';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/settings" component={ Settings } />
        <Route path="/game" component={ Game } />
        <Route path="/feedback" component={ Feedback } />
        <Route path="/ranking" component={ Ranking } />
        <Route path="/shuffle" component={ GameShuffle } />
      </Switch>
    );
  }
}

export default App;
