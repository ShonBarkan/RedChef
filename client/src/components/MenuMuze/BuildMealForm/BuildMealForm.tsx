import React, { useState } from 'react';
import { useMenuMuze } from '../MenuMuzeContext';

interface NutritionInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface Ingredient {
  id: string;
  name: string;
  nutrition: NutritionInfo; // per 100g
}

interface SelectedIngredient {
  ingredient: Ingredient;
  grams: number;
}

interface MealData {
  name: string;
  ingredients: SelectedIngredient[];
  instructions: string;
  prepTime: number;
  cookTime: number;
  tags: string[];
}

// Sample ingredients data - nutrition values per 100g
const SAMPLE_INGREDIENTS: Ingredient[] = [
  {
    id: '1',
    name: 'Chicken Breast',
    nutrition: { calories: 165, protein: 31, carbs: 0, fat: 3.6 }
  },
  {
    id: '2',
    name: 'Brown Rice',
    nutrition: { calories: 216, protein: 4.5, carbs: 45, fat: 1.8 }
  },
  {
    id: '3',
    name: 'Broccoli',
    nutrition: { calories: 34, protein: 2.8, carbs: 6.6, fat: 0.4 }
  },
  // Add more ingredients as needed
];

const BuildMealForm: React.FC = () => {
  const { setMealData, setIsLoading, setError } = useMenuMuze();
  const [formData, setFormData] = useState<MealData>({
    name: '',
    ingredients: [],
    instructions: '',
    prepTime: 0,
    cookTime: 0,
    tags: []
  });

  const [newTag, setNewTag] = useState('');
  const [selectedIngredientId, setSelectedIngredientId] = useState('');
  const [grams, setGrams] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleIngredientSelect = (ingredientId: string) => {
    setSelectedIngredientId(ingredientId);
  };

  const handleGramsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGrams(e.target.value);
  };

  const addIngredient = () => {
    if (selectedIngredientId && grams) {
      const selectedIngredient = SAMPLE_INGREDIENTS.find(ing => ing.id === selectedIngredientId);
      if (selectedIngredient) {
        setFormData(prev => ({
          ...prev,
          ingredients: [...prev.ingredients, {
            ingredient: selectedIngredient,
            grams: Number(grams)
          }]
        }));
        // Reset selection
        setSelectedIngredientId('');
        setGrams('');
      }
    }
  };

  const removeIngredient = (index: number) => {
    setFormData(prev => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index)
    }));
  };

  const handleTagInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTag(e.target.value);
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleKeyDown = (e: React.KeyboardEvent, action: 'addTag' | 'addIngredient' | 'submit') => {
    if (e.key === 'Enter') {
      e.preventDefault();
      switch (action) {
        case 'addTag':
          addTag();
          break;
        case 'addIngredient':
          addIngredient();
          break;
        case 'submit':
          handleSubmit(e as any);
          break;
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setError(null);
      // Here you would typically make an API call to save the meal
      setMealData(formData);
      // Reset form after successful submission
      setFormData({
        name: '',
        ingredients: [],
        instructions: '',
        prepTime: 0,
        cookTime: 0,
        tags: []
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while saving the meal');
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate nutrition values based on grams
  const calculateNutrition = (nutrition: NutritionInfo, grams: number): NutritionInfo => ({
    calories: Math.round((nutrition.calories * grams) / 100),
    protein: Math.round((nutrition.protein * grams) / 100 * 10) / 10,
    carbs: Math.round((nutrition.carbs * grams) / 100 * 10) / 10,
    fat: Math.round((nutrition.fat * grams) / 100 * 10) / 10
  });

  // Calculate total nutrition values
  const totalNutrition = formData.ingredients.reduce((acc, { ingredient, grams }) => {
    const nutrition = calculateNutrition(ingredient.nutrition, grams);
    return {
      calories: acc.calories + nutrition.calories,
      protein: acc.protein + nutrition.protein,
      carbs: acc.carbs + nutrition.carbs,
      fat: acc.fat + nutrition.fat
    };
  }, { calories: 0, protein: 0, carbs: 0, fat: 0 });

  return (
    <form 
      onSubmit={handleSubmit} 
      className="w-full max-w-3xl mx-auto p-6 bg-[rgba(255,248,249,0.96)] rounded-xl shadow-md"
    >
      <h2 className="text-3xl font-extrabold text-[#E94B3C] mb-6 font-poppins">Build Your Meal</h2>
      
      <div className="space-y-6">
        {/* Meal Name */}
        <div>
          <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Meal Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#E94B3C] focus:border-transparent"
            required
          />
        </div>

        {/* Ingredients */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Ingredients</label>
          <div className="flex gap-2 mb-4">
            <select
              value={selectedIngredientId}
              onChange={(e) => handleIngredientSelect(e.target.value)}
              className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#E94B3C] focus:border-transparent"
            >
              <option value="">Select an ingredient</option>
              {SAMPLE_INGREDIENTS.map(ing => (
                <option key={ing.id} value={ing.id}>
                  {ing.name}
                </option>
              ))}
            </select>
            <input
              type="number"
              value={grams}
              onChange={handleGramsChange}
              onKeyDown={(e) => handleKeyDown(e, 'addIngredient')}
              placeholder="Grams"
              className="w-32 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#E94B3C] focus:border-transparent"
              min="0"
            />
            <button
              type="button"
              onClick={addIngredient}
              className="px-4 py-2 bg-[#E94B3C] text-white rounded-lg hover:bg-[#d23e2e]"
            >
              Add
            </button>
          </div>

          <div className="space-y-2">
            {formData.ingredients.map(({ ingredient, grams }, index) => {
              const nutrition = calculateNutrition(ingredient.nutrition, grams);
              return (
                <div key={index} className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm">
                  <div>
                    <span className="font-semibold">{ingredient.name}</span>
                    <span className="text-sm text-gray-600 ml-2">
                      {grams}g - {nutrition.calories} cal, {nutrition.protein}g protein
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeIngredient(index)}
                    className="text-[#E94B3C] hover:bg-red-50 px-2 py-1 rounded"
                  >
                    Remove
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Tags</label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={newTag}
              onChange={handleTagInput}
              onKeyDown={(e) => handleKeyDown(e, 'addTag')}
              className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#E94B3C] focus:border-transparent"
              placeholder="Add a tag"
            />
            <button
              type="button"
              onClick={addTag}
              className="px-4 py-2 bg-[#E94B3C] text-white rounded-lg hover:bg-[#d23e2e]"
            >
              Add Tag
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-[#E94B3C] text-white px-3 py-1 rounded-full text-sm flex items-center gap-1"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="hover:text-gray-200"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div>
          <label htmlFor="instructions" className="block text-gray-700 font-semibold mb-2">Instructions</label>
          <textarea
            id="instructions"
            name="instructions"
            value={formData.instructions}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#E94B3C] focus:border-transparent h-32"
            required
          />
        </div>

        {/* AI Generation Buttons */}
        <div className="flex gap-4 justify-center">
          <button
            type="button"
            className="flex-1 bg-[#E94B3C] text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-[#d23e2e] transition-all flex items-center justify-center gap-2"
          >
            <span className="text-lg">🤖</span>
            AI Generate with Ingredients
          </button>
          <button
            type="button"
            className="flex-1 bg-[#E94B3C] text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-[#d23e2e] transition-all flex items-center justify-center gap-2"
          >
            <span className="text-lg">🤖</span>
            AI Generate with Tags & Instructions
          </button>
        </div>

        {/* Time and Servings */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="prepTime" className="block text-gray-700 font-semibold mb-2">Prep Time (minutes)</label>
            <input
              type="number"
              id="prepTime"
              name="prepTime"
              value={formData.prepTime}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#E94B3C] focus:border-transparent"
              min="0"
              required
            />
          </div>
          <div>
            <label htmlFor="cookTime" className="block text-gray-700 font-semibold mb-2">Cook Time (minutes)</label>
            <input
              type="number"
              id="cookTime"
              name="cookTime"
              value={formData.cookTime}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#E94B3C] focus:border-transparent"
              min="0"
              required
            />
          </div>
        </div>

        {/* Nutrition Summary */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Nutrition Values</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <span className="text-sm text-gray-600">Calories</span>
              <p className="font-semibold">{totalNutrition.calories} cal</p>
            </div>
            <div>
              <span className="text-sm text-gray-600">Protein</span>
              <p className="font-semibold">{totalNutrition.protein}g</p>
            </div>
            <div>
              <span className="text-sm text-gray-600">Carbs</span>
              <p className="font-semibold">{totalNutrition.carbs}g</p>
            </div>
            <div>
              <span className="text-sm text-gray-600">Fat</span>
              <p className="font-semibold">{totalNutrition.fat}g</p>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          onKeyDown={(e) => handleKeyDown(e, 'submit')}
          className="w-full bg-[#E94B3C] text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-[#d23e2e] transition-all"
        >
          Create Meal
        </button>
      </div>
    </form>
  );
};

export default BuildMealForm; 