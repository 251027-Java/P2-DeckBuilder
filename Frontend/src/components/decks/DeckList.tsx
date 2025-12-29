import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaLayerGroup, FaPlus, FaSearch } from 'react-icons/fa';

const DeckList: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pokemon-lightRed via-white to-pokemon-lightBlue p-6">
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex justify-between items-start"
        >
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <FaLayerGroup className="text-3xl text-pokemon-red" />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-pokemon-red to-pokemon-blue bg-clip-text text-transparent">
                My Decks
              </h1>
            </div>
            <p className="text-gray-600">Build and manage your Pokemon TCG decks</p>
          </div>
          <Link to="/decks/new">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-pokemon-red to-pokemon-blue text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              <FaPlus />
              <span>New Deck</span>
            </motion.button>
          </Link>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glassmorphism p-4 rounded-xl mb-6"
        >
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search your decks..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-pokemon-red focus:ring-2 focus:ring-pokemon-red/20 outline-none transition-all"
            />
          </div>
        </motion.div>

        {/* Empty State */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="glassmorphism p-12 rounded-2xl text-center"
        >
          <FaLayerGroup className="text-6xl text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-600 mb-2">No Decks Yet</h2>
          <p className="text-gray-500 mb-6">Create your first deck to start building!</p>
          <Link to="/decks/new">
            <button className="px-6 py-3 bg-gradient-to-r from-pokemon-red to-pokemon-blue text-white rounded-xl font-semibold hover:shadow-lg transition-all">
              Create Your First Deck
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default DeckList;
