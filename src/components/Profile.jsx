import React from 'react';
import { motion } from 'framer-motion';
import { User, ChevronRight } from 'lucide-react';

const Profile = ({ profile, setProfile, calculateDailyNeeds }) => {
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6 text-white"
      style={{
        backgroundImage: 'url(/images/background.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <motion.div
        className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-2xl shadow-2xl p-8 max-w-md w-full border border-gray-700"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="text-center mb-8" variants={itemVariants}>
          <img src="/images/logo.png" alt="NutriGuard AI" className="mx-auto mb-4 w-24 h-24" />
          <h1 className="text-4xl font-bold text-white mb-2">Welcome to NutriGuard AI</h1>
          <p className="text-gray-400">Your intelligent nutrition partner</p>
        </motion.div>

        <motion.div className="space-y-4" variants={itemVariants}>
          <div className="relative">
            <select
              value={profile.gender}
              onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
              className="w-full bg-gray-700 text-white px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <input
            type="number"
            value={profile.age}
            onChange={(e) => setProfile({ ...profile, age: e.target.value })}
            placeholder="Age (years)"
            className="w-full bg-gray-700 text-white px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <input
            type="number"
            value={profile.height}
            onChange={(e) => setProfile({ ...profile, height: e.target.value })}
            placeholder="Height (cm)"
            className="w-full bg-gray-700 text-white px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <input
            type="number"
            value={profile.weight}
            onChange={(e) => setProfile({ ...profile, weight: e.target.value })}
            placeholder="Weight (kg)"
            className="w-full bg-gray-700 text-white px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <select
            value={profile.activityLevel}
            onChange={(e) => setProfile({ ...profile, activityLevel: e.target.value })}
            className="w-full bg-gray-700 text-white px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none"
          >
            <option value="sedentary">Sedentary</option>
            <option value="light">Light Activity</option>
            <option value="moderate">Moderate Activity</option>
            <option value="active">Active</option>
            <option value="veryActive">Very Active</option>
          </select>

          <motion.button
            onClick={calculateDailyNeeds}
            disabled={!profile.gender || !profile.age || !profile.height || !profile.weight}
            className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white py-3 rounded-lg font-semibold hover:from-green-600 hover:to-teal-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Calculate Needs <ChevronRight className="ml-2" size={20} />
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Profile;
