import React, { useState, useEffect } from 'react';
import Game from './components/Game';
import Navbar from './components/Navbar';
import GamePage from './pages/GamePage';
import Login from './pages/Login';
import Register from './pages/Register';
import { Route, Routes, useNavigate } from 'react-router-dom';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const game = new Game();

  useEffect(() => {
    // Check if the user is already logged in
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <>
      <Navbar game={game} isLoggedIn={isLoggedIn} onLogout={handleLogout} />

      <Routes>
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<GamePage game={game} />} />
      </Routes>
    </>
  );
}

export default App;