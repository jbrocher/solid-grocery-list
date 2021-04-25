import {
  Food,
  Ingredient,
  Recipe,
  GroceryListItem,
  GroceryList,
} from "./types";
import { rdfs } from "rdf-namespaces";
import {
  groceryListItemObject,
  groceryListItemDone,
  QUANTITY,
  TITLE,
  METRIC_QUANTITY,
  INGREDIENT,
  FOOD,
  FOOD_NAME,
  SHOPPING_CATEGORY,
} from "models/iris";
import { TripleDocument, TripleSubject } from "tripledoc";

export const foodSerializer = (food: TripleSubject): Food => {
  return {
    identifier: food.asRef().split("#")[1],
    name: food.getString(FOOD_NAME) ?? "",
    category: food.getString(SHOPPING_CATEGORY) ?? "default",
  };
};
export const ingredientSerializer = (
  ingredient: TripleSubject,
  foods: TripleDocument
): Ingredient => {
  const foodRef = ingredient.getRef(FOOD);
  if (!foods || foodRef === null) {
    throw new Error("no foods");
  }

  return {
    food: foodSerializer(foods.getSubject(foodRef)),
    identifier: ingredient.asRef().split("#")[1],
    quantity: ingredient.getInteger(METRIC_QUANTITY) ?? 0,
  };
};

export const recipeSerializer = (
  recipe: TripleSubject,
  ingredients: TripleDocument,
  foods: TripleDocument
): Recipe => {
  if (!ingredients) {
    throw new Error("no ingredients");
  }
  const ingredientsRefs = recipe.getAllRefs(INGREDIENT);
  let ingredientList: Ingredient[] = [];

  if (ingredientsRefs.length) {
    ingredientList = ingredientsRefs.map((ingredientRef) => {
      const ingredient = ingredients.getSubject(ingredientRef);

      const serialialized_ingredient = ingredientSerializer(ingredient, foods);
      return serialialized_ingredient;
    });
  }

  const title = recipe.getString(TITLE);
  return {
    title: title ?? "",
    identifier: recipe.asRef().split("#")[1],
    ingredients: ingredientList,
  };
};

export const groceryListItemSerializer = (
  groceryListItem: TripleSubject,
  foods: TripleDocument
): GroceryListItem => {
  // If we allow groceryList as object we must determine the type here
  const foodRef = groceryListItem.getRef(groceryListItemObject);
  if (!foodRef) {
    throw new Error("No foodRef");
  }
  const food = foods.getSubject(foodRef);

  return {
    object: foodSerializer(food),
    done: groceryListItem.getString(groceryListItemDone) === "true",
    quantity: groceryListItem.getInteger(QUANTITY) ?? 0,
  };
};

export const groceryListSerializer = (
  groceryList: TripleSubject,
  groceryListItems: TripleDocument,
  foods: TripleDocument
): GroceryList => {
  const groceryListItemsRefs = groceryList.getAllRefs(rdfs.member);

  const groceryListItemsList = groceryListItemsRefs.map((ref) => {
    const groceryListItem = groceryListItems.getSubject(ref);
    return groceryListItemSerializer(groceryListItem, foods);
  });
  return {
    title: groceryList.getString(rdfs.label) ?? "",
    identifier: groceryList.asRef().split("#")[1],
    items: groceryListItemsList,
  };
};
