import React, { useState } from 'react';
import type { Meal } from '../../../types/meal';

interface MealDetailsProps {
  meal: Meal;
  onClose: () => void;
  onSave: (meal: Meal) => void;
}

const MealDetails: React.FC<MealDetailsProps> = ({ meal, onClose, onSave }) => {
  const [editedMeal, setEditedMeal] = useState<Meal>(meal);
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (field: keyof Meal, value: any) => {
    setEditedMeal(prev => ({ ...prev, [field]: value }));
  };

  const handleNutritionChange = (field: keyof Meal['nutrition'], value: number) => {
    setEditedMeal(prev => ({
      ...prev,
      nutrition: { ...prev.nutrition, [field]: value }
    }));
  };

  const handleTagChange = (index: number, value: string) => {
    const newTags = [...editedMeal.tags];
    newTags[index] = value;
    setEditedMeal(prev => ({ ...prev, tags: newTags }));
  };

  const handleAddTag = () => {
    setEditedMeal(prev => ({ ...prev, tags: [...prev.tags, ''] }));
  };

  const handleRemoveTag = (index: number) => {
    setEditedMeal(prev => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index)
    }));
  };

  const handleIngredientChange = (index: number, value: string) => {
    const newIngredients = [...editedMeal.ingredients];
    newIngredients[index] = value;
    setEditedMeal(prev => ({ ...prev, ingredients: newIngredients }));
  };

  const handleAddIngredient = () => {
    setEditedMeal(prev => ({ ...prev, ingredients: [...prev.ingredients, ''] }));
  };

  const handleRemoveIngredient = (index: number) => {
    setEditedMeal(prev => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index)
    }));
  };

  const handleInstructionChange = (index: number, value: string) => {
    const newInstructions = [...editedMeal.instructions];
    newInstructions[index] = value;
    setEditedMeal(prev => ({ ...prev, instructions: newInstructions }));
  };

  const handleAddInstruction = () => {
    setEditedMeal(prev => ({ ...prev, instructions: [...prev.instructions, ''] }));
  };

  const handleRemoveInstruction = (index: number) => {
    setEditedMeal(prev => ({
      ...prev,
      instructions: prev.instructions.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-[#E94B3C]">
              {isEditing ? 'Edit Meal' : 'Meal Details'}
            </h2>
            <div className="flex gap-2">
              {isEditing ? (
                <>
                  <button
                    onClick={() => {
                      onSave(editedMeal);
                      setIsEditing(false);
                    }}
                    className="px-4 py-2 bg-[#E94B3C] text-white rounded-lg hover:bg-[#d23e2e] transition-colors"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setEditedMeal(meal);
                      setIsEditing(false);
                    }}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 bg-[#E94B3C] text-white rounded-lg hover:bg-[#d23e2e] transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={onClose}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Close
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="space-y-6">
            {/* Basic Info */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedMeal.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full p-2 border rounded-lg"
                    />
                  ) : (
                    <p className="text-gray-900">{meal.name}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Image URL
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedMeal.imageUrl || ''}
                      onChange={(e) => handleInputChange('imageUrl', e.target.value)}
                      className="w-full p-2 border rounded-lg"
                    />
                  ) : (
                    <p className="text-gray-900">{meal.imageUrl || 'No image'}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Nutrition Info */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Nutrition Information</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(meal.nutrition).map(([key, value]) => (
                  <div key={key}>
                    <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                      {key}
                    </label>
                    {isEditing ? (
                      <input
                        type="number"
                        value={editedMeal.nutrition[key as keyof Meal['nutrition']]}
                        onChange={(e) => handleNutritionChange(key as keyof Meal['nutrition'], Number(e.target.value))}
                        className="w-full p-2 border rounded-lg"
                      />
                    ) : (
                      <p className="text-gray-900">{value}{key === 'calories' ? '' : 'g'}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold">Tags</h3>
                {isEditing && (
                  <button
                    onClick={handleAddTag}
                    className="text-[#E94B3C] hover:text-[#d23e2e]"
                  >
                    Add Tag
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {editedMeal.tags.map((tag, index) => (
                  <div key={index} className="flex items-center gap-2">
                    {isEditing ? (
                      <>
                        <input
                          type="text"
                          value={tag}
                          onChange={(e) => handleTagChange(index, e.target.value)}
                          className="px-3 py-1 border rounded-full"
                        />
                        <button
                          onClick={() => handleRemoveTag(index)}
                          className="text-red-500 hover:text-red-600"
                        >
                          ×
                        </button>
                      </>
                    ) : (
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full">
                        {tag}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Ingredients */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold">Ingredients</h3>
                {isEditing && (
                  <button
                    onClick={handleAddIngredient}
                    className="text-[#E94B3C] hover:text-[#d23e2e]"
                  >
                    Add Ingredient
                  </button>
                )}
              </div>
              <ul className="list-disc list-inside space-y-2">
                {editedMeal.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-center gap-2">
                    {isEditing ? (
                      <>
                        <input
                          type="text"
                          value={ingredient}
                          onChange={(e) => handleIngredientChange(index, e.target.value)}
                          className="flex-1 p-2 border rounded-lg"
                        />
                        <button
                          onClick={() => handleRemoveIngredient(index)}
                          className="text-red-500 hover:text-red-600"
                        >
                          ×
                        </button>
                      </>
                    ) : (
                      <span className="text-gray-900">{ingredient}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Instructions */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold">Instructions</h3>
                {isEditing && (
                  <button
                    onClick={handleAddInstruction}
                    className="text-[#E94B3C] hover:text-[#d23e2e]"
                  >
                    Add Step
                  </button>
                )}
              </div>
              <ol className="list-decimal list-inside space-y-2">
                {editedMeal.instructions.map((instruction, index) => (
                  <li key={index} className="flex items-start gap-2">
                    {isEditing ? (
                      <>
                        <textarea
                          value={instruction}
                          onChange={(e) => handleInstructionChange(index, e.target.value)}
                          className="flex-1 p-2 border rounded-lg"
                          rows={2}
                        />
                        <button
                          onClick={() => handleRemoveInstruction(index)}
                          className="text-red-500 hover:text-red-600 mt-2"
                        >
                          ×
                        </button>
                      </>
                    ) : (
                      <span className="text-gray-900">{instruction}</span>
                    )}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealDetails; 