import {
  SolidDataset,
  Thing,
  asUrl,
  buildThing,
  createThing,
  saveSolidDatasetAt,
  setThing,
} from "@inrupt/solid-client";
import { fetch } from "@inrupt/solid-client-authn-browser";
import { Recipe, hasIngredient } from "models/iris";
import { rdf, rdfs } from "rdf-namespaces";

import { RecipeFormValues } from "utils/api/types";

import FoodManager from "./Food";
import IngredientManager from "./Ingredient";
import ResourceManager from "./Resource";

class RecipeManager extends ResourceManager {
  ingredients: IngredientManager;
  foods: FoodManager;
  constructor(profile: Thing) {
    super(profile, {
      identifier: "recipe",
      storage: "public/recipe-list.ttl",
      iri: Recipe,
    });
    this.ingredients = new IngredientManager(profile);
    this.foods = new FoodManager(profile);
  }
  async getRecipes(): Promise<SolidDataset> {
    return this.getOrCreate();
  }

  async getRecipeResources() {
    const foods = await this.foods.getFoods();
    const ingredients = await this.ingredients.getIngredients();
    const recipes = await this.getRecipes();

    return { foods, ingredients, recipes };
  }

  async create(recipe: RecipeFormValues) {
    let recipes = await this.getRecipes();
    const recipeSubjectBuilder = buildThing(createThing())
      .addUrl(rdf.type, Recipe)
      .setStringNoLocale(rdfs.label, recipe.title);
    await Promise.all(
      recipe.ingredients.map(async (ingredient) => {
        const createdIngredient = await this.ingredients.create(ingredient);
        recipeSubjectBuilder.addUrl(
          hasIngredient,
          asUrl(createdIngredient, this.ingredients.getBaseUrl())
        );
        return createdIngredient;
      })
    );
    const recipeSubject = recipeSubjectBuilder.build();
    recipes = setThing(recipes, recipeSubject);
    console.log(recipes);
    recipes = await saveSolidDatasetAt(this.getBaseUrl(), recipes, {
      fetch: fetch,
    });
    return {
      ...recipe,
      identifier: asUrl(recipeSubject, this.getBaseUrl()).split("#")[1],
    };
  }
}

export default RecipeManager;
