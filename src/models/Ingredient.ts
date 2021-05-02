import { rdf, solid, space } from "rdf-namespaces";
import {
  Ingredient,
  Recipe,
  GroceryListItem as GroceryListItemType,
} from "utils/api/types";
import { makeRef } from "utils/api/helpers";
import ResourceManager from "./Resource";
import {
  METRIC_QUANTITY,
  INGREDIENT,
  FOOD,
  RECIPE,
  GroceryList,
  GroceryListItem,
} from "models/iris";
import {
  createDocument,
  fetchDocument,
  TripleSubject,
  TripleDocument,
} from "tripledoc";
import FoodManager from "models/Food";

export class IngredientsManager extends ResourceManager {
  foods: FoodManager;
  constructor(profile: TripleSubject, publicTypeIndex: TripleDocument) {
    super(profile, publicTypeIndex, {
      identifier: "ingredient",
      storage: "public/ingredient-list.ttl",
      iri: INGREDIENT,
    });
    this.foods = new FoodManager(profile, publicTypeIndex);
  }

  getIngredients = async () => {
    return this.getOrCreate();
  };

  create = async (ingredient: Ingredient) => {
    // Create a new subject of type ingredient
    // with a GUI
    const ingredients = await this.getIngredients();
    const ingredientSubject = ingredients.addSubject();
    ingredientSubject.addRef(rdf.type, INGREDIENT);
    ingredientSubject.addRef(
      FOOD,
      this.foods.makeRef(ingredient.food.identifier)
    );
    ingredientSubject.addInteger(METRIC_QUANTITY, ingredient.quantity);
    await ingredients.save();
    return ingredientSubject;
  };
}

export default IngredientsManager;
