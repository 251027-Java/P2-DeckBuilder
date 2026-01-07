import React, { useState, useEffect } from 'react';
import { Card } from '../../types/Card';
import { useDebounce } from '../../hooks/useDebounce';

interface CardSearchProps {
  onSearch: (query: string, filters: CardFilters) => void;
  loading?: boolean;
}

export interface CardFilters {
  rarity?: string;
  cardType?: string;
  setId?: string;
}

const CardSearch: React.FC<CardSearchProps> = ({ onSearch, loading = false }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [rarity, setRarity] = useState<string>('');
  const [cardType, setCardType] = useState<string>('');
  const [setId, setSetId] = useState<string>('');

  const debouncedSearch = useDebounce(searchQuery, 500);

  useEffect(() => {
    const filters: CardFilters = {
      ...(rarity && { rarity }),
      ...(cardType && { cardType }),
      ...(setId && { setId }),
    };
    onSearch(debouncedSearch, filters);
  }, [debouncedSearch, rarity, cardType, setId, onSearch]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Search Cards</h2>
      
      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by card name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loading}
        />
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Rarity Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Rarity
          </label>
          <select
            value={rarity}
            onChange={(e) => setRarity(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          >
            <option value="">All Rarities</option>
            <option value="Common">Common</option>
            <option value="Uncommon">Uncommon</option>
            <option value="Rare">Rare</option>
            <option value="Ultra Rare">Ultra Rare</option>
            <option value="Secret Rare">Secret Rare</option>
          </select>
        </div>

        {/* Card Type Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Card Type
          </label>
          <select
            value={cardType}
            onChange={(e) => setCardType(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          >
            <option value="">All Types</option>
            <option value="Pokemon">Pokémon</option>
            <option value="Trainer">Trainer</option>
            <option value="Energy">Energy</option>
          </select>
        </div>

        {/* Set Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Set
          </label>
          <input
            type="text"
            placeholder="Set ID..."
            value={setId}
            onChange={(e) => setSetId(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
        </div>
      </div>

      {/* Clear Filters Button */}
      <div className="mt-4">
        <button
          onClick={() => {
            setSearchQuery('');
            setRarity('');
            setCardType('');
            setSetId('');
          }}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          disabled={loading}
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default CardSearch;
