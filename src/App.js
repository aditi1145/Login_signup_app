import React from 'react';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import Register from './components/Register';
import LoginPage from './components/LoginPage';
import ProfilePage from './components/ProfilePage';

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path='/' element={< Register />} />
        <Route path='/register' element={< Register />} />
        <Route path='/login' element={< LoginPage />} />
        <Route path='/profile' element={<ProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;
