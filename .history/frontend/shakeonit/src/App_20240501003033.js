import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './Navbar';
import Landing from './Landing';
import Home from './Home';
import JoinBettingRoom from './JoinBettingRoom';
import CreateBettingRoom from './CreateBettingRoom';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Landing} />
          <Route path="/home" component={Home} />
          <Route path="/join-room" component={JoinBettingRoom} />
          <Route path="/create-room" component={CreateBettingRoom} />
          {/* Additional routes can be added here */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
