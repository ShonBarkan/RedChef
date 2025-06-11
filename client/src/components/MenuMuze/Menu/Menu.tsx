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
  const [isAdvancedFiltersOpen, setIsAdvancedFiltersOpen] = useState(false);
  const [tagSearchTerm, setTagSearchTerm] = useState('');
  const [isTagFilterAnd, setIsTagFilterAnd] = useState(false);

  // Update meals when mealData changes
  React.useEffect(() => {
    if (mealData) {
      // Convert mealData to Meal type and add to meals
      const newMeal: Meal = {
        id: Date.now().toString(), // Generate a unique ID
        name: mealData.name,
        ingredients: mealData.ingredients,
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
    const matchesTags = filters.tags.length === 0 || (
      isTagFilterAnd
        ? filters.tags.every((tag: string) => meal.tags.includes(tag))
        : filters.tags.some((tag: string) => meal.tags.includes(tag))
    );
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
    <div className="w-full max-w-5xl mx-auto p-6 bg-[rgba(255,248,249,0.96)] rounded-xl shadow-md">
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

        {/* Advanced Filters Toggle */}
        <button
          onClick={() => setIsAdvancedFiltersOpen(!isAdvancedFiltersOpen)}
          className="flex items-center gap-2 text-[#E94B3C] font-medium mb-4"
        >
          <span>{isAdvancedFiltersOpen ? '▼' : ''}</span>
          Advanced Filters
        </button>

        {/* Advanced Filters Section */}
        {isAdvancedFiltersOpen && (
          <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
            {/* Tag Search and Filter */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <input
                  type="text"
                  placeholder="Search tags..."
                  className="w-full p-2 border border-gray-300 rounded-lg mr-3"
                  value={tagSearchTerm}
                  onChange={(e) => setTagSearchTerm(e.target.value)}
                />
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Filter mode:</span>
                  <button
                    onClick={() => setIsTagFilterAnd(!isTagFilterAnd)}
                    className={`px-3 py-1 rounded text-sm ${
                      isTagFilterAnd
                        ? 'bg-[#E94B3C] text-white'
                        : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {isTagFilterAnd ? 'AND' : 'OR'}
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {Array.from(new Set(meals.flatMap(meal => meal.tags)))
                  .filter(tag => tag.toLowerCase().includes(tagSearchTerm.toLowerCase()))
                  .map(tag => (
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
            </div>

            {/* Nutrition Range Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {Object.entries(filters.nutritionRange).map(([nutrient, [min, max]]) => (
                <div key={nutrient} className="flex flex-col">
                  <label className="text-sm font-medium mb-1 capitalize">{nutrient}</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={min}
                      onChange={(e) => {
                        const newMin = Number(e.target.value);
                        if (newMin <= max) {
                          handleNutritionRangeChange(
                            nutrient as keyof MealFilters['nutritionRange'],
                            [newMin, max]
                          );
                        }
                      }}
                      className="w-20 p-1 border rounded"
                    />
                    <span>-</span>
                    <input
                      type="number"
                      value={max}
                      onChange={(e) => {
                        const newMax = Number(e.target.value);
                        if (newMax >= min) {
                          handleNutritionRangeChange(
                            nutrient as keyof MealFilters['nutritionRange'],
                            [min, newMax]
                          );
                        }
                      }}
                      className="w-20 p-1 border rounded"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
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