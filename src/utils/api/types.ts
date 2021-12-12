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

export interface RecipeFormValues {
  title: string;
  ingredients: Ingredient[];
}

export interface GroceryListItem {
  object: Food;
  done: boolean;
  identifier: string;
  quantity: number;
}

export interface GroceryList {
  title: string;
  identifier: string;
  items: GroceryListItem[];
}
