import React from 'react';
import { motion } from 'framer-motion';
import { WifiOff } from 'lucide-react';

export const OfflineBanner = ({ connectionType }) => {
  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -100, opacity: 0 }}
      className="bg-red-500 text-white p-3 flex items-center justify-center space-x-2 shadow-lg"
    >
      <WifiOff className="w-5 h-5" />
      <span className="font-medium">
        You're offline. Data may not be current.
        {connectionType !== 'unknown' && (
          <span className="ml-2 text-red-200">
            Last connection: {connectionType}
          </span>
        )}
      </span>
    </motion.div>
  );
};