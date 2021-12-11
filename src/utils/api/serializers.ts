import {
  SolidDataset,
  Thing,
  ThingPersisted,
  asUrl,
  getInteger,
  getStringNoLocale,
  getThing,
  getUrl,
  getUrlAll,
} from "@inrupt/solid-client";
import {
  FOOD,
  FOOD_NAME,
  INGREDIENT,
  METRIC_QUANTITY,
  QUANTITY,
  SHOPPING_CATEGORY,
  TITLE,
  groceryListItemDone,
  groceryListItemObject,
} from "models/iris";
import { rdfs } from "rdf-namespaces";

import { GroceryList, GroceryListItem, Ingredient, Recipe } from "./types";

export const foodSerializer = (food: ThingPersisted) => {
  return {
    identifier: asUrl(food).split("#")[1],
    name: getStringNoLocale(food, FOOD_NAME) ?? "",
    category: getStringNoLocale(food, SHOPPING_CATEGORY) ?? "default",
  };
};

export const ingredientSerializer = (
  ingredient: Thing,
  foods: SolidDataset
): Ingredient => {
  const foodRef = getUrl(ingredient, FOOD);
  if (!foods || foodRef === null) {
    throw new Error("no foods");
  }

  return {
    food: foodSerializer(getThing(foods, foodRef) as ThingPersisted),
    identifier: asUrl(ingredient).split("#")[1],
    quantity: getInteger(ingredient, METRIC_QUANTITY) ?? 0,
  };
};

export const recipeSerializer = (
  recipe: Thing,
  ingredients: SolidDataset,
  foods: SolidDataset
): Recipe => {
  if (!ingredients) {
    throw new Error("no ingredients");
  }
  const ingredientsRefs = getUrlAll(recipe, INGREDIENT);
  let ingredientList: Ingredient[] = [];

  if (ingredientsRefs.length) {
    ingredientList = ingredientsRefs.map((ingredientRef) => {
      const ingredient = getThing(ingredients, ingredientRef) as ThingPersisted;

      const serialialized_ingredient = ingredientSerializer(ingredient, foods);
      return serialialized_ingredient;
    });
  }

  const title = getStringNoLocale(recipe, TITLE);
  return {
    title: title ?? "",
    identifier: asUrl(recipe).split("#")[1],
    ingredients: ingredientList,
  };
};

export const groceryListItemSerializer = (
  groceryListItem: Thing,
  foods: SolidDataset
): GroceryListItem => {
  // If we allow groceryList as object we must determine the type here
  console.log(groceryListItem);
  const foodRef = getUrl(groceryListItem, groceryListItemObject);
  if (!foodRef) {
    throw new Error("No foodRef");
  }
  const food = getThing(foods, foodRef) as ThingPersisted;

  return {
    object: foodSerializer(food),
    identifier: asUrl(groceryListItem).split("#")[1],
    done: getStringNoLocale(groceryListItem, groceryListItemDone) === "true",
    quantity: getInteger(groceryListItem, QUANTITY) ?? 0,
  };
};

export const groceryListSerializer = (
  groceryList: Thing,
  groceryListItems: SolidDataset,
  foods: SolidDataset
): GroceryList => {
  const groceryListItemsRefs = getUrlAll(groceryList, rdfs.member);

  const groceryListItemsList = groceryListItemsRefs.map((ref) => {
    const groceryListItem = getThing(groceryListItems, ref) as ThingPersisted;
    return groceryListItemSerializer(groceryListItem, foods);
  });
  return {
    title: getStringNoLocale(groceryList, rdfs.label) ?? "",
    identifier: asUrl(groceryList).split("#")[1],
    items: groceryListItemsList,
  };
};
