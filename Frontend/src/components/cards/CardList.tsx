import React from 'react';
import { Card } from '../../types/Card';
import { motion } from 'framer-motion';

interface CardListProps {
  cards: Card[];
  onCardClick?: (card: Card) => void;
  loading?: boolean;
}

const CardList: React.FC<CardListProps> = ({ cards, onCardClick, loading = false }) => {
  const getCardImageUrl = (card: Card): string => {
    if (card.imageUrl) {
      return card.imageUrl;
    }
    return `https://images.pokemontcg.io/${card.cardId}.png`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (cards.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p className="text-xl">No cards found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 p-4">
      {cards.map((card, index) => (
        <motion.div
          key={card.cardId}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-3 cursor-pointer transform hover:scale-105"
          onClick={() => onCardClick && onCardClick(card)}
        >
          <img
            src={getCardImageUrl(card)}
            alt={card.name}
            loading="lazy"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://via.placeholder.com/200x280/cccccc/666666?text=Card+Image';
            }}
            className="w-full h-auto rounded-md mb-2"
          />
          <div className="text-center">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white truncate">
              {card.name}
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-400">{card.rarity}</p>
            <p className="text-xs text-gray-500 dark:text-gray-500">{card.cardType}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default CardList;
