import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ProgressChart = ({ data }) => {
  const chartVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-lg shadow-lg p-6 border border-gray-700 mt-6"
      variants={chartVariants}
    >
      <h2 className="text-2xl font-bold text-white mb-4">Weekly Progress</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" stroke="#9CA3AF" />
          <YAxis stroke="#9CA3AF" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1F2937',
              borderColor: '#4B5563',
              color: '#F9FAFB',
            }}
          />
          <Legend wrapperStyle={{ color: '#F9FAFB' }} />
          <Bar dataKey="calories" fill="#10B981" />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default ProgressChart;
