import React, { useState } from 'react';
import Profile from './components/Profile';
import Tracker from './components/Tracker';
import { nutritionDB } from './nutritionDB';
import { calculateDailyNeeds as calculateNeeds } from './utils/calculations';

const App = () => {
  const [currentPage, setCurrentPage] = useState('profile');
  const [profile, setProfile] = useState({
    gender: '',
    age: '',
    height: '',
    weight: '',
    activityLevel: 'moderate',
  });
  const [dailyNeeds, setDailyNeeds] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const calculateDailyNeeds = () => {
    const needs = calculateNeeds(profile);
    setDailyNeeds(needs);
    setCurrentPage('tracker');
  };

  const foodItems = Object.keys(nutritionDB).sort();

  const filteredItems = foodItems.filter((item) =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addItem = (item) => {
    const nutrition = nutritionDB[item];
    const multipliedNutrition = {};

    Object.keys(nutrition).forEach((key) => {
      if (key !== 'unit') {
        multipliedNutrition[key] = nutrition[key] * quantity;
      } else {
        multipliedNutrition[key] = nutrition[key];
      }
    });

    setSelectedItems([
      ...selectedItems,
      {
        name: item,
        quantity: quantity,
        ...multipliedNutrition,
      },
    ]);
    setSearchTerm('');
    setQuantity(1);
  };

  const removeItem = (index) => {
    setSelectedItems(selectedItems.filter((_, i) => i !== index));
  };

  const calculateTotals = () => {
    return selectedItems.reduce(
      (acc, item) => ({
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
      }),
      {
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
        fiber: 0,
        calcium: 0,
        iron: 0,
        magnesium: 0,
        potassium: 0,
        sodium: 0,
        vitaminA: 0,
        vitaminC: 0,
        vitaminB12: 0,
      }
    );
  };

  const consumed = calculateTotals();

  const remaining = dailyNeeds
    ? {
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
      }
    : null;

  const getPercentage = (consumed, needed) => {
    if (needed === 0) {
      return 0;
    }
    return Math.min(100, Math.round((consumed / needed) * 100));
  };

  if (currentPage === 'profile') {
    return (
      <Profile
        profile={profile}
        setProfile={setProfile}
        calculateDailyNeeds={calculateDailyNeeds}
      />
    );
  }

  return (
    <Tracker
      dailyNeeds={dailyNeeds}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      quantity={quantity}
      setQuantity={setQuantity}
      filteredItems={filteredItems}
      addItem={addItem}
      selectedItems={selectedItems}
      removeItem={removeItem}
      consumed={consumed}
      remaining={remaining}
      getPercentage={getPercentage}
      nutritionDB={nutritionDB}
    />
  );
};

export default App;
