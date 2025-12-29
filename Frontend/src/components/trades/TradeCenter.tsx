import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaExchangeAlt, FaInbox, FaPaperPlane, FaHistory, FaPlus } from 'react-icons/fa';

type TradeTab = 'incoming' | 'outgoing' | 'history';

const TradeCenter: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TradeTab>('incoming');

  const tabs = [
    { id: 'incoming' as TradeTab, label: 'Incoming', icon: FaInbox, count: 0 },
    { id: 'outgoing' as TradeTab, label: 'Outgoing', icon: FaPaperPlane, count: 0 },
    { id: 'history' as TradeTab, label: 'History', icon: FaHistory, count: 0 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pokemon-lightYellow via-white to-pokemon-lightBlue p-6">
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex justify-between items-start"
        >
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <FaExchangeAlt className="text-3xl text-pokemon-yellow" />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-pokemon-yellow to-pokemon-red bg-clip-text text-transparent">
                Trade Center
              </h1>
            </div>
            <p className="text-gray-600">Trade cards with other trainers</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-pokemon-yellow to-pokemon-red text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            <FaPlus />
            <span>New Trade</span>
          </motion.button>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glassmorphism p-2 rounded-xl mb-6 inline-flex"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-pokemon-yellow text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <tab.icon />
              <span>{tab.label}</span>
              {tab.count > 0 && (
                <span className="bg-pokemon-red text-white text-xs px-2 py-0.5 rounded-full">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </motion.div>

        {/* Trade Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="glassmorphism p-12 rounded-2xl text-center"
        >
          <FaExchangeAlt className="text-6xl text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-600 mb-2">
            {activeTab === 'incoming' && 'No Incoming Trades'}
            {activeTab === 'outgoing' && 'No Outgoing Trades'}
            {activeTab === 'history' && 'No Trade History'}
          </h2>
          <p className="text-gray-500 mb-6">
            {activeTab === 'incoming' && "You don't have any pending trade requests."}
            {activeTab === 'outgoing' && "You haven't sent any trade requests."}
            {activeTab === 'history' && "You haven't completed any trades yet."}
          </p>
          {activeTab !== 'history' && (
            <button className="px-6 py-3 bg-gradient-to-r from-pokemon-yellow to-pokemon-red text-white rounded-xl font-semibold hover:shadow-lg transition-all">
              {activeTab === 'incoming' ? 'Browse Traders' : 'Start a Trade'}
            </button>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default TradeCenter;
