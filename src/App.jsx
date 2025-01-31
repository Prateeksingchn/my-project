import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import NoteTakingApp from './components/NoteTakingApp';
import { auth } from '../src/firebase/config';
import { useAuthState } from 'react-firebase-hooks/auth';

const App = () => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={user ? <Navigate to="/dashboard" /> : <Login />} 
        />
        <Route 
          path="/signup" 
          element={user ? <Navigate to="/dashboard" /> : <Signup />} 
        />
        <Route 
          path="/dashboard" 
          element={user ? <NoteTakingApp /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/" 
          element={<Navigate to="/login" />} 
        />
      </Routes>
    </Router>
  );
};

export default App;