import { INGREDIENT, TITLE, RECIPE } from "models/iris";
import { useQuery, useMutation } from "react-query";
import { rdf } from "rdf-namespaces";
import { Recipe } from "utils/api/types";
import { getRecipes, getRecipeResources } from "utils/api/helpers";
import { useProfile } from "ProfileContext";
import { recipeSerializer } from "utils/api/serializers";
import { useCreateIngredient } from "./ingredients";
import { RecipeFormValues } from "pages/RecipeForm/RecipeForm";

export const useRecipes = () => {
  const { profile, publicTypeIndex } = useProfile();
  const { isSuccess, data: recipes } = useQuery(
    // typescript doesn't understand enabled
    ["recipes", profile, publicTypeIndex],
    () => getRecipes(profile!, publicTypeIndex!),
    {
      enabled: !!profile && !!publicTypeIndex,
    }
  );
  return { recipes, isSuccess };
};

export const useRecipeList = () => {
  const { profile, publicTypeIndex } = useProfile();

  const recipesListQuery = useQuery(
    ["recipes_list", profile, publicTypeIndex],
    () => getRecipeResources(profile!, publicTypeIndex!),
    {
      enabled: !!profile && !!publicTypeIndex,
    }
  );

  let recipeList: Recipe[] = [];
  if (recipesListQuery.isSuccess) {
    const recipesData = recipesListQuery.data;
    recipeList = recipesData.recipes
      .getAllSubjectsOfType(RECIPE)
      .map((recipe) =>
        recipeSerializer(recipe, recipesData.ingredients, recipesData.foods)
      );
  }

  return { isSuccess: recipesListQuery.isSuccess, recipeList };
};

export const useCreateRecipe = () => {
  const { ready: ingredientsReady, createIngredient } = useCreateIngredient();
  const { recipes } = useRecipes();

  const createRecipe = async (recipe: RecipeFormValues) => {
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
    console.log(recipes);
    return recipeSubject;
  };
  const ready = !!ingredientsReady && !!recipes;
  return { ready, createRecipe };
};
