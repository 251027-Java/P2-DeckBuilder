import { Collection } from './Collection';

export enum TradeStatus {
  PENDING = 'PENDING',
  COUNTERED = 'COUNTERED',
  ACCEPTED = 'ACCEPTED',
  DECLINED = 'DECLINED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export interface TradeItem {
  tradeItemId: number;
  tradeId: number;
  collectionId: number;
  offeredByUserId: number;
  quantity: number;
  collection?: Collection;
}

export interface Trade {
  tradeId: number;
  initiatorUserId: number;
  receiverUserId: number;
  status: TradeStatus;
  createdAt: string;
  updatedAt: string;
}

export interface TradeDetail extends Trade {
  offeredItems: TradeItem[];
  requestedItems: TradeItem[];
  initiatorUsername?: string;
  receiverUsername?: string;
}

export interface CreateTradeRequest {
  receiverUserId: number;
  offeredItems: Array<{ collectionId: number; quantity: number }>;
  requestedItems: Array<{ collectionId: number; quantity: number }>;
}