import React from 'react';
import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';

const ConsumedItems = ({ selectedItems, removeItem }) => {
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-lg shadow-lg p-6 lg:col-span-2 border border-gray-700"
      variants={itemVariants}
    >
      <h2 className="text-2xl font-bold text-white mb-4">What You've Eaten ({selectedItems.length})</h2>

      <div className="max-h-96 overflow-y-auto">
        {selectedItems.length > 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {selectedItems.map((item, index) => (
              <motion.div
                key={index}
                className="mb-3 p-3 bg-gray-700 rounded-lg"
                layout
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-white capitalize">
                      {item.name} × {item.quantity}
                    </h3>
                    <p className="text-sm text-gray-400">{item.unit}</p>
                  </div>
                  <motion.button
                    onClick={() => removeItem(index)}
                    className="text-red-500 hover:text-red-400 p-2 hover:bg-gray-600 rounded"
                    whileHover={{ scale: 1.1 }}
                  >
                    <Trash2 size={18} />
                  </motion.button>
                </div>

                <div className="grid grid-cols-4 gap-2 text-sm">
                  <div className="bg-gray-600 p-2 rounded text-center">
                    <p className="text-gray-400 text-xs">Cal</p>
                    <p className="font-bold text-green-400">{item.calories.toFixed(0)}</p>
                  </div>
                  <div className="bg-gray-600 p-2 rounded text-center">
                    <p className="text-gray-400 text-xs">Protein</p>
                    <p className="font-bold text-blue-400">{item.protein.toFixed(1)}g</p>
                  </div>
                  <div className="bg-gray-600 p-2 rounded text-center">
                    <p className="text-gray-400 text-xs">Carbs</p>
                    <p className="font-bold text-orange-400">{item.carbs.toFixed(1)}g</p>
                  </div>
                  <div className="bg-gray-600 p-2 rounded text-center">
                    <p className="text-gray-400 text-xs">Fat</p>
                    <p className="font-bold text-red-400">{item.fat.toFixed(1)}g</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg">No food added yet</p>
            <p className="text-sm">Start tracking your meals</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ConsumedItems;
