import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4 text-pokemon-blue">Dashboard</h1>
      <div className="bg-white/80 rounded-xl shadow-card p-6">
        <p className="text-lg text-gray-700">Welcome to your Pokemon TCG Deck Builder dashboard!</p>
        {/* Add stats, recent decks, and quick actions here in later phases */}
      </div>
    </div>
  );
};

export default Dashboard;
