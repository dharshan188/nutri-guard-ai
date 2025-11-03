import React, { useState, useMemo, useEffect } from 'react';
import { Search, Plus, Trash2, Calculator, User, Target, Sparkles, Lightbulb, ArrowRight, Home } from 'lucide-react';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [profile, setProfile] = useState({
    gender: '', age: '', height: '', weight: '', activityLevel: 'moderate', goal: 'maintain'
  });
  const [dailyNeeds, setDailyNeeds] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [showAISuggestions, setShowAISuggestions] = useState(false);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('nutriProfile');
    if (saved) {
      const data = JSON.parse(saved);
      setProfile(data.profile || profile);
      setDailyNeeds(data.dailyNeeds);
      setSelectedItems(data.selectedItems || []);
      if (data.dailyNeeds) setCurrentPage('tracker');
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('nutriProfile', JSON.stringify({ profile, dailyNeeds, selectedItems }));
  }, [profile, dailyNeeds, selectedItems]);

  const nutritionDB = {
    'dosa': { calories: 168, protein: 3.9, carbs: 28.6, fat: 3.7, fiber: 1.2, unit: 'piece (50g)' },
    'idli': { calories: 58, protein: 2.1, carbs: 11.8, fat: 0.4, fiber: 0.8, unit: 'piece (30g)' },
    'vada': { calories: 193, protein: 4.8, carbs: 18.5, fat: 11.2, fiber: 2.1, unit: 'piece (60g)' },
    'rice': { calories: 195, protein: 4.0, carbs: 42.3, fat: 0.5, fiber: 0.6, unit: 'bowl (150g)' },
    'chapati': { calories: 120, protein: 3.6, carbs: 21.4, fat: 2.5, fiber: 2.8, unit: 'piece (40g)' },
    'dal': { calories: 172, protein: 13.2, carbs: 27.3, fat: 2.3, fiber: 11.7, unit: 'bowl (150ml)' },
    'paneer': { calories: 265, protein: 18.3, carbs: 1.2, fat: 20.8, fiber: 0, unit: '100g' },
    'egg': { calories: 78, protein: 6.3, carbs: 0.6, fat: 5.3, fiber: 0, unit: 'large (50g)' },
    'chicken breast': { calories: 165, protein: 31, carbs: 0, fat: 3.6, fiber: 0, unit: '100g' },
    'apple': { calories: 95, protein: 0.5, carbs: 25, fat: 0.3, fiber: 4.4, unit: 'medium (182g)' },
    'banana': { calories: 105, protein: 1.3, carbs: 27, fat: 0.4, fiber: 3.1, unit: 'medium (118g)' },
    'milk': { calories: 149, protein: 7.7, carbs: 11.7, fat: 7.9, fiber: 0, unit: 'glass (244ml)' },
    'biryani': { calories: 435, protein: 12.8, carbs: 63.5, fat: 14.3, fiber: 2.7, unit: 'plate (150g)' },
    'sambar': { calories: 120, protein: 3.8, carbs: 18.5, fat: 4.2, fiber: 4.8, unit: 'bowl (150ml)' },
    'curd': { calories: 98, protein: 11, carbs: 4.7, fat: 4.3, fiber: 0, unit: 'bowl (150g)' },
    'oats': { calories: 389, protein: 16.9, carbs: 66.3, fat: 6.9, fiber: 10.6, unit: '100g' },
  };

  const foodItems = Object.keys(nutritionDB).sort();

  const calculateDailyNeeds = () => {
    const { age, weight, height, gender, activityLevel, goal } = profile;
    if (!age || !weight || !height || !gender) {
      alert('Please fill all fields!');
      return;
    }

    let bmr = gender === 'male' 
      ? (10 * weight) + (6.25 * height) - (5 * age) + 5
      : (10 * weight) + (6.25 * height) - (5 * age) - 161;

    const multipliers = { sedentary: 1.2, light: 1.375, moderate: 1.55, active: 1.725, veryActive: 1.9 };
    let tdee = bmr * multipliers[activityLevel];
    
    if (goal === 'lose') tdee -= 500;
    if (goal === 'gain') tdee += 300;

    const proteinGrams = weight * (goal === 'lose' ? 2.0 : goal === 'gain' ? 1.8 : 1.6);
    const fatGrams = (tdee * 0.25) / 9;
    const carbGrams = (tdee - (proteinGrams * 4) - (fatGrams * 9)) / 4;

    setDailyNeeds({
      calories: Math.round(tdee),
      protein: Math.round(proteinGrams),
      carbs: Math.round(carbGrams),
      fat: Math.round(fatGrams),
      fiber: gender === 'male' ? 38 : 25,
    });
    setCurrentPage('tracker');
  };

  const addItem = (item) => {
    const nutrition = nutritionDB[item];
    const multiplied = {};
    Object.keys(nutrition).forEach(key => {
      multiplied[key] = key !== 'unit' ? nutrition[key] * quantity : nutrition[key];
    });
    setSelectedItems([...selectedItems, { name: item, quantity, ...multiplied }]);
    setSearchTerm('');
    setQuantity(1);
  };

  const consumed = useMemo(() => {
    return selectedItems.reduce((acc, item) => ({
      calories: acc.calories + item.calories,
      protein: acc.protein + item.protein,
      carbs: acc.carbs + item.carbs,
      fat: acc.fat + item.fat,
      fiber: acc.fiber + item.fiber,
    }), { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 });
  }, [selectedItems]);

  const remaining = dailyNeeds ? {
    calories: dailyNeeds.calories - consumed.calories,
    protein: dailyNeeds.protein - consumed.protein,
    carbs: dailyNeeds.carbs - consumed.carbs,
    fat: dailyNeeds.fat - consumed.fat,
    fiber: dailyNeeds.fiber - consumed.fiber,
  } : null;

  const getAISuggestions = useMemo(() => {
    if (!remaining) return [];
    const suggestions = [];
    Object.entries(nutritionDB).forEach(([food, data]) => {
      let score = 0;
      if (remaining.protein > 20 && data.protein > 10) score += 50;
      if (remaining.fiber > 10 && data.fiber > 3) score += 40;
      if (remaining.calories > 300 && data.calories < 300) score += 20;
      if (score > 0) suggestions.push({ food, score, data });
    });
    return suggestions.sort((a, b) => b.score - a.score).slice(0, 6);
  }, [remaining]);

  // PAGE 1: HOME - Profile Setup
  if (currentPage === 'home') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-lg w-full">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-4">
              <Sparkles className="text-white" size={40} />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
              NutriGuard AI
            </h1>
            <p className="text-gray-600 text-lg">Your Personal Nutrition Assistant</p>
            <p className="text-sm text-gray-500 mt-2">Let's calculate your daily nutrition needs!</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Gender</label>
              <select
                value={profile.gender}
                onChange={(e) => setProfile({...profile, gender: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              >
                <option value="">Select Gender</option>
                <option value="male">Male 👨</option>
                <option value="female">Female 👩</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Age (years)</label>
              <input
                type="number"
                placeholder="Enter your age"
                value={profile.age}
                onChange={(e) => setProfile({...profile, age: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Height (cm)</label>
              <input
                type="number"
                placeholder="Enter your height"
                value={profile.height}
                onChange={(e) => setProfile({...profile, height: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Weight (kg)</label>
              <input
                type="number"
                placeholder="Enter your weight"
                value={profile.weight}
                onChange={(e) => setProfile({...profile, weight: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Goal</label>
              <select
                value={profile.goal}
                onChange={(e) => setProfile({...profile, goal: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              >
                <option value="lose">🔥 Lose Weight (-500 cal)</option>
                <option value="maintain">⚖️ Maintain Weight</option>
                <option value="gain">💪 Gain Muscle (+300 cal)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Activity Level</label>
              <select
                value={profile.activityLevel}
                onChange={(e) => setProfile({...profile, activityLevel: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              >
                <option value="sedentary">🪑 Sedentary (little/no exercise)</option>
                <option value="light">🚶 Light (1-3 days/week)</option>
                <option value="moderate">🏃 Moderate (3-5 days/week)</option>
                <option value="active">🏋️ Active (6-7 days/week)</option>
                <option value="veryActive">⚡ Very Active (twice per day)</option>
              </select>
            </div>

            <button
              onClick={calculateDailyNeeds}
              disabled={!profile.gender || !profile.age || !profile.height || !profile.weight}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
            >
              Calculate My Nutrition
              <ArrowRight size={24} />
            </button>
          </div>

          <p className="text-center text-xs text-gray-500 mt-6">
            Made with ❤️ by Dharshan for Hackathon
          </p>
        </div>
      </div>
    );
  }

  // PAGE 2 & 3: TRACKER (combined view)
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sparkles className="text-purple-600" size={32} />
            <div>
              <h1 className="text-2xl font-bold text-gray-800">NutriGuard AI</h1>
              <p className="text-sm text-gray-500">Nutrition Tracker</p>
            </div>
          </div>
          <button
            onClick={() => {
              if (confirm('Reset all data?')) {
                localStorage.clear();
                setProfile({ gender: '', age: '', height: '', weight: '', activityLevel: 'moderate', goal: 'maintain' });
                setDailyNeeds(null);
                setSelectedItems([]);
                setCurrentPage('home');
              }
            }}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all"
          >
            <Home size={20} />
            <span className="hidden sm:inline">Back to Home</span>
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-4">
        {/* Your Daily Goals Card */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl shadow-xl p-6 text-white mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Target size={28} />
              Your Daily Nutrition Goals
            </h2>
            <span className="bg-white bg-opacity-20 px-4 py-2 rounded-full text-sm font-semibold">
              {profile.goal === 'lose' ? '🔥 Weight Loss' : profile.goal === 'gain' ? '💪 Muscle Gain' : '⚖️ Maintain'}
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {['calories', 'protein', 'carbs', 'fat', 'fiber'].map((n) => (
              <div key={n} className="bg-white bg-opacity-20 rounded-xl p-4 text-center backdrop-blur">
                <p className="text-sm opacity-90 capitalize">{n}</p>
                <p className="text-3xl font-bold mt-1">{dailyNeeds[n]}</p>
                <p className="text-xs opacity-75">{n === 'calories' ? 'kcal' : 'grams'}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left: Food Search & Add */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Search className="text-green-600" />
                Search & Add Foods
              </h3>
              
              <div className="flex gap-3 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
                    placeholder="Search foods (e.g., dosa, rice, egg)..."
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(0.5, parseFloat(e.target.value) || 1))}
                  min="0.5"
                  step="0.5"
                  placeholder="Qty"
                  className="w-24 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-3 max-h-96 overflow-y-auto">
                {foodItems
                  .filter((item) => item.toLowerCase().includes(searchTerm))
                  .map((item) => (
                    <div
                      key={item}
                      className="p-4 border-2 border-gray-100 rounded-xl hover:border-green-500 hover:shadow-md transition-all cursor-pointer"
                      onClick={() => addItem(item)}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <p className="font-semibold capitalize text-gray-800">{item}</p>
                          <p className="text-sm text-gray-500">{nutritionDB[item].unit}</p>
                          <p className="text-xs text-gray-400 mt-1">
                            {nutritionDB[item].calories} cal • {nutritionDB[item].protein.toFixed(1)}g protein
                          </p>
                        </div>
                        <Plus className="text-green-500" size={24} />
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* AI Suggestions */}
            {getAISuggestions.length > 0 && (
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 border-2 border-purple-300 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-purple-900 flex items-center gap-2">
                    <Sparkles className="text-purple-600" />
                    AI Smart Suggestions
                  </h3>
                  <button
                    onClick={() => setShowAISuggestions(!showAISuggestions)}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-all flex items-center gap-2"
                  >
                    <Lightbulb size={18} />
                    {showAISuggestions ? 'Hide' : 'Show'}
                  </button>
                </div>
                {showAISuggestions && (
                  <div className="grid md:grid-cols-3 gap-3">
                    {getAISuggestions.map((s, i) => (
                      <div
                        key={i}
                        onClick={() => addItem(s.food)}
                        className="bg-white p-4 rounded-xl border-2 border-purple-200 hover:border-purple-400 cursor-pointer transition-all"
                      >
                        <h4 className="font-bold capitalize text-lg text-gray-800">{s.food}</h4>
                        <p className="text-sm text-gray-600">{s.data.unit}</p>
                        <p className="text-xs text-gray-500 mt-2">
                          {s.data.calories} cal • {s.data.protein.toFixed(1)}g protein
                        </p>
                        <div className="mt-3 bg-purple-50 px-3 py-1 rounded-full text-xs text-purple-700 font-semibold inline-block">
                          Score: {s.score}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right: Summary & What You Ate */}
          <div>
            {/* What You Consumed */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Calculator className="text-blue-600" />
                  What You Ate
                </span>
                <span className="text-sm bg-blue-100 px-3 py-1 rounded-full">{selectedItems.length} items</span>
              </h3>

              <div className="space-y-3 max-h-64 overflow-y-auto">
                {selectedItems.length > 0 ? (
                  selectedItems.map((item, i) => (
                    <div key={i} className="p-3 bg-gray-50 rounded-xl flex justify-between items-start">
                      <div className="flex-1">
                        <p className="font-semibold capitalize text-gray-800">
                          {item.name} × {item.quantity}
                        </p>
                        <p className="text-sm text-gray-600">{item.unit}</p>
                        <p className="text-xs text-gray-500">
                          {item.calories.toFixed(0)} cal • {item.protein.toFixed(1)}g protein
                        </p>
                      </div>
                      <button
                        onClick={() => setSelectedItems(selectedItems.filter((_, idx) => idx !== i))}
                        className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-all"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-400">
                    <p>No items added yet</p>
                    <p className="text-sm">Start adding foods from the left!</p>
                  </div>
                )}
              </div>

              {/* Total Consumed */}
              {selectedItems.length > 0 && (
                <div className="mt-4 pt-4 border-t-2">
                  <h4 className="font-bold text-gray-700 mb-2">Total Consumed:</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="bg-green-50 p-2 rounded">
                      <p className="text-gray-600">Calories</p>
                      <p className="font-bold text-green-700">{consumed.calories.toFixed(0)} kcal</p>
                    </div>
                    <div className="bg-blue-50 p-2 rounded">
                      <p className="text-gray-600">Protein</p>
                      <p className="font-bold text-blue-700">{consumed.protein.toFixed(1)}g</p>
                    </div>
                    <div className="bg-orange-50 p-2 rounded">
                      <p className="text-gray-600">Carbs</p>
                      <p className="font-bold text-orange-700">{consumed.carbs.toFixed(1)}g</p>
                    </div>
                    <div className="bg-red-50 p-2 rounded">
                      <p className="text-gray-600">Fat</p>
                      <p className="font-bold text-red-700">{consumed.fat.toFixed(1)}g</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* What's Remaining */}
            {remaining && (
              <div className="bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl shadow-lg p-6 text-white">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Target size={24} />
                  What You Still Need
                </h3>
                <div className="space-y-3">
                  {['calories', 'protein', 'carbs', 'fat', 'fiber'].map((n) => {
                    const val = remaining[n];
                    const percent = Math.min(100, Math.round((consumed[n] / dailyNeeds[n]) * 100));
                    return (
                      <div key={n} className="bg-white bg-opacity-20 rounded-xl p-3 backdrop-blur">
                        <div className="flex justify-between items-center mb-2">
                          <span className="capitalize font-semibold">{n}</span>
                          <span className="text-sm">{percent}%</span>
                        </div>
                        <div className="bg-white bg-opacity-30 rounded-full h-2 mb-2">
                          <div
                            className="bg-white h-2 rounded-full transition-all"
                            style={{ width: `${percent}%` }}
                          ></div>
                        </div>
                        <p className="text-lg font-bold">
                          {val >= 0 ? (
                            <>
                              {val.toFixed(n === 'calories' ? 0 : 1)}{' '}
                              {n === 'calories' ? 'kcal' : 'g'} left
                            </>
                          ) : (
                            <span className="text-yellow-300">
                              +{Math.abs(val).toFixed(n === 'calories' ? 0 : 1)}{' '}
                              {n === 'calories' ? 'kcal' : 'g'} over!
                            </span>
                          )}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* Summary Message */}
                <div className="mt-6 p-4 bg-white text-gray-800 rounded-xl text-center">
                  <p className="font-bold text-lg flex items-center justify-center gap-2">
                    <Sparkles className="text-yellow-500" />
                    {remaining.calories > 200
                      ? `You need ${remaining.calories.toFixed(0)} more calories today!`
                      : remaining.calories > 0
                      ? `Almost there! Just ${remaining.calories.toFixed(0)} calories to go!`
                      : `Goal achieved! 🎉`}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
