import { INGREDIENT, TITLE, RECIPE } from "models/iris";
import { rdf } from "rdf-namespaces";
import { Recipe } from "utils/api/types";
import { useRecipes } from "utils/api/hooks";
import { useCreateIngredient } from "./ingredients";

export const useCreateRecipe = () => {
  const { ready: ingredientsReady, createIngredient } = useCreateIngredient();
  const recipes = useRecipes();

  const createRecipe = async (recipe: Recipe) => {
    if (ingredientsReady == null || recipes == null) {
      throw new Error("Missing intialization");
    }

    const recipeSubject = recipes.addSubject();
    recipeSubject.addRef(rdf.type, RECIPE);
    recipeSubject.addString(TITLE, recipe.title);
    await Promise.all(
      recipe.ingredients.map(async (ingredient) => {
        const createdIngredient = await createIngredient(ingredient);
        recipeSubject.addRef(INGREDIENT, createdIngredient.asRef());
        return createdIngredient;
      })
    );
    await recipes.save();
    return recipeSubject;
  };
  const ready = ingredientsReady !== null && recipes !== null;
  return { ready, createRecipe };
};
