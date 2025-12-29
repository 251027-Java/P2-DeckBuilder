import { create } from 'zustand';

// TODO: Create Zustand store for deck builder state (currentDeck, addCard, removeCard)
interface DeckState {
  currentDeck: any[];
  addCard: (card: any) => void;
  removeCard: (cardId: string) => void;
}

export const useDeckStore = create<DeckState>((set) => ({
  currentDeck: [],
  addCard: (card) => set((state) => ({ currentDeck: [...state.currentDeck, card] })),
  removeCard: (cardId) => set((state) => ({ 
    currentDeck: state.currentDeck.filter((c) => c.id !== cardId) 
  })),
}));
