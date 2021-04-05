import { Food, Ingredient, Recipe } from "./types";
import { rdf } from "rdf-namespaces";
import {
  TITLE,
  METRIC_QUANTITY,
  INGREDIENT,
  FOOD,
  SHOPPING_CATEGORY,
} from "models/iris";
import { TripleSubject, fetchDocument } from "tripledoc";

export const foodSerializer = (food: TripleSubject): Food => {
  return {
    identifier: food.asRef().split("#")[1],
    category: food.getString(SHOPPING_CATEGORY) ?? "default",
  };
};

export const ingredientSerializer = async (
  ingredient: TripleSubject
): Promise<Ingredient> => {
  const foodRef = ingredient.getRef(FOOD);
  if (foodRef === null) {
    return {
      food: {
        identifier: "",
        category: "",
      },
      quantity: 0,
    };
  }

  const foodList = await fetchDocument(foodRef.split("#")[0]);

  return {
    food: foodSerializer(foodList.getSubject(foodRef)),
    quantity: ingredient.getInteger(METRIC_QUANTITY) ?? 0,
  };
};

export const RecipeSerializer = async (
  recipe: TripleSubject
): Promise<Recipe> => {
  const ingredientsRefs = recipe.getAllRefs(INGREDIENT);
  let ingredients: Ingredient[] = [];

  if (ingredientsRefs.length) {
    const ingredientList = await fetchDocument(ingredientsRefs[0]);
    ingredients = await Promise.all(
      ingredientsRefs.map(async (ingredientRef) => {
        const ingredient = ingredientList.getSubject(ingredientRef);
        const serialialized_ingredient = await ingredientSerializer(ingredient);
        return serialialized_ingredient;
      })
    );
  }

  const title = recipe.getString(TITLE);
  return {
    title: title ?? "",
    ingredients,
  };
};
