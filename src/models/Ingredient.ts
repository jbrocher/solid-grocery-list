import {
  Thing,
  buildThing,
  createThing,
  saveSolidDatasetAt,
  setThing,
} from "@inrupt/solid-client";
import { fetch } from "@inrupt/solid-client-authn-browser";
import FoodManager from "models/Food";
import { FOOD, INGREDIENT, METRIC_QUANTITY } from "models/iris";
import { rdf } from "rdf-namespaces";

import { Ingredient } from "utils/api/types";

import ResourceManager from "./Resource";

export class IngredientsManager extends ResourceManager {
  foods: FoodManager;
  constructor(profile: Thing) {
    super(profile, {
      identifier: "ingredient",
      storage: "public/ingredient-list.ttl",
      iri: INGREDIENT,
    });
    this.foods = new FoodManager(profile);
  }

  getIngredients = async () => {
    return this.getOrCreate();
  };

  create = async (ingredient: Ingredient) => {
    // Create a new subject of type ingredient
    // with a GUI
    let ingredients = await this.getIngredients();
    const ingredientSubject = buildThing(createThing())
      .addUrl(rdf.type, INGREDIENT)
      .addUrl(FOOD, this.foods.makeRef(ingredient.food.identifier))
      .addInteger(METRIC_QUANTITY, ingredient.quantity)
      .build();
    ingredients = setThing(ingredients, ingredientSubject);
    await saveSolidDatasetAt(this.getBaseUrl(), ingredients, {
      fetch: fetch,
    });
    return ingredientSubject;
  };
}

export default IngredientsManager;
