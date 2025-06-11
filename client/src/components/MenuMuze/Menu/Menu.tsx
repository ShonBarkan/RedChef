import React, { useState } from 'react';
import { mockMeals } from '../../../data/mockMeals';
import type { Meal, MealFilters, MealData, SelectedIngredient } from '../../../types/meal';
import MealCard from './MealCard';
import MealDetails from './MealDetails';
import { useMenuMuze } from '../MenuMuzeContext';

const Menu: React.FC = () => {
  const { mealData, setMealData } = useMenuMuze();
  const [meals, setMeals] = useState<Meal[]>(mockMeals);
  const [filters, setFilters] = useState<MealFilters>({
    searchTerm: '',
    tags: [],
    nutritionRange: {
      calories: [0, 1000],
      protein: [0, 100],
      carbs: [0, 100],
      fat: [0, 100]
    }
  });
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);

  // Update meals when mealData changes
  React.useEffect(() => {
    if (mealData) {
      // Convert mealData to Meal type and add to meals
      const newMeal: Meal = {
        id: Date.now().toString(), // Generate a unique ID
        name: mealData.name,
        ingredients: mealData.ingredients.map((ing: SelectedIngredient) => `${ing.ingredient.name} (${ing.grams}g)`),
        instructions: [mealData.instructions],
        prepTime: mealData.prepTime,
        cookTime: mealData.cookTime,
        tags: mealData.tags,
        nutrition: mealData.ingredients.reduce((acc: { calories: number; protein: number; carbs: number; fat: number }, { ingredient, grams }: SelectedIngredient) => ({
          calories: acc.calories + Math.round((ingredient.nutrition.calories * grams) / 100),
          protein: acc.protein + Math.round((ingredient.nutrition.protein * grams) / 100 * 10) / 10,
          carbs: acc.carbs + Math.round((ingredient.nutrition.carbs * grams) / 100 * 10) / 10,
          fat: acc.fat + Math.round((ingredient.nutrition.fat * grams) / 100 * 10) / 10
        }), { calories: 0, protein: 0, carbs: 0, fat: 0 })
      };
      setMeals((prev: Meal[]) => [...prev, newMeal]);
      setMealData(null as unknown as MealData); // Reset mealData after adding to meals
    }
  }, [mealData, setMealData]);

  const handleSearch = (searchTerm: string) => {
    setFilters((prev: MealFilters) => ({ ...prev, searchTerm }));
  };

  const handleTagFilter = (tag: string) => {
    setFilters((prev: MealFilters) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t: string) => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  const handleNutritionRangeChange = (nutrient: keyof MealFilters['nutritionRange'], value: [number, number]) => {
    setFilters((prev: MealFilters) => ({
      ...prev,
      nutritionRange: {
        ...prev.nutritionRange,
        [nutrient]: value
      }
    }));
  };

  const filteredMeals = meals.filter(meal => {
    const matchesSearch = meal.name.toLowerCase().includes(filters.searchTerm.toLowerCase());
    const matchesTags = filters.tags.length === 0 || filters.tags.some((tag: string) => meal.tags.includes(tag));
    const matchesNutrition = Object.entries(filters.nutritionRange).every(([key, [min, max]]) => {
      const value = meal.nutrition[key as keyof typeof meal.nutrition];
      return value >= min && value <= max;
    });

    return matchesSearch && matchesTags && matchesNutrition;
  });

  const handleRemoveMeal = (mealId: string) => {
    setMeals((prev: Meal[]) => prev.filter(meal => meal.id !== mealId));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#E94B3C] mb-4">Menu</h1>
        
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search meals..."
          className="w-full p-2 border border-gray-300 rounded-lg mb-4"
          value={filters.searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
        />

        {/* Tags Filter */}
        <div className="flex flex-wrap gap-2 mb-4">
          {Array.from(new Set(meals.flatMap(meal => meal.tags))).map(tag => (
            <button
              key={tag}
              onClick={() => handleTagFilter(tag)}
              className={`px-3 py-1 rounded-full text-sm ${
                filters.tags.includes(tag)
                  ? 'bg-[#E94B3C] text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Nutrition Range Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {Object.entries(filters.nutritionRange).map(([nutrient, [min, max]]) => (
            <div key={nutrient} className="flex flex-col">
              <label className="text-sm font-medium mb-1 capitalize">{nutrient}</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={min}
                  onChange={(e) => handleNutritionRangeChange(nutrient as keyof MealFilters['nutritionRange'], [Number(e.target.value), max])}
                  className="w-20 p-1 border rounded"
                />
                <span>-</span>
                <input
                  type="number"
                  value={max}
                  onChange={(e) => handleNutritionRangeChange(nutrient as keyof MealFilters['nutritionRange'], [min, Number(e.target.value)])}
                  className="w-20 p-1 border rounded"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Meal Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMeals.map((meal: Meal) => (
          <MealCard
            key={meal.id}
            meal={meal}
            onRemove={() => handleRemoveMeal(meal.id)}
            onViewDetails={() => setSelectedMeal(meal)}
          />
        ))}
      </div>

      {/* Meal Details Modal */}
      {selectedMeal && (
        <MealDetails
          meal={selectedMeal}
          onClose={() => setSelectedMeal(null)}
          onSave={(updatedMeal: Meal) => {
            setMeals((prev: Meal[]) => prev.map(meal => meal.id === updatedMeal.id ? updatedMeal : meal));
            setSelectedMeal(null);
          }}
        />
      )}
    </div>
  );
};

export default Menu; 