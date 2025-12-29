import { Card } from "./Card";

export interface Deck {
  deckId: number;
  userId: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface DeckCard {
  deckCardId: number;
  deckId: number;
  cardId: string;
  quantity: number;
  card?: Card;
}

export interface DeckDetail extends Deck {
  cards: DeckCard[];
  totalCards: number;
}

export interface CreateDeckRequest {
  name: string;
  description: string;
}