import type { Meal } from '../types/meal';

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
      '200g chicken breast',
      '2 cups mixed greens',
      '1/4 cup cherry tomatoes',
      '1/4 cucumber',
      '2 tbsp olive oil',
      '1 tbsp balsamic vinegar'
    ],
    instructions: [
      'Grill the chicken breast until cooked through',
      'Chop vegetables and combine in a bowl',
      'Slice chicken and add to salad',
      'Drizzle with olive oil and balsamic vinegar'
    ],
    prepTime: 15,
    cookTime: 20,
    imageUrl: '/assets/meals/chicken-salad.jpg'
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
      '2 cups mixed vegetables',
      '1 cup tofu',
      '2 tbsp soy sauce',
      '1 tbsp sesame oil',
      '2 cloves garlic',
      '1 tbsp ginger'
    ],
    instructions: [
      'Cut vegetables into bite-sized pieces',
      'Heat oil in a wok or large pan',
      'Stir-fry vegetables until crisp-tender',
      'Add tofu and sauce, cook for 2 more minutes'
    ],
    prepTime: 10,
    cookTime: 15,
    imageUrl: '/assets/meals/stir-fry.jpg'
  }
]; 