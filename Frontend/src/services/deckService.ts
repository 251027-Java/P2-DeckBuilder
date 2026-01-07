import api from './api';
import { Deck } from '../types/Deck';

export const deckService = {
  // Get all decks
  getDecks: async (): Promise<Deck[]> => {
    try {
      const response = await api.get<Deck[]>('/deck');
      return response.data;
    } catch (error) {
      console.error('Error fetching decks:', error);
      throw error;
    }
  },

  // Get deck by ID
  getDeckById: async (id: number): Promise<Deck> => {
    try {
      const response = await api.get<Deck>(`/deck/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching deck:', error);
      throw error;
    }
  },

  // Create a new deck
  createDeck: async (name: string, description?: string): Promise<Deck> => {
    try {
      const params = new URLSearchParams();
      params.append('name', name);
      if (description) {
        params.append('description', description);
      }
      
      const response = await api.post<Deck>(`/deck?${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error('Error creating deck:', error);
      throw error;
    }
  },

  // Update deck (for future use)
  updateDeck: async (id: number, name: string, description?: string): Promise<Deck> => {
    try {
      const response = await api.put<Deck>(`/deck/${id}`, {
        name,
        description
      });
      return response.data;
    } catch (error) {
      console.error('Error updating deck:', error);
      throw error;
    }
  },

  // Delete deck
  deleteDeck: async (id: number): Promise<boolean> => {
    try {
      await api.delete(`/deck/${id}`);
      return true;
    } catch (error) {
      console.error('Error deleting deck:', error);
      throw error;
    }
  },
};
