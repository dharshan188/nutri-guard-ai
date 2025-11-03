export const calculateDailyNeeds = (profile) => {
  const age = parseInt(profile.age);
  const weight = parseFloat(profile.weight);
  const height = parseFloat(profile.height);
  const gender = profile.gender;
  const activity = profile.activityLevel;

  let bmr;
  if (gender === 'male') {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  const activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    veryActive: 1.9,
  };

  const tdee = bmr * activityMultipliers[activity];

  const proteinGrams = weight * 1.6;
  const fatGrams = (tdee * 0.25) / 9;
  const proteinCalories = proteinGrams * 4;
  const fatCalories = fatGrams * 9;
  const carbCalories = tdee - proteinCalories - fatCalories;
  const carbGrams = carbCalories / 4;

  return {
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
    vitaminB12: 2.4,
  };
};
