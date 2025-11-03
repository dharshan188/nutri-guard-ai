import React from 'react';
import { motion } from 'framer-motion';
import { Target, Activity } from 'lucide-react';

const DailyGoals = ({ dailyNeeds }) => {
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-lg shadow-lg p-6 text-white mb-6 border border-gray-700"
      variants={itemVariants}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold flex items-center">
          <Target className="mr-2 text-green-400" size={28} />
          Your Daily Goals
        </h2>
        <Activity className="text-green-400 opacity-75" size={32} />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div className="bg-gray-700 rounded-lg p-3 text-center" whileHover={{ scale: 1.05 }}>
          <p className="text-sm text-gray-400">Calories</p>
          <p className="text-2xl font-bold">{dailyNeeds.calories}</p>
          <p className="text-xs text-gray-500">kcal</p>
        </motion.div>
        <motion.div className="bg-gray-700 rounded-lg p-3 text-center" whileHover={{ scale: 1.05 }}>
          <p className="text-sm text-gray-400">Protein</p>
          <p className="text-2xl font-bold">{dailyNeeds.protein}</p>
          <p className="text-xs text-gray-500">grams</p>
        </motion.div>
        <motion.div className="bg-gray-700 rounded-lg p-3 text-center" whileHover={{ scale: 1.05 }}>
          <p className="text-sm text-gray-400">Carbs</p>
          <p className="text-2xl font-bold">{dailyNeeds.carbs}</p>
          <p className="text-xs text-gray-500">grams</p>
        </motion.div>
        <motion.div className="bg-gray-700 rounded-lg p-3 text-center" whileHover={{ scale: 1.05 }}>
          <p className="text-sm text-gray-400">Fat</p>
          <p className="text-2xl font-bold">{dailyNeeds.fat}</p>
          <p className="text-xs text-gray-500">grams</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DailyGoals;
