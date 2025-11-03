import React from 'react';
import { motion } from 'framer-motion';
import { Search, Plus } from 'lucide-react';

const FoodSearch = ({
  searchTerm,
  setSearchTerm,
  quantity,
  setQuantity,
  filteredItems,
  addItem,
  nutritionDB,
}) => {
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-lg shadow-lg p-6 border border-gray-700"
      variants={itemVariants}
    >
      <h2 className="text-2xl font-bold text-white mb-4">Add Food</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-400 mb-2">Search</label>
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for food..."
            className="w-full pl-10 pr-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-400 mb-2">Quantity</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Math.max(1, parseFloat(e.target.value)))}
          min="1"
          step="0.5"
          className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>

      {searchTerm && (
        <motion.div
          className="max-h-80 overflow-y-auto border border-gray-700 rounded-lg"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
        >
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <motion.div
                key={item}
                onClick={() => addItem(item)}
                className="p-3 hover:bg-gray-700 cursor-pointer border-b border-gray-700"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-white capitalize">{item}</p>
                    <p className="text-sm text-gray-400">
                      {nutritionDB[item].calories} cal • {nutritionDB[item].unit}
                    </p>
                  </div>
                  <Plus className="text-green-400" size={20} />
                </div>
              </motion.div>
            ))
          ) : (
            <p className="p-4 text-gray-400 text-center">No items found</p>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

export default FoodSearch;
