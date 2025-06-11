import type { Meal, SelectedIngredient, Ingredient } from '../types/meal';

// Define base ingredients with their nutrition info per 100g
const baseIngredients: Record<string, Ingredient> = {
  chickenBreast: {
    id: 'chicken-1',
    name: 'Chicken Breast',
    nutrition: {
      calories: 165,
      protein: 31,
      carbs: 0,
      fat: 3.6
    }
  },
  mixedGreens: {
    id: 'greens-1',
    name: 'Mixed Greens',
    nutrition: {
      calories: 20,
      protein: 1.5,
      carbs: 3.5,
      fat: 0.2
    }
  },
  cherryTomatoes: {
    id: 'tomato-1',
    name: 'Cherry Tomatoes',
    nutrition: {
      calories: 18,
      protein: 0.9,
      carbs: 3.9,
      fat: 0.2
    }
  },
  cucumber: {
    id: 'cucumber-1',
    name: 'Cucumber',
    nutrition: {
      calories: 15,
      protein: 0.7,
      carbs: 3.6,
      fat: 0.1
    }
  },
  oliveOil: {
    id: 'oil-1',
    name: 'Olive Oil',
    nutrition: {
      calories: 884,
      protein: 0,
      carbs: 0,
      fat: 100
    }
  },
  balsamicVinegar: {
    id: 'vinegar-1',
    name: 'Balsamic Vinegar',
    nutrition: {
      calories: 88,
      protein: 0.5,
      carbs: 17,
      fat: 0
    }
  },
  mixedVegetables: {
    id: 'veg-1',
    name: 'Mixed Vegetables',
    nutrition: {
      calories: 65,
      protein: 3,
      carbs: 12,
      fat: 0.3
    }
  },
  tofu: {
    id: 'tofu-1',
    name: 'Tofu',
    nutrition: {
      calories: 76,
      protein: 8,
      carbs: 1.9,
      fat: 4.8
    }
  },
  soySauce: {
    id: 'soy-1',
    name: 'Soy Sauce',
    nutrition: {
      calories: 53,
      protein: 8,
      carbs: 5,
      fat: 0.1
    }
  },
  sesameOil: {
    id: 'sesame-1',
    name: 'Sesame Oil',
    nutrition: {
      calories: 884,
      protein: 0,
      carbs: 0,
      fat: 100
    }
  },
  garlic: {
    id: 'garlic-1',
    name: 'Garlic',
    nutrition: {
      calories: 149,
      protein: 6.4,
      carbs: 33.1,
      fat: 0.5
    }
  },
  ginger: {
    id: 'ginger-1',
    name: 'Ginger',
    nutrition: {
      calories: 80,
      protein: 1.8,
      carbs: 17.8,
      fat: 0.8
    }
  }
};

export const mockMeals: Meal[] = [
  {
    id: '1',
    name: 'Grilled Chicken Salad',
    tags: ['healthy', 'high-protein', 'low-carb'],
    nutrition: {
      calories: 350,
      protein: 35,
      carbs: 15,
      fat: 18
    },
    ingredients: [
      { ingredient: baseIngredients.chickenBreast, grams: 200 },
      { ingredient: baseIngredients.mixedGreens, grams: 100 },
      { ingredient: baseIngredients.cherryTomatoes, grams: 50 },
      { ingredient: baseIngredients.cucumber, grams: 100 },
      { ingredient: baseIngredients.oliveOil, grams: 30 },
      { ingredient: baseIngredients.balsamicVinegar, grams: 15 }
    ],
    instructions: [
      'Grill the chicken breast until cooked through',
      'Chop vegetables and combine in a bowl',
      'Slice chicken and add to salad',
      'Drizzle with olive oil and balsamic vinegar'
    ],
    prepTime: 15,
    cookTime: 20,
    imageUrl: 'https://www.dinneratthezoo.com/wp-content/uploads/2020/12/grilled-chicken-salad-4.jpg'
  },
  {
    id: '2',
    name: 'Vegetable Stir Fry',
    tags: ['vegetarian', 'quick', 'asian'],
    nutrition: {
      calories: 280,
      protein: 12,
      carbs: 45,
      fat: 8
    },
    ingredients: [
      { ingredient: baseIngredients.mixedVegetables, grams: 300 },
      { ingredient: baseIngredients.tofu, grams: 200 },
      { ingredient: baseIngredients.soySauce, grams: 30 },
      { ingredient: baseIngredients.sesameOil, grams: 15 },
      { ingredient: baseIngredients.garlic, grams: 10 },
      { ingredient: baseIngredients.ginger, grams: 15 }
    ],
    instructions: [
      'Cut vegetables into bite-sized pieces',
      'Heat oil in a wok or large pan',
      'Stir-fry vegetables until crisp-tender',
      'Add tofu and sauce, cook for 2 more minutes'
    ],
    prepTime: 10,
    cookTime: 15,
    imageUrl: 'https://cdn.loveandlemons.com/wp-content/uploads/2025/02/stir-fry-recipe.jpg'
  },
  {
    id: '3',
    name: 'Mediterranean Quinoa Bowl',
    tags: ['vegetarian', 'mediterranean', 'healthy'],
    nutrition: {
      calories: 420,
      protein: 15,
      carbs: 65,
      fat: 12
    },
    ingredients: [
      { ingredient: baseIngredients.mixedGreens, grams: 100 },
      { ingredient: baseIngredients.cherryTomatoes, grams: 75 },
      { ingredient: baseIngredients.cucumber, grams: 100 },
      { ingredient: baseIngredients.oliveOil, grams: 20 },
      { ingredient: baseIngredients.garlic, grams: 5 }
    ],
    instructions: [
      'Cook quinoa according to package instructions',
      'Chop vegetables into bite-sized pieces',
      'Combine quinoa and vegetables in a bowl',
      'Drizzle with olive oil and season with garlic'
    ],
    prepTime: 15,
    cookTime: 20,
    imageUrl: 'https://thealmondeater.com/wp-content/uploads/2022/06/mediterranean-quinoa-bowl_web-3.jpg'
  },
  {
    id: '4',
    name: 'Spicy Tofu Tacos',
    tags: ['vegan', 'mexican', 'spicy'],
    nutrition: {
      calories: 380,
      protein: 18,
      carbs: 45,
      fat: 15
    },
    ingredients: [
      { ingredient: baseIngredients.tofu, grams: 250 },
      { ingredient: baseIngredients.mixedVegetables, grams: 150 },
      { ingredient: baseIngredients.garlic, grams: 10 },
      { ingredient: baseIngredients.ginger, grams: 10 },
      { ingredient: baseIngredients.sesameOil, grams: 15 }
    ],
    instructions: [
      'Press and cube tofu',
      'Stir-fry tofu with vegetables',
      'Add garlic and ginger for flavor',
      'Serve in warm tortillas with toppings'
    ],
    prepTime: 20,
    cookTime: 15,
    imageUrl: 'https://createmindfully.com/wp-content/uploads/2018/12/tofu-tacos-close-up-500x500.jpg'
  },
  {
    id: '5',
    name: 'Asian Chicken Noodle Soup',
    tags: ['soup', 'asian', 'comfort-food'],
    nutrition: {
      calories: 320,
      protein: 25,
      carbs: 40,
      fat: 8
    },
    ingredients: [
      { ingredient: baseIngredients.chickenBreast, grams: 150 },
      { ingredient: baseIngredients.mixedVegetables, grams: 200 },
      { ingredient: baseIngredients.garlic, grams: 15 },
      { ingredient: baseIngredients.ginger, grams: 20 },
      { ingredient: baseIngredients.soySauce, grams: 30 }
    ],
    instructions: [
      'Simmer chicken in broth until cooked',
      'Add vegetables and seasonings',
      'Cook noodles separately',
      'Combine and serve hot'
    ],
    prepTime: 15,
    cookTime: 25,
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUBnNsNG52p6VYx54emUAMgTAkbpnCNOZ41Q&s'
  },
  {
    id: '6',
    name: 'Greek Salad Wrap',
    tags: ['mediterranean', 'quick', 'lunch'],
    nutrition: {
      calories: 450,
      protein: 20,
      carbs: 55,
      fat: 22
    },
    ingredients: [
      { ingredient: baseIngredients.mixedGreens, grams: 100 },
      { ingredient: baseIngredients.cherryTomatoes, grams: 75 },
      { ingredient: baseIngredients.cucumber, grams: 100 },
      { ingredient: baseIngredients.oliveOil, grams: 25 },
      { ingredient: baseIngredients.balsamicVinegar, grams: 15 }
    ],
    instructions: [
      'Combine all vegetables in a bowl',
      'Dress with olive oil and vinegar',
      'Wrap in a large tortilla',
      'Cut in half and serve'
    ],
    prepTime: 10,
    cookTime: 0,
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqlJp944Z11N21M0eXZJA3ujAI__dixIXR3Q&s'
  },
  {
    id: '7',
    name: 'Vegetable Curry',
    tags: ['vegetarian', 'indian', 'spicy'],
    nutrition: {
      calories: 380,
      protein: 12,
      carbs: 55,
      fat: 15
    },
    ingredients: [
      { ingredient: baseIngredients.mixedVegetables, grams: 400 },
      { ingredient: baseIngredients.tofu, grams: 200 },
      { ingredient: baseIngredients.garlic, grams: 15 },
      { ingredient: baseIngredients.ginger, grams: 20 },
      { ingredient: baseIngredients.sesameOil, grams: 20 }
    ],
    instructions: [
      'Sauté vegetables until tender',
      'Add curry paste and coconut milk',
      'Simmer until vegetables are cooked',
      'Serve with rice or naan bread'
    ],
    prepTime: 20,
    cookTime: 30,
    imageUrl: 'https://shwetainthekitchen.com/wp-content/uploads/2023/03/mixed-vegetable-curry.jpg'
  }
]; 