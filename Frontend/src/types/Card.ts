export interface Card {
  cardId: string;
  name: string;
  rarity: string;
  cardType: string;
  setId: string;
  hp?: number;
  imageUrl?: string;
  set?: Set;
}

export interface Set {
  setId: string;
  name: string;
  series: string;
  releaseDate: string;
  totalCards: number;
  logo?: string;
}

export enum CardRarity {
  COMMON = 'Common',
  UNCOMMON = 'Uncommon',
  RARE = 'Rare',
  HOLO_RARE = 'Holo Rare',
  ULTRA_RARE = 'Ultra Rare',
  SECRET_RARE = 'Secret Rare'
}

export enum CardType {
  POKEMON = 'Pokemon',
  TRAINER = 'Trainer',
  ENERGY = 'Energy'
}