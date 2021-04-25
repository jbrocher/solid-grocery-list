import { Recipe, Ingredient } from "utils/api/types";

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
