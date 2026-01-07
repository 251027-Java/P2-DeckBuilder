import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Deck } from '../../types/Deck';
import Button from '../shared/Button';
import { motion } from 'framer-motion';

interface DeckListProps {
  decks: Deck[];
  onDelete?: (deckId: number) => void;
  loading?: boolean;
}

const DeckList: React.FC<DeckListProps> = ({ decks, onDelete, loading = false }) => {
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (decks.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p className="text-xl mb-4">No decks found</p>
        <Button onClick={() => navigate('/decks/new')}>Create Your First Deck</Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {decks.map((deck, index) => (
        <motion.div
          key={deck.deckId}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-6"
        >
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            {deck.name}
          </h3>
          {deck.description && (
            <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
              {deck.description}
            </p>
          )}
          <div className="flex justify-between items-center mt-4">
            <Button
              variant="primary"
              onClick={() => navigate(`/decks/${deck.deckId}`)}
            >
              View Deck
            </Button>
            {onDelete && (
              <Button
                variant="danger"
                onClick={() => onDelete(deck.deckId)}
              >
                Delete
              </Button>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default DeckList;
