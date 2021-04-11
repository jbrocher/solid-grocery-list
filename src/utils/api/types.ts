export interface Ingredient {
  food: Food;
  identifier: string;
  quantity: number;
}

export interface Food {
  identifier: string;
  name: string;
  category: string;
}

export interface Recipe {
  title: string;
  identifier: string;
  ingredients: Ingredient[];
}
