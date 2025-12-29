import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUser, FaLock } from 'react-icons/fa';
import { useAuthStore } from '../../store/authStore';

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
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="bg-white/80 backdrop-blur-xl border border-white/30 shadow-2xl p-8 rounded-3xl">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="text-6xl mb-4">ICON</div>
            <h1 className="text-3xl font-bold text-gray-800 text-center">
              Pokemon TCG<br/>Deck Builder
            </h1>
          </div>

          <h2 className="text-2xl font-semibold text-center mb-6 text-gray-700">
            Welcome Back
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username Input */}
            <div className="relative">
              <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-pokemon-blue focus:ring-2 focus:ring-pokemon-blue/20 transition-all outline-none bg-white/50"
                required
                autoFocus
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-pokemon-blue focus:ring-2 focus:ring-pokemon-blue/20 transition-all outline-none bg-white/50"
                required
              />
            </div>

            {/* Login Button */}
            <motion.button
              type="submit"
              disabled={isLoading || !username || !password}
              className="w-full bg-gradient-to-r from-pokemon-red to-red-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </motion.button>
          </form>

          <p className="text-center mt-6 text-gray-600">
            Don't have an account?{' '}
            <Link 
              to="/register" 
              className="text-pokemon-blue font-semibold hover:text-pokemon-red transition-colors"
            >
              Register here
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
