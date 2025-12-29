import React from 'react';
import { motion } from 'framer-motion';
import { FaImages, FaSearch, FaFilter } from 'react-icons/fa';

const CollectionView: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pokemon-lightBlue via-white to-pokemon-lightYellow p-6">
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-3 mb-4">
            <FaImages className="text-3xl text-pokemon-blue" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-pokemon-blue to-pokemon-red bg-clip-text text-transparent">
              My Collection
            </h1>
          </div>
          <p className="text-gray-600">View and manage your Pokemon card collection</p>
        </motion.div>

        {/* Search and Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glassmorphism p-4 rounded-xl mb-6 flex flex-wrap gap-4"
        >
          <div className="flex-1 min-w-[200px] relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search your collection..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-pokemon-blue focus:ring-2 focus:ring-pokemon-blue/20 outline-none transition-all"
            />
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-pokemon-blue text-white rounded-lg hover:bg-pokemon-blue/90 transition-colors">
            <FaFilter />
            <span>Filter</span>
          </button>
        </motion.div>

        {/* Collection Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
        >
          {[
            { label: 'Total Cards', value: '0', color: 'pokemon-blue' },
            { label: 'Unique Cards', value: '0', color: 'pokemon-red' },
            { label: 'Trade Available', value: '0', color: 'pokemon-yellow' },
            { label: 'Collection Value', value: '$0', color: 'pokemon-green' },
          ].map((stat, index) => (
            <div key={stat.label} className="glassmorphism p-4 rounded-xl text-center">
              <p className="text-gray-500 text-sm">{stat.label}</p>
              <p className={`text-2xl font-bold text-${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </motion.div>

        {/* Empty State */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="glassmorphism p-12 rounded-2xl text-center"
        >
          <FaImages className="text-6xl text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-600 mb-2">Your Collection is Empty</h2>
          <p className="text-gray-500 mb-6">Start adding cards to build your collection!</p>
          <button className="px-6 py-3 bg-gradient-to-r from-pokemon-blue to-pokemon-red text-white rounded-xl font-semibold hover:shadow-lg transition-all">
            Browse Cards
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default CollectionView;
