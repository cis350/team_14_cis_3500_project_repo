import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/join-room" element={<JoinBettingRoom />} />
          <Route path="/create-room" element={<CreateBettingRoom />} />
          <Route path="/signin" element={<CreateBettingRoom />} />
          {/* Additional routes can be added here */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
