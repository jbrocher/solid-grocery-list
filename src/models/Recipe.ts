import ResourceManager from "./Resource";
import { rdf } from "rdf-namespaces";
import IngredientManager from "./Ingredient";
import FoodManager from "./Food";
import { RecipeFormValues } from "pages/RecipeForm/RecipeForm";
import { TripleSubject, TripleDocument } from "tripledoc";
import { INGREDIENT, RECIPE, TITLE } from "models/iris";

class RecipeManager extends ResourceManager {
  ingredients: IngredientManager;
  foods: FoodManager;
  constructor(profile: TripleSubject, publicTypeIndex: TripleDocument) {
    super(profile, publicTypeIndex, {
      identifier: "recipe",
      storage: "public/recipe-list.ttl",
      iri: RECIPE,
    });
    this.ingredients = new IngredientManager(profile, publicTypeIndex);
    this.foods = new FoodManager(profile, publicTypeIndex);
  }
  async getRecipes(): Promise<TripleDocument> {
    return this.getOrCreate();
  }

  async getRecipeResources() {
    const foods = await this.foods.getFoods();
    const ingredients = await this.ingredients.getIngredients();
    const recipes = await this.getRecipes();

    return { foods, ingredients, recipes };
  }

  async create(recipe: RecipeFormValues) {
    const recipes = await this.getRecipes();
    const recipeSubject = recipes.addSubject();
    recipeSubject.addRef(rdf.type, RECIPE);
    recipeSubject.addString(TITLE, recipe.title);
    await Promise.all(
      recipe.ingredients.map(async (ingredient) => {
        const createdIngredient = await this.ingredients.create(ingredient);
        recipeSubject.addRef(INGREDIENT, createdIngredient.asRef());
        return createdIngredient;
      })
    );
    await recipes.save();
    return {
      ...recipe,
      identifier: recipeSubject.asRef().split("#")[1],
    };
  }
}

export default RecipeManager;
