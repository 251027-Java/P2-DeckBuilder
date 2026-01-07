import React, { useState, useEffect } from 'react';
import { Card } from '../../types/Card';
import { motion } from 'framer-motion';
import LoadingSpinner from '../shared/LoadingSpinner';

interface CollectionViewProps {
  cards: Card[];
  loading?: boolean;
  onCardClick?: (card: Card) => void;
}

const CollectionView: React.FC<CollectionViewProps> = ({ 
  cards, 
  loading = false,
  onCardClick 
}) => {
  const [filter, setFilter] = useState<string>('');
  const [filteredCards, setFilteredCards] = useState<Card[]>(cards);

  useEffect(() => {
    if (filter.trim() === '') {
      setFilteredCards(cards);
    } else {
      const filtered = cards.filter(card =>
        card.name.toLowerCase().includes(filter.toLowerCase()) ||
        card.cardType?.toLowerCase().includes(filter.toLowerCase()) ||
        card.rarity?.toLowerCase().includes(filter.toLowerCase())
      );
      setFilteredCards(filtered);
    }
  }, [filter, cards]);

  const getCardImageUrl = (card: Card): string => {
    if (card.imageUrl) {
      return card.imageUrl;
    }
    return `https://images.pokemontcg.io/${card.cardId}.png`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search your collection..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {filteredCards.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p className="text-xl">No cards found in your collection</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {filteredCards.map((card, index) => (
            <motion.div
              key={card.cardId}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-2 cursor-pointer"
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
                className="w-full h-auto rounded-md"
              />
              <div className="mt-2 text-center">
                <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                  {card.name}
                </p>
                {card.rarity && (
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {card.rarity}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CollectionView;
