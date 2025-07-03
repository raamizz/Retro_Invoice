import React from 'react';
import ProtectedRoute from './components/ProtectedRoute';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Header from './components/Header';
import Invoice from './components/Invoice';
import Dashboard from './pages/Dashboard';

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/invoice-form"
        element={
          <ProtectedRoute>
            <Header/>
            <Invoice/>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
