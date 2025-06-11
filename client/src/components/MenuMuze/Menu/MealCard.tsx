import React from 'react';
import type { Meal } from '../../../types/meal';

interface MealCardProps {
  meal: Meal;
  onRemove: () => void;
  onViewDetails: () => void;
}

const MealCard: React.FC<MealCardProps> = ({ meal, onRemove, onViewDetails }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {meal.imageUrl && (
        <img
          src={meal.imageUrl}
          alt={meal.name}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold text-gray-800">{meal.name}</h3>
          <div className="flex gap-2">
            <button
              onClick={onViewDetails}
              className="text-gray-600 hover:text-[#E94B3C] transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
              </svg>
            </button>
            <button
              onClick={onRemove}
              className="text-gray-600 hover:text-red-500 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {meal.tags.map(tag => (
            <span
              key={tag}
              className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Ingredients Preview */}
        <div className="mb-3">
          <p className="text-sm text-gray-600 mb-1">Ingredients:</p>
          <div className="text-sm text-gray-800">
            {meal.ingredients.slice(0, 3).map((ing, index) => (
              <span key={index}>
                {ing.ingredient.name} ({ing.grams}g)
                {index < Math.min(2, meal.ingredients.length - 1) ? ', ' : ''}
              </span>
            ))}
            {meal.ingredients.length > 3 && '...'}
          </div>
        </div>

        {/* Nutrition Info */}
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Calories:</span>
            <span className="font-medium">{meal.nutrition.calories}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Protein:</span>
            <span className="font-medium">{meal.nutrition.protein}g</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Carbs:</span>
            <span className="font-medium">{meal.nutrition.carbs}g</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Fat:</span>
            <span className="font-medium">{meal.nutrition.fat}g</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealCard; 