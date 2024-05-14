import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './Navbar';
import Landing from './Landing';
import Home from './Home';
import JoinBettingRoom from './JoinBettingRoom';
import CreateBettingRoom from './CreateBettingRoom';
import BettingRoom from './BettingRoom';
import UserProvider from './UserContext';

function App() {
  return (
    <div className="App">
      <Router>
      <UserProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/join-room" element={<JoinBettingRoom />} />
          <Route path="/create-room" element={<CreateBettingRoom />} />
          <Route path="/signin" element={<Landing />} />
          <Route path="/event/:id" element={<BettingRoom/>} />
          {/* Additional routes can be added here */}
        </Routes>
        </UserProvider>
      </Router>
    </div>
  );
}

export default App;
