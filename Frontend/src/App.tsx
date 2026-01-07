import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import PrivateRoute from './routes/PrivateRoute';
import StartPage from './pages/StartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './components/dashboard/Dashboard';
import Navbar from './components/shared/Navbar';
import DeckBuilderPage from './pages/DeckBuilderPage';
import AllCardsPage from './pages/AllCardsPage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Navbar />
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/start" element={<StartPage />} />
        {/* <Route path="/" element={<Navigate to="/login" />} /> */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/decks/new"
          element={
            <PrivateRoute>
              <DeckBuilderPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/decks/:deckId"
          element={
            <PrivateRoute>
              <DeckBuilderPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/all-cards"
          element={
            <PrivateRoute>
              <AllCardsPage />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;