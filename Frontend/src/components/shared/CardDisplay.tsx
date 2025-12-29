import React from 'react';
import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';
import { Card as CardModel } from '../../types/Card';

interface CardDisplayProps {
  card: CardModel;
  onAdd?: () => void;
  onRemove?: () => void;
  quantity?: number;
  showActions?: boolean;
}

const CardDisplay: React.FC<CardDisplayProps> = ({
  card,
  onAdd,
  onRemove,
  quantity,
  showActions = true
}) => {
  const rarityColors: Record<string, string> = {
    'Common': 'text-gray-500',
    'Uncommon': 'text-green-500',
    'Rare': 'text-blue-500',
    'Holo Rare': 'text-purple-500',
    'Ultra Rare': 'text-yellow-500',
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -5 }}
      className="relative"
    >
      <div className="bg-white rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 p-4 h-full">
        {/* Card Image */}
        <div className="relative mb-3">
          {card.imageUrl ? (
            <img
              src={card.imageUrl}
              alt={card.name}
              className="w-full h-48 object-contain rounded-lg"
            />
          ) : (
            <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
              <FaStar className="text-gray-400 text-4xl" />
            </div>
          )}
          
          {quantity && (
            <div className="absolute top-2 right-2 bg-pokemon-red text-white px-3 py-1 rounded-full font-bold shadow-lg">
              x{quantity}
            </div>
          )}
        </div>

        {/* Card Info */}
        <div className="space-y-2">
          <h3 className="font-bold text-lg text-gray-800 truncate">
            {card.name}
          </h3>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">{card.cardType}</span>
            <span className={`flex items-center space-x-1 ${rarityColors[card.rarity] || 'text-gray-500'}`}>
              <FaStar />
              <span>{card.rarity}</span>
            </span>
          </div>

          {card.hp && (
            <div className="text-sm font-semibold text-pokemon-fire">
              HP: {card.hp}
            </div>
          )}
        </div>

        {/* Actions */}
        {showActions && (
          <div className="mt-4 flex gap-2">
            {onAdd && (
              <motion.button
                onClick={onAdd}
                className="flex-1 bg-pokemon-grass text-white py-2 rounded-lg font-medium hover:bg-green-600 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Add
              </motion.button>
            )}
            {onRemove && (
              <motion.button
                onClick={onRemove}
                className="flex-1 bg-red-500 text-white py-2 rounded-lg font-medium hover:bg-red-600 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Remove
              </motion.button>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default CardDisplay;