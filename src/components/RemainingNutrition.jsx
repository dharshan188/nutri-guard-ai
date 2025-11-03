import React from 'react';
import { motion } from 'framer-motion';
import { Calculator } from 'lucide-react';

const RemainingNutrition = ({ remaining, consumed, dailyNeeds, getPercentage }) => {
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  const NutrientBar = ({ value, goal, color }) => {
    const percentage = getPercentage(goal - value, goal);
    return (
      <div className="mt-2 bg-gray-700 rounded-full h-2">
        <motion.div
          className={`bg-${color}-500 h-2 rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5 }}
        ></motion.div>
      </div>
    );
  };

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-lg shadow-lg p-6 border border-gray-700"
      variants={itemVariants}
    >
      <div className="flex items-center mb-6">
        <Calculator className="mr-3 text-green-400" size={32} />
        <h2 className="text-3xl font-bold text-white">What You Still Need Today</h2>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-300 mb-3">Macronutrients</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-gray-700 rounded-lg p-4">
            <p className="text-sm text-gray-400 mb-1">Calories</p>
            <p className={`text-2xl font-bold ${remaining.calories >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {remaining.calories >= 0 ? remaining.calories.toFixed(0) : `+${Math.abs(remaining.calories).toFixed(0)}`}
            </p>
            <NutrientBar value={remaining.calories} goal={dailyNeeds.calories} color="green" />
          </div>
          <div className="bg-gray-700 rounded-lg p-4">
            <p className="text-sm text-gray-400 mb-1">Protein</p>
            <p className={`text-2xl font-bold ${remaining.protein >= 0 ? 'text-blue-400' : 'text-red-400'}`}>
              {remaining.protein >= 0 ? remaining.protein.toFixed(1) : `+${Math.abs(remaining.protein).toFixed(1)}`}g
            </p>
            <NutrientBar value={remaining.protein} goal={dailyNeeds.protein} color="blue" />
          </div>
          <div className="bg-gray-700 rounded-lg p-4">
            <p className="text-sm text-gray-400 mb-1">Carbs</p>
            <p className={`text-2xl font-bold ${remaining.carbs >= 0 ? 'text-orange-400' : 'text-red-400'}`}>
              {remaining.carbs >= 0 ? remaining.carbs.toFixed(1) : `+${Math.abs(remaining.carbs).toFixed(1)}`}g
            </p>
            <NutrientBar value={remaining.carbs} goal={dailyNeeds.carbs} color="orange" />
          </div>
          <div className="bg-gray-700 rounded-lg p-4">
            <p className="text-sm text-gray-400 mb-1">Fat</p>
            <p className={`text-2xl font-bold ${remaining.fat >= 0 ? 'text-red-400' : 'text-red-400'}`}>
              {remaining.fat >= 0 ? remaining.fat.toFixed(1) : `+${Math.abs(remaining.fat).toFixed(1)}`}g
            </p>
            <NutrientBar value={remaining.fat} goal={dailyNeeds.fat} color="red" />
          </div>
          <div className="bg-gray-700 rounded-lg p-4">
            <p className="text-sm text-gray-400 mb-1">Fiber</p>
            <p className={`text-2xl font-bold ${remaining.fiber >= 0 ? 'text-purple-400' : 'text-red-400'}`}>
              {remaining.fiber >= 0 ? remaining.fiber.toFixed(1) : `+${Math.abs(remaining.fiber).toFixed(1)}`}g
            </p>
            <NutrientBar value={remaining.fiber} goal={dailyNeeds.fiber} color="purple" />
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-700 border border-gray-600 rounded-lg">
        <p className="text-gray-300 font-semibold text-center">
          {remaining.calories > 0
            ? `You still need ${remaining.calories.toFixed(0)} calories today to meet your goal!`
            : `Goal achieved! You've consumed ${Math.abs(remaining.calories).toFixed(0)} calories over your target.`}
        </p>
      </div>
    </motion.div>
  );
};

export default RemainingNutrition;
