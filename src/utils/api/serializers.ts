import { Food, Ingredient, Recipe } from "./types";
import { useCallback } from "react";
import {
  TITLE,
  METRIC_QUANTITY,
  INGREDIENT,
  FOOD,
  FOOD_NAME,
  SHOPPING_CATEGORY,
} from "models/iris";
import { TripleSubject } from "tripledoc";
import { useIngredients } from "utils/api/hooks/ingredients";
import { useFoods } from "utils/api/hooks/food";

export const foodSerializer = (food: TripleSubject): Food => {
  return {
    identifier: food.asRef().split("#")[1],
    name: food.getString(FOOD_NAME) ?? "",
    category: food.getString(SHOPPING_CATEGORY) ?? "default",
  };
};

export const useIngredientSerializer = () => {
  const foods = useFoods();
  const ingredientSerializer = useCallback(
    (ingredient: TripleSubject): Ingredient => {
      const foodRef = ingredient.getRef(FOOD);
      if (foods === null || foodRef === null) {
        throw new Error("no foods");
      }

      return {
        food: foodSerializer(foods.getSubject(foodRef)),
        identifier: ingredient.asRef().split("#")[1],
        quantity: ingredient.getInteger(METRIC_QUANTITY) ?? 0,
      };
    },
    [foods]
  );

  const ready = foods !== null;
  return {
    ready,
    ingredientSerializer,
  };
};

export const useRecipeSerializer = () => {
  const ingredients = useIngredients();
  const {
    ready: readyIngredientSerializer,
    ingredientSerializer,
  } = useIngredientSerializer();

  const recipeSerializer = useCallback(
    (recipe: TripleSubject): Recipe => {
      if (ingredients === null) {
        throw new Error("no ingredients");
      }
      const ingredientsRefs = recipe.getAllRefs(INGREDIENT);
      let ingredientList: Ingredient[] = [];

      if (ingredientsRefs.length) {
        ingredientList = ingredientsRefs.map((ingredientRef) => {
          const ingredient = ingredients.getSubject(ingredientRef);
          const serialialized_ingredient = ingredientSerializer(ingredient);
          return serialialized_ingredient;
        });
      }

      const title = recipe.getString(TITLE);
      return {
        title: title ?? "",
        identifier: recipe.asRef().split("#")[1],
        ingredients: ingredientList,
      };
    },
    [ingredients, ingredientSerializer]
  );

  const ready = ingredients !== null && readyIngredientSerializer;
  return { ready, recipeSerializer };
};
