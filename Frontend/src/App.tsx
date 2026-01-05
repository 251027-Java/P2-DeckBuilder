import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import PrivateRoute from './routes/PrivateRoute';
import LoginPage from './pages/LoginPage';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import Navbar from './components/shared/Navbar';
import DeckList from './components/decks/DeckList';
import DeckBuilder from './components/decks/DeckBuilder';
import CollectionView from './components/collection/CollectionView';
import TradeCenter from './components/trades/TradeCenter';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/decks"
          element={
            <PrivateRoute>
              <DeckList />
            </PrivateRoute>
          }
        />
        <Route
          path="/decks/new"
          element={
            <PrivateRoute>
              <DeckBuilder />
            </PrivateRoute>
          }
        />
        <Route
          path="/collection"
          element={
            <PrivateRoute>
              <CollectionView />
            </PrivateRoute>
          }
        />
        <Route
          path="/trades"
          element={
            <PrivateRoute>
              <TradeCenter />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;