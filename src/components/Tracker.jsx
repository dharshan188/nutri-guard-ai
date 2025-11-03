import React from 'react';
import { motion } from 'framer-motion';
import DailyGoals from './DailyGoals';
import FoodSearch from './FoodSearch';
import ConsumedItems from './ConsumedItems';
import RemainingNutrition from './RemainingNutrition';
import ProgressChart from './ProgressChart';

const Tracker = ({
  dailyNeeds,
  searchTerm,
  setSearchTerm,
  quantity,
  setQuantity,
  filteredItems,
  addItem,
  selectedItems,
  removeItem,
  consumed,
  remaining,
  getPercentage,
  nutritionDB,
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const weeklyData = [
    { name: 'Mon', calories: 2200 },
    { name: 'Tue', calories: 2100 },
    { name: 'Wed', calories: 2300 },
    { name: 'Thu', calories: 2000 },
    { name: 'Fri', calories: 2500 },
    { name: 'Sat', calories: 2600 },
    { name: 'Sun', calories: 2400 },
  ];

  return (
    <motion.div
      className="min-h-screen bg-gray-900 text-white p-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-5xl font-bold text-white mb-2">Daily Nutrition Tracker</h1>
          <p className="text-gray-400">Your intelligent nutrition partner</p>
        </div>

        <DailyGoals dailyNeeds={dailyNeeds} />

        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          <FoodSearch
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            quantity={quantity}
            setQuantity={setQuantity}
            filteredItems={filteredItems}
            addItem={addItem}
            nutritionDB={nutritionDB}
          />
          <ConsumedItems selectedItems={selectedItems} removeItem={removeItem} />
        </div>

        {remaining && (
          <RemainingNutrition
            remaining={remaining}
            consumed={consumed}
            dailyNeeds={dailyNeeds}
            getPercentage={getPercentage}
          />
        )}

        <ProgressChart data={weeklyData} />
      </div>
    </motion.div>
  );
};

export default Tracker;
