export interface Ingredient {
  food: Food;
  quantity: number;
}

export interface Food {
  identifier: string;
  category: string;
}

export interface Recipe {
  title: string;
  identifier: string;
  ingredients: Ingredient[];
}
