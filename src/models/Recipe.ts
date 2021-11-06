import ResourceManager from "./Resource";
import { rdf } from "rdf-namespaces";
import IngredientManager from "./Ingredient";
import FoodManager from "./Food";
import { RecipeFormValues } from "pages/RecipeForm/RecipeForm";
import {
  asUrl,
  Thing,
  SolidDataset,
  setThing,
  createThing,
  buildThing,
  saveSolidDatasetAt,
} from "@inrupt/solid-client";
import { fetch } from "@inrupt/solid-client-authn-browser";
import { INGREDIENT, RECIPE, TITLE } from "models/iris";

class RecipeManager extends ResourceManager {
  ingredients: IngredientManager;
  foods: FoodManager;
  constructor(profile: Thing, publicTypeIndex: SolidDataset) {
    super(profile, publicTypeIndex, {
      identifier: "recipe",
      storage: "public/recipe-list.ttl",
      iri: RECIPE,
    });
    this.ingredients = new IngredientManager(profile, publicTypeIndex);
    this.foods = new FoodManager(profile, publicTypeIndex);
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
