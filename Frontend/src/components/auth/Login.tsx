import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUser, FaLock, FaPlay } from 'react-icons/fa';
import { useAuthStore } from '../../store/authStore';
import logoImage from '../../assets/images/logo.png';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(username, password);
      navigate('/dashboard');
    } catch (error) {
      // Error handled by store
    }
  };

  return (
    <div className="flex items-center justify-center p-4">
      {/* Pokémon Type Orbs Background Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 rounded-full bg-red-500/10 blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-blue-500/10 blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        />
        <motion.div
          className="absolute top-1/2 right-1/4 w-36 h-36 rounded-full bg-yellow-500/10 blur-3xl"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 6, repeat: Infinity, delay: 2 }}
        />
      </div>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-md relative z-10"
      >
        {/* Pokémon Card Style Border */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 via-red-500 to-blue-500 rounded-3xl blur-sm opacity-75"></div>
        
        <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header with Pokémon Yellow Accent */}
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 h-2"></div>
          
          <div className="p-8">
            {/* Logo Section */}
            <motion.div 
              className="flex flex-col items-center mb-6"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-blue-500 rounded-full blur-xl opacity-30 animate-pulse"></div>
                <img 
                  src={logoImage}
                  alt="Pokemon TCG Logo" 
                  className="relative w-400 h-28 object-contain drop-shadow-xl"
                />
              </div>
              <h1 className="mt-4 text-xl font-bold bg-gradient-to-r from-red-600 via-yellow-500 to-blue-600 bg-clip-text text-transparent">
                Catch 'Em All in Your Deck!
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                Trainer Login
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Username Input */}
                <div className="relative group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Trainer Name
                  </label>
                  <div className="relative">
                    <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                    <input
                      type="text"
                      placeholder="Enter your trainer name"
                      value={username}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                      className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all outline-none bg-gray-50 focus:bg-white font-medium"
                      required
                      autoFocus
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className="relative group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                    <input
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                      className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all outline-none bg-gray-50 focus:bg-white font-medium"
                      required
                    />
                  </div>
                </div>

                {/* Remember & Forgot Password */}
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center cursor-pointer group">
                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <span className="ml-2 text-gray-600 group-hover:text-gray-800">Remember me</span>
                  </label>
                  <button type="button" className="text-blue-600 hover:text-blue-700 font-semibold">
                    Forgot Password?
                  </button>
                </div>

                {/* Login Button */}
                <motion.button
                  type="submit"
                  disabled={isLoading || !username || !password}
                  className="w-full bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:from-red-600 hover:via-red-700 hover:to-red-800 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 relative overflow-hidden group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-500 opacity-0 group-hover:opacity-20 transition-opacity"></span>
                  <FaPlay className="text-sm" />
                  <span>{isLoading ? 'Starting Battle...' : 'Begin Adventure'}</span>
                </motion.button>
              </form>

              {/* Register Link */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-center text-gray-600">
                  New Trainer?{' '}
                  <Link 
                    to="/register" 
                    className="text-blue-600 hover:text-blue-700 font-bold hover:underline transition-all"
                  >
                    Start Your Journey
                  </Link>
                </p>
              </div>
            </motion.div>
          </div>

          {/* Bottom Accent */}
          <div className="bg-gradient-to-r from-blue-500 via-red-500 to-yellow-400 h-2"></div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
