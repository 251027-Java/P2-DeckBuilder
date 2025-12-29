import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaSave, FaSearch, FaPlus } from 'react-icons/fa';

const DeckBuilder: React.FC = () => {
  const [deckName, setDeckName] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-pokemon-lightBlue via-white to-pokemon-lightYellow p-6">
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 flex justify-between items-center"
        >
          <div className="flex items-center space-x-4">
            <Link to="/decks">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-lg bg-white/50 hover:bg-white transition-colors"
              >
                <FaArrowLeft className="text-gray-600" />
              </motion.button>
            </Link>
            <input
              type="text"
              value={deckName}
              onChange={(e) => setDeckName(e.target.value)}
              placeholder="Enter deck name..."
              className="text-2xl font-bold bg-transparent border-b-2 border-dashed border-gray-300 focus:border-pokemon-blue outline-none px-2 py-1"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-pokemon-blue to-pokemon-green text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            <FaSave />
            <span>Save Deck</span>
          </motion.button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Card Search Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 glassmorphism p-6 rounded-2xl"
          >
            <h2 className="text-xl font-semibold mb-4">Search Cards</h2>
            <div className="relative mb-4">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search for Pokemon cards..."
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-pokemon-blue focus:ring-2 focus:ring-pokemon-blue/20 outline-none transition-all"
              />
            </div>
            
            {/* Card Grid Placeholder */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 min-h-[400px]">
              <div className="col-span-full flex items-center justify-center text-gray-400">
                <p>Search for cards to add to your deck</p>
              </div>
            </div>
          </motion.div>

          {/* Deck Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="glassmorphism p-6 rounded-2xl"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Your Deck</h2>
              <span className="text-sm text-gray-500">0/60 cards</span>
            </div>
            
            {/* Deck Stats */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="bg-pokemon-red/10 p-2 rounded-lg text-center">
                <p className="text-xs text-gray-500">Pokemon</p>
                <p className="font-bold text-pokemon-red">0</p>
              </div>
              <div className="bg-pokemon-blue/10 p-2 rounded-lg text-center">
                <p className="text-xs text-gray-500">Trainers</p>
                <p className="font-bold text-pokemon-blue">0</p>
              </div>
              <div className="bg-pokemon-yellow/10 p-2 rounded-lg text-center">
                <p className="text-xs text-gray-500">Energy</p>
                <p className="font-bold text-pokemon-yellow">0</p>
              </div>
            </div>

            {/* Deck Cards List */}
            <div className="min-h-[300px] border-2 border-dashed border-gray-200 rounded-xl p-4 flex items-center justify-center">
              <div className="text-center text-gray-400">
                <FaPlus className="text-3xl mx-auto mb-2" />
                <p>Drag cards here or click to add</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DeckBuilder;
