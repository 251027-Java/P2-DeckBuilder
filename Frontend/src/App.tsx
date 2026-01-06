import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import PrivateRoute from './routes/PrivateRoute';
import StartPage from './pages/StartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './components/dashboard/Dashboard';
import Navbar from './components/shared/Navbar';
import DeckList from './components/decks/DeckList';
import DeckBuilder from './components/decks/DeckBuilder';
import CollectionView from './components/collection/CollectionView';
import TradeCenter from './components/trades/TradeCenter';
import DeckBuilderPage from './pages/DeckBuilderPage';
import DeckView from './components/decks/DeckView';
import DeckPage from './pages/DeckPage';
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
              <DeckBuilderPage />
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
        <Route
            path="/deck-view"
            element={
                <PrivateRoute>
                    <DeckView />
                </PrivateRoute>
            }
        />
        <Route
          path="/decks/:deckId"
          element={
            <PrivateRoute>
              <DeckPage />
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