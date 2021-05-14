import { Recipe, Ingredient } from "utils/api/types";
import { GroceryListItem, GroceryList } from "utils/api/types";

type returnValue = {
  [index: string]: number;
};
export const groupByIngredients = (recipes: Recipe[]) => {
  const ingredients = recipes.reduce(
    (result, value) => result.concat(value.ingredients),
    [] as Ingredient[]
  );

  return ingredients.reduce((result, ingredient) => {
    result[ingredient.food.identifier] = result[ingredient.food.identifier]
      ? result[ingredient.food.identifier] + ingredient.quantity
      : ingredient.quantity;
    return result;
  }, {} as returnValue);
};

type GroupedByCategory = {
  [index: string]: GroceryListItem[];
};

export const groupByShoppingCategory = (groceryList: GroceryList) => {
  return groceryList.items.reduce(
    (result: GroupedByCategory, ingredient: GroceryListItem) => {
      if (result[ingredient.object.category]) {
        result[ingredient.object.category].push(ingredient);
      } else {
        result[ingredient.object.category] = [ingredient];
      }
      return result;
    },
    {} as GroupedByCategory
  );
};
