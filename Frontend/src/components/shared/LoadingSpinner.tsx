import React from 'react';
import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      >
  <FaStar className="text-pokemon-yellow text-6xl animate-spin" />
      </motion.div>
    </div>
  );
};

export default LoadingSpinner;