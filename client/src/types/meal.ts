export interface NutritionInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface Ingredient {
  id: string;
  name: string;
  nutrition: NutritionInfo; // per 100g
}

export interface SelectedIngredient {
  ingredient: Ingredient;
  grams: number;
}

export interface MealData {
  name: string;
  ingredients: SelectedIngredient[];
  instructions: string;
  prepTime: number;
  cookTime: number;
  tags: string[];
}

export interface Meal {
  id: string;
  name: string;
  ingredients: string[];
  instructions: string[];
  prepTime: number;
  cookTime: number;
  tags: string[];
  nutrition: NutritionInfo;
  imageUrl?: string;
}

export interface MealFilters {
  searchTerm: string;
  tags: string[];
  nutritionRange: {
    calories: [number, number];
    protein: [number, number];
    carbs: [number, number];
    fat: [number, number];
  };
} 