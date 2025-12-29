import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHome, FaLayerGroup, FaImages, FaExchangeAlt, FaSignOutAlt, FaStar } from 'react-icons/fa';
import { useAuthStore } from '../../store/authStore';

const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!isAuthenticated) return null;

  const navItems = [
    { to: '/dashboard', icon: FaHome, label: 'Dashboard' },
    { to: '/decks', icon: FaLayerGroup, label: 'My Decks' },
    { to: '/collection', icon: FaImages, label: 'Collection' },
    { to: '/trades', icon: FaExchangeAlt, label: 'Trades' },
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="glassmorphism sticky top-0 z-50 border-b border-white/20"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center space-x-2 group">
              <motion.div
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                <FaStar className="text-pokemon-yellow text-2xl" />
              </motion.div>
            <span className="text-xl font-bold bg-gradient-to-r from-pokemon-red to-pokemon-blue bg-clip-text text-transparent">
              Pokemon TCG
            </span>
          </Link>

          {/* Nav Items */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-white/20 transition-all group"
              >
                <item.icon className="text-gray-600 group-hover:text-pokemon-red transition-colors" />
                <span className="text-gray-700 font-medium">{item.label}</span>
              </Link>
            ))}
          </div>

          {/* User Section */}
          <div className="flex items-center space-x-4">
            <span className="text-gray-700 font-medium hidden sm:block">
              {user?.username}
            </span>
            <motion.button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaSignOutAlt />
              <span className="hidden sm:block">Logout</span>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;