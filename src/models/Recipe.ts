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
import { INGREDIENT, RECIPE, TITLE } from "models/iris";
import { rdf } from "rdf-namespaces";
import { RecipeFormValues } from "types";

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
      iri: RECIPE,
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
      .addUrl(rdf.type, RECIPE)
      .setStringNoLocale(TITLE, recipe.title);
    await Promise.all(
      recipe.ingredients.map(async (ingredient) => {
        const createdIngredient = await this.ingredients.create(ingredient);
        recipeSubjectBuilder.addUrl(
          INGREDIENT,
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
