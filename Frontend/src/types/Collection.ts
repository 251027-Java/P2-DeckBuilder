import { Card } from "./Card";

export interface Collection {
  collectionId: number;
  userId: number;
  cardId: string;
  quantity: number;
  isTradeable: boolean;
  acquiredAt: string;
  card?: Card;
}

export interface AddToCollectionRequest {
  cardId: string;
  quantity: number;
}