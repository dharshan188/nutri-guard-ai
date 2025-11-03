import React, { useState } from 'react';
import { Search, Plus, Trash2, Calculator, User, Activity, Target } from 'lucide-react';

const NutritionAnalyzer = () => {
  const [currentPage, setCurrentPage] = useState('profile');
  const [profile, setProfile] = useState({
    gender: '',
    age: '',
    height: '',
    weight: '',
    activityLevel: 'moderate'
  });
  const [dailyNeeds, setDailyNeeds] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [quantity, setQuantity] = useState(1);

  // Comprehensive nutrition database
  const nutritionDB = {
    'dosa': { 
      calories: 168, protein: 3.9, carbs: 28.6, fat: 3.7, fiber: 1.2,
      calcium: 48, iron: 1.5, magnesium: 15, potassium: 85, sodium: 180,
      vitaminA: 25, vitaminC: 2, vitaminB6: 0.1, vitaminB12: 0,
      unit: 'piece (50g)'
    },
    'idli': { 
      calories: 58, protein: 2.1, carbs: 11.8, fat: 0.4, fiber: 0.8,
      calcium: 35, iron: 0.8, magnesium: 12, potassium: 45, sodium: 90,
      vitaminA: 15, vitaminC: 1, vitaminB6: 0.05, vitaminB12: 0,
      unit: 'piece (30g)'
    },
    'vada': { 
      calories: 193, protein: 4.8, carbs: 18.5, fat: 11.2, fiber: 2.1,
      calcium: 42, iron: 1.8, magnesium: 28, potassium: 125, sodium: 240,
      vitaminA: 18, vitaminC: 3, vitaminB6: 0.12, vitaminB12: 0,
      unit: 'piece (60g)'
    },
    'sambar': { 
      calories: 120, protein: 3.8, carbs: 18.5, fat: 4.2, fiber: 4.8,
      calcium: 65, iron: 2.2, magnesium: 42, potassium: 285, sodium: 420,
      vitaminA: 185, vitaminC: 12, vitaminB6: 0.18, vitaminB12: 0,
      unit: 'bowl (150ml)'
    },
    'rice': { 
      calories: 195, protein: 4.0, carbs: 42.3, fat: 0.5, fiber: 0.6,
      calcium: 15, iron: 0.8, magnesium: 25, potassium: 55, sodium: 2,
      vitaminA: 0, vitaminC: 0, vitaminB6: 0.15, vitaminB12: 0,
      unit: 'bowl (150g)'
    },
    'chapati': { 
      calories: 120, protein: 3.6, carbs: 21.4, fat: 2.5, fiber: 2.8,
      calcium: 28, iron: 1.2, magnesium: 35, potassium: 98, sodium: 145,
      vitaminA: 5, vitaminC: 0, vitaminB6: 0.08, vitaminB12: 0,
      unit: 'piece (40g)'
    },
    'paratha': { 
      calories: 258, protein: 5.2, carbs: 32.5, fat: 11.8, fiber: 2.2,
      calcium: 42, iron: 1.8, magnesium: 38, potassium: 112, sodium: 285,
      vitaminA: 125, vitaminC: 0.5, vitaminB6: 0.1, vitaminB12: 0,
      unit: 'piece (80g)'
    },
    'biryani': { 
      calories: 435, protein: 12.8, carbs: 63.5, fat: 14.3, fiber: 2.7,
      calcium: 75, iron: 2.8, magnesium: 58, potassium: 285, sodium: 680,
      vitaminA: 185, vitaminC: 8, vitaminB6: 0.28, vitaminB12: 0.3,
      unit: 'plate (150g)'
    },
    'dal': { 
      calories: 172, protein: 13.2, carbs: 27.3, fat: 2.3, fiber: 11.7,
      calcium: 82, iron: 3.8, magnesium: 68, potassium: 485, sodium: 320,
      vitaminA: 65, vitaminC: 5, vitaminB6: 0.22, vitaminB12: 0,
      unit: 'bowl (150ml)'
    },
    'paneer': { 
      calories: 265, protein: 18.3, carbs: 1.2, fat: 20.8, fiber: 0,
      calcium: 480, iron: 0.4, magnesium: 28, potassium: 138, sodium: 385,
      vitaminA: 585, vitaminC: 0, vitaminB6: 0.08, vitaminB12: 1.2,
      unit: '100g'
    },
    'butter chicken': { 
      calories: 352, protein: 18.8, carbs: 12.9, fat: 25.2, fiber: 1.8,
      calcium: 125, iron: 2.2, magnesium: 45, potassium: 385, sodium: 720,
      vitaminA: 485, vitaminC: 12, vitaminB6: 0.35, vitaminB12: 0.8,
      unit: 'bowl (150g)'
    },
    'chole': { 
      calories: 246, protein: 13.4, carbs: 41.1, fat: 3.9, fiber: 11.4,
      calcium: 98, iron: 4.2, magnesium: 85, potassium: 625, sodium: 580,
      vitaminA: 145, vitaminC: 15, vitaminB6: 0.28, vitaminB12: 0,
      unit: 'bowl (150g)'
    },
    'poha': { 
      calories: 237, protein: 4.2, carbs: 48.8, fat: 2.7, fiber: 2.3,
      calcium: 35, iron: 2.8, magnesium: 38, potassium: 125, sodium: 285,
      vitaminA: 85, vitaminC: 8, vitaminB6: 0.15, vitaminB12: 0,
      unit: 'bowl (150g)'
    },
    'apple': { 
      calories: 95, protein: 0.5, carbs: 25, fat: 0.3, fiber: 4.4,
      calcium: 11, iron: 0.2, magnesium: 9, potassium: 195, sodium: 2,
      vitaminA: 98, vitaminC: 8.4, vitaminB6: 0.07, vitaminB12: 0,
      unit: 'medium (182g)'
    },
    'banana': { 
      calories: 105, protein: 1.3, carbs: 27, fat: 0.4, fiber: 3.1,
      calcium: 6, iron: 0.3, magnesium: 32, potassium: 422, sodium: 1,
      vitaminA: 76, vitaminC: 10.3, vitaminB6: 0.43, vitaminB12: 0,
      unit: 'medium (118g)'
    },
    'orange': { 
      calories: 62, protein: 1.2, carbs: 15.4, fat: 0.2, fiber: 3.1,
      calcium: 52, iron: 0.1, magnesium: 13, potassium: 237, sodium: 0,
      vitaminA: 295, vitaminC: 69.7, vitaminB6: 0.08, vitaminB12: 0,
      unit: 'medium (131g)'
    },
    'mango': { 
      calories: 135, protein: 1.8, carbs: 35, fat: 0.9, fiber: 3.7,
      calcium: 25, iron: 0.4, magnesium: 23, potassium: 325, sodium: 3,
      vitaminA: 3285, vitaminC: 76, vitaminB6: 0.23, vitaminB12: 0,
      unit: 'medium (225g)'
    },
    'egg': { 
      calories: 78, protein: 6.3, carbs: 0.6, fat: 5.3, fiber: 0,
      calcium: 28, iron: 0.9, magnesium: 6, potassium: 69, sodium: 62,
      vitaminA: 270, vitaminC: 0, vitaminB6: 0.09, vitaminB12: 0.6,
      unit: 'large (50g)'
    },
    'chicken breast': { 
      calories: 165, protein: 31, carbs: 0, fat: 3.6, fiber: 0,
      calcium: 15, iron: 1.0, magnesium: 29, potassium: 256, sodium: 74,
      vitaminA: 21, vitaminC: 0, vitaminB6: 0.53, vitaminB12: 0.3,
      unit: '100g'
    },
    'milk': { 
      calories: 149, protein: 7.7, carbs: 11.7, fat: 7.9, fiber: 0,
      calcium: 276, iron: 0.1, magnesium: 24, potassium: 322, sodium: 105,
      vitaminA: 395, vitaminC: 0, vitaminB6: 0.09, vitaminB12: 1.1,
      unit: 'glass (244ml)'
    },
    'burger': { 
      calories: 295, protein: 15.8, carbs: 28.5, fat: 12.8, fiber: 2.1,
      calcium: 85, iron: 2.8, magnesium: 35, potassium: 285, sodium: 680,
      vitaminA: 185, vitaminC: 3.5, vitaminB6: 0.18, vitaminB12: 1.2,
      unit: 'piece'
    },
    'pizza': { 
      calories: 285, protein: 12.2, carbs: 35.6, fat: 10.5, fiber: 2.5,
      calcium: 185, iron: 2.2, magnesium: 28, potassium: 225, sodium: 598,
      vitaminA: 285, vitaminC: 4.5, vitaminB6: 0.12, vitaminB12: 0.8,
      unit: 'slice (107g)'
    },
    'samosa': { 
      calories: 262, protein: 4.8, carbs: 28.5, fat: 14.2, fiber: 2.5,
      calcium: 38, iron: 1.8, magnesium: 28, potassium: 185, sodium: 485,
      vitaminA: 125, vitaminC: 4.2, vitaminB6: 0.12, vitaminB12: 0,
      unit: 'piece'
    },
  };

  // Calculate daily nutritional needs
  const calculateDailyNeeds = () => {
    const age = parseInt(profile.age);
    const weight = parseFloat(profile.weight);
    const height = parseFloat(profile.height);
    const gender = profile.gender;
    const activity = profile.activityLevel;

    // BMR calculation using Mifflin-St Jeor Equation
    let bmr;
    if (gender === 'male') {
      bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
    } else {
      bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
    }

    // Activity multipliers
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      veryActive: 1.9
    };

    const tdee = bmr * activityMultipliers[activity];

    // Calculate macros
    const proteinGrams = weight * 1.6; // 1.6g per kg bodyweight
    const fatGrams = (tdee * 0.25) / 9; // 25% of calories from fat
    const proteinCalories = proteinGrams * 4;
    const fatCalories = fatGrams * 9;
    const carbCalories = tdee - proteinCalories - fatCalories;
    const carbGrams = carbCalories / 4;

    // Recommended daily values for vitamins and minerals
    const needs = {
      calories: Math.round(tdee),
      protein: Math.round(proteinGrams),
      carbs: Math.round(carbGrams),
      fat: Math.round(fatGrams),
      fiber: gender === 'male' ? 38 : 25,
      calcium: 1000,
      iron: gender === 'male' ? 8 : 18,
      magnesium: gender === 'male' ? 400 : 310,
      potassium: 3500,
      sodium: 2300,
      vitaminA: 900,
      vitaminC: 90,
      vitaminB6: 1.3,
      vitaminB12: 2.4
    };

    setDailyNeeds(needs);
    setCurrentPage('tracker');
  };

  const foodItems = Object.keys(nutritionDB).sort();

  const filteredItems = foodItems.filter(item =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addItem = (item) => {
    const nutrition = nutritionDB[item];
    const multipliedNutrition = {};
    
    Object.keys(nutrition).forEach(key => {
      if (key !== 'unit') {
        multipliedNutrition[key] = nutrition[key] * quantity;
      } else {
        multipliedNutrition[key] = nutrition[key];
      }
    });
    
    setSelectedItems([...selectedItems, { 
      name: item, 
      quantity: quantity,
      ...multipliedNutrition
    }]);
    setSearchTerm('');
    setQuantity(1);
  };

  const removeItem = (index) => {
    setSelectedItems(selectedItems.filter((_, i) => i !== index));
  };

  const calculateTotals = () => {
    return selectedItems.reduce((acc, item) => ({
      calories: acc.calories + item.calories,
      protein: acc.protein + item.protein,
      carbs: acc.carbs + item.carbs,
      fat: acc.fat + item.fat,
      fiber: acc.fiber + item.fiber,
      calcium: acc.calcium + item.calcium,
      iron: acc.iron + item.iron,
      magnesium: acc.magnesium + item.magnesium,
      potassium: acc.potassium + item.potassium,
      sodium: acc.sodium + item.sodium,
      vitaminA: acc.vitaminA + item.vitaminA,
      vitaminC: acc.vitaminC + item.vitaminC,
      vitaminB6: acc.vitaminB6 + item.vitaminB6,
      vitaminB12: acc.vitaminB12 + item.vitaminB12,
    }), { 
      calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0,
      calcium: 0, iron: 0, magnesium: 0, potassium: 0, sodium: 0,
      vitaminA: 0, vitaminC: 0, vitaminB6: 0, vitaminB12: 0
    });
  };

  const consumed = calculateTotals();
  
  const remaining = dailyNeeds ? {
    calories: dailyNeeds.calories - consumed.calories,
    protein: dailyNeeds.protein - consumed.protein,
    carbs: dailyNeeds.carbs - consumed.carbs,
    fat: dailyNeeds.fat - consumed.fat,
    fiber: dailyNeeds.fiber - consumed.fiber,
    calcium: dailyNeeds.calcium - consumed.calcium,
    iron: dailyNeeds.iron - consumed.iron,
    magnesium: dailyNeeds.magnesium - consumed.magnesium,
    potassium: dailyNeeds.potassium - consumed.potassium,
    sodium: dailyNeeds.sodium - consumed.sodium,
    vitaminA: dailyNeeds.vitaminA - consumed.vitaminA,
    vitaminC: dailyNeeds.vitaminC - consumed.vitaminC,
    vitaminB6: dailyNeeds.vitaminB6 - consumed.vitaminB6,
    vitaminB12: dailyNeeds.vitaminB12 - consumed.vitaminB12,
  } : null;

  const getPercentage = (consumed, needed) => {
    return Math.min(100, Math.round((consumed / needed) * 100));
  };

  // Profile Page
  if (currentPage === 'profile') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
          <div className="text-center mb-8">
            <User className="mx-auto mb-4 text-blue-600" size={64} />
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Nutrition Analyzer</h1>
            <p className="text-gray-600">Enter your details to get started</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
              <select
                value={profile.gender}
                onChange={(e) => setProfile({...profile, gender: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Age (years)</label>
              <input
                type="number"
                value={profile.age}
                onChange={(e) => setProfile({...profile, age: e.target.value})}
                placeholder="Enter your age"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Height (cm)</label>
              <input
                type="number"
                value={profile.height}
                onChange={(e) => setProfile({...profile, height: e.target.value})}
                placeholder="Enter your height"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Weight (kg)</label>
              <input
                type="number"
                value={profile.weight}
                onChange={(e) => setProfile({...profile, weight: e.target.value})}
                placeholder="Enter your weight"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Activity Level</label>
              <select
                value={profile.activityLevel}
                onChange={(e) => setProfile({...profile, activityLevel: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="sedentary">Sedentary (little/no exercise)</option>
                <option value="light">Light (1-3 days/week)</option>
                <option value="moderate">Moderate (3-5 days/week)</option>
                <option value="active">Active (6-7 days/week)</option>
                <option value="veryActive">Very Active (twice per day)</option>
              </select>
            </div>

            <button
              onClick={calculateDailyNeeds}
              disabled={!profile.gender || !profile.age || !profile.height || !profile.weight}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Calculate My Nutrition Needs
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Tracker Page
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">🥗 Daily Nutrition Tracker</h1>
          <p className="text-gray-600">Track what you eat and see what's remaining</p>
        </div>

        {/* Daily Goals Overview */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg p-6 text-white mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold flex items-center">
              <Target className="mr-2" size={28} />
              Your Daily Goals
            </h2>
            <Activity className="text-white opacity-75" size={32} />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white bg-opacity-20 rounded-lg p-3 text-center">
              <p className="text-sm opacity-90">Calories</p>
              <p className="text-2xl font-bold">{dailyNeeds.calories}</p>
              <p className="text-xs opacity-75">kcal</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-3 text-center">
              <p className="text-sm opacity-90">Protein</p>
              <p className="text-2xl font-bold">{dailyNeeds.protein}</p>
              <p className="text-xs opacity-75">grams</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-3 text-center">
              <p className="text-sm opacity-90">Carbs</p>
              <p className="text-2xl font-bold">{dailyNeeds.carbs}</p>
              <p className="text-xs opacity-75">grams</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-3 text-center">
              <p className="text-sm opacity-90">Fat</p>
              <p className="text-2xl font-bold">{dailyNeeds.fat}</p>
              <p className="text-xs opacity-75">grams</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          {/* Search Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Add Food</h2>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search food..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseFloat(e.target.value)))}
                min="1"
                step="0.5"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {searchTerm && (
              <div className="max-h-80 overflow-y-auto border border-gray-200 rounded-lg">
                {filteredItems.length > 0 ? (
                  filteredItems.map(item => (
                    <div
                      key={item}
                      onClick={() => addItem(item)}
                      className="p-3 hover:bg-green-50 cursor-pointer border-b border-gray-100"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium text-gray-800 capitalize">{item}</p>
                          <p className="text-sm text-gray-500">
                            {nutritionDB[item].calories} cal • {nutritionDB[item].unit}
                          </p>
                        </div>
                        <Plus className="text-green-500" size={20} />
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="p-4 text-gray-500 text-center">No items found</p>
                )}
              </div>
            )}
          </div>

          {/* Consumed Items */}
          <div className="bg-white rounded-lg shadow-lg p-6 lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">What You Ate ({selectedItems.length})</h2>
            
            <div className="max-h-96 overflow-y-auto">
              {selectedItems.length > 0 ? (
                selectedItems.map((item, index) => (
                  <div key={index} className="mb-3 p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold text-gray-800 capitalize">
                          {item.name} × {item.quantity}
                        </h3>
                        <p className="text-sm text-gray-600">{item.unit}</p>
                      </div>
                      <button
                        onClick={() => removeItem(index)}
                        className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-2 text-sm">
                      <div className="bg-white p-2 rounded text-center">
                        <p className="text-gray-500 text-xs">Cal</p>
                        <p className="font-bold text-green-600">{item.calories.toFixed(0)}</p>
                      </div>
                      <div className="bg-white p-2 rounded text-center">
                        <p className="text-gray-500 text-xs">Protein</p>
                        <p className="font-bold text-blue-600">{item.protein.toFixed(1)}g</p>
                      </div>
                      <div className="bg-white p-2 rounded text-center">
                        <p className="text-gray-500 text-xs">Carbs</p>
                        <p className="font-bold text-orange-600">{item.carbs.toFixed(1)}g</p>
                      </div>
                      <div className="bg-white p-2 rounded text-center">
                        <p className="text-gray-500 text-xs">Fat</p>
                        <p className="font-bold text-red-600">{item.fat.toFixed(1)}g</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <p className="text-lg">No food added yet</p>
                  <p className="text-sm">Start adding your meals</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Remaining Nutrition */}
        {remaining && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-6">
              <Calculator className="mr-3 text-red-600" size={32} />
              <h2 className="text-3xl font-bold text-gray-800">What You Still Need Today</h2>
            </div>
            
            {/* Macros Remaining */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">Macronutrients</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-lg p-4">
                  <p className="text-sm text-gray-700 mb-1">Calories</p>
                  <p className={`text-2xl font-bold ${remaining.calories >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                    {remaining.calories >= 0 ? remaining.calories.toFixed(0) : `+${Math.abs(remaining.calories).toFixed(0)}`}
                  </p>
                  <div className="mt-2 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full transition-all"
                      style={{width: `${getPercentage(consumed.calories, dailyNeeds.calories)}%`}}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">{getPercentage(consumed.calories, dailyNeeds.calories)}% done</p>
                </div>
                
                <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg p-4">
                  <p className="text-sm text-gray-700 mb-1">Protein</p>
                  <p className={`text-2xl font-bold ${remaining.protein >= 0 ? 'text-blue-700' : 'text-red-700'}`}>
                    {remaining.protein >= 0 ? remaining.protein.toFixed(1) : `+${Math.abs(remaining.protein).toFixed(1)}`}g
                  </p>
                  <div className="mt-2 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{width: `${getPercentage(consumed.protein, dailyNeeds.protein)}%`}}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">{getPercentage(consumed.protein, dailyNeeds.protein)}% done</p>
                </div>
                
                <div className="bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg p-4">
                  <p className="text-sm text-gray-700 mb-1">Carbs</p>
                  <p className={`text-2xl font-bold ${remaining.carbs >= 0 ? 'text-orange-700' : 'text-red-700'}`}>
                    {remaining.carbs >= 0 ? remaining.carbs.toFixed(1) : `+${Math.abs(remaining.carbs).toFixed(1)}`}g
                  </p>
                  <div className="mt-2 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-orange-600 h-2 rounded-full transition-all"
                      style={{width: `${getPercentage(consumed.carbs, dailyNeeds.carbs)}%`}}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">{getPercentage(consumed.carbs, dailyNeeds.carbs)}% done</p>
                </div>
                
                <div className="bg-gradient-to-br from-red-100 to-red-200 rounded-lg p-4">
                  <p className="text-sm text-gray-700 mb-1">Fat</p>
                  <p className={`text-2xl font-bold ${remaining.fat >= 0 ? 'text-red-700' : 'text-red-700'}`}>
                    {remaining.fat >= 0 ? remaining.fat.toFixed(1) : `+${Math.abs(remaining.fat).toFixed(1)}`}g
                  </p>
                  <div className="mt-2 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-red-600 h-2 rounded-full transition-all"
                      style={{width: `${getPercentage(consumed.fat, dailyNeeds.fat)}%`}}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">{getPercentage(consumed.fat, dailyNeeds.fat)}% done</p>
                </div>
                
                <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg p-4">
                  <p className="text-sm text-gray-700 mb-1">Fiber</p>
                  <p className={`text-2xl font-bold ${remaining.fiber >= 0 ? 'text-purple-700' : 'text-red-700'}`}>
                    {remaining.fiber >= 0 ? remaining.fiber.toFixed(1) : `+${Math.abs(remaining.fiber).toFixed(1)}`}g
                  </p>
                  <div className="mt-2 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-purple-600 h-2 rounded-full transition-all"
                      style={{width: `${getPercentage(consumed.fiber, dailyNeeds.fiber)}%`}}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">{getPercentage(consumed.fiber, dailyNeeds.fiber)}% done</p>
                </div>
              </div>
            </div>

            {/* Minerals Remaining */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">Minerals Remaining</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-3 text-center">
                  <p className="text-sm text-gray-600 mb-1">Calcium</p>
                  <p className={`text-xl font-bold ${remaining.calcium >= 0 ? 'text-gray-700' : 'text-red-600'}`}>
                    {remaining.calcium >= 0 ? remaining.calcium.toFixed(0) : `+${Math.abs(remaining.calcium).toFixed(0)}`}
                  </p>
                  <p className="text-xs text-gray-500">mg</p>
                </div>
                <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-3 text-center">
                  <p className="text-sm text-gray-600 mb-1">Iron</p>
                  <p className={`text-xl font-bold ${remaining.iron >= 0 ? 'text-gray-700' : 'text-red-600'}`}>
                    {remaining.iron >= 0 ? remaining.iron.toFixed(1) : `+${Math.abs(remaining.iron).toFixed(1)}`}
                  </p>
                  <p className="text-xs text-gray-500">mg</p>
                </div>
                <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-3 text-center">
                  <p className="text-sm text-gray-600 mb-1">Magnesium</p>
                  <p className={`text-xl font-bold ${remaining.magnesium >= 0 ? 'text-gray-700' : 'text-red-600'}`}>
                    {remaining.magnesium >= 0 ? remaining.magnesium.toFixed(0) : `+${Math.abs(remaining.magnesium).toFixed(0)}`}
                  </p>
                  <p className="text-xs text-gray-500">mg</p>
                </div>
                <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-3 text-center">
                  <p className="text-sm text-gray-600 mb-1">Potassium</p>
                  <p className={`text-xl font-bold ${remaining.potassium >= 0 ? 'text-gray-700' : 'text-red-600'}`}>
                    {remaining.potassium >= 0 ? remaining.potassium.toFixed(0) : `+${Math.abs(remaining.potassium).toFixed(0)}`}
                  </p>
                  <p className="text-xs text-gray-500">mg</p>
                </div>
                <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-3 text-center">
                  <p className="text-sm text-gray-600 mb-1">Sodium</p>
                  <p className={`text-xl font-bold ${remaining.sodium >= 0 ? 'text-gray-700' : 'text-red-600'}`}>
                    {remaining.sodium >= 0 ? remaining.sodium.toFixed(0) : `+${Math.abs(remaining.sodium).toFixed(0)}`}
                  </p>
                  <p className="text-xs text-gray-500">mg</p>
                </div>
              </div>
            </div>

            {/* Vitamins Remaining */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-3">Vitamins Remaining</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-3 text-center">
                  <p className="text-sm text-gray-600 mb-1">Vitamin A</p>
                  <p className={`text-xl font-bold ${remaining.vitaminA >= 0 ? 'text-yellow-700' : 'text-red-600'}`}>
                    {remaining.vitaminA >= 0 ? remaining.vitaminA.toFixed(0) : `+${Math.abs(remaining.vitaminA).toFixed(0)}`}
                  </p>
                  <p className="text-xs text-gray-500">IU</p>
                </div>
                <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-3 text-center">
                  <p className="text-sm text-gray-600 mb-1">Vitamin C</p>
                  <p className={`text-xl font-bold ${remaining.vitaminC >= 0 ? 'text-orange-700' : 'text-red-600'}`}>
                    {remaining.vitaminC >= 0 ? remaining.vitaminC.toFixed(1) : `+${Math.abs(remaining.vitaminC).toFixed(1)}`}
                  </p>
                  <p className="text-xs text-gray-500">mg</p>
                </div>
                <div className="bg-green-50 border-2 border-green-200 rounded-lg p-3 text-center">
                  <p className="text-sm text-gray-600 mb-1">Vitamin B6</p>
                  <p className={`text-xl font-bold ${remaining.vitaminB6 >= 0 ? 'text-green-700' : 'text-red-600'}`}>
                    {remaining.vitaminB6 >= 0 ? remaining.vitaminB6.toFixed(2) : `+${Math.abs(remaining.vitaminB6).toFixed(2)}`}
                  </p>
                  <p className="text-xs text-gray-500">mg</p>
                </div>
                <div className="bg-red-50 border-2 border-red-200 rounded-lg p-3 text-center">
                  <p className="text-sm text-gray-600 mb-1">Vitamin B12</p>
                  <p className={`text-xl font-bold ${remaining.vitaminB12 >= 0 ? 'text-red-700' : 'text-red-600'}`}>
                    {remaining.vitaminB12 >= 0 ? remaining.vitaminB12.toFixed(1) : `+${Math.abs(remaining.vitaminB12).toFixed(1)}`}
                  </p>
                  <p className="text-xs text-gray-500">µg</p>
                </div>
              </div>
            </div>

            {/* Summary Message */}
            <div className="mt-6 p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
              <p className="text-blue-800 font-semibold text-center">
                {remaining.calories > 0 
                  ? `🍽️ You still need ${remaining.calories.toFixed(0)} calories today to meet your goal!`
                  : `✅ Goal achieved! You've consumed ${Math.abs(remaining.calories).toFixed(0)} calories over your target.`
                }
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NutritionAnalyzer;
