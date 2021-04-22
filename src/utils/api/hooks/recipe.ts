import { RECIPE } from "models/iris";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useIngredients } from "utils/api/hooks/ingredients";
import { Recipe } from "utils/api/types";
import { TripleSubject, TripleDocument } from "tripledoc";
import { RecipeFormValues } from "pages/RecipeForm/RecipeForm";
import {
  createRecipe,
  getRecipes,
  getRecipeResources,
} from "utils/api/helpers";
import { useProfile } from "ProfileContext";
import { recipeSerializer } from "utils/api/serializers";

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

export const getRecipeList = async (
  profile: TripleSubject,
  publicTypeIndex: TripleDocument
) => {
  const { foods, recipes, ingredients } = await getRecipeResources(
    profile,
    publicTypeIndex
  );
  return recipes
    .getAllSubjectsOfType(RECIPE)
    .map((recipe) => recipeSerializer(recipe, ingredients, foods));
};

export const useRecipeList = () => {
  const { profile, publicTypeIndex } = useProfile();

  const recipesListQuery = useQuery(
    ["recipes_list", profile, publicTypeIndex],
    () => getRecipeList(profile!, publicTypeIndex!),
    {
      enabled: !!profile && !!publicTypeIndex,
    }
  );

  const recipeList = recipesListQuery.data;
  return { isSuccess: recipesListQuery.isSuccess, recipeList };
};

export const useCreateRecipe = () => {
  const { recipes } = useRecipes();
  const { ingredients } = useIngredients();
  const { profile, publicTypeIndex } = useProfile();
  const mutationFn = (recipe: RecipeFormValues) =>
    createRecipe(recipe, recipes!, ingredients!, profile!);

  const queryClient = useQueryClient();
  const recipeMutation = useMutation(mutationFn, {
    onSuccess: (data) => {
      const recipeList: Recipe[] =
        queryClient.getQueryData(["recipes_list", profile, publicTypeIndex]) ??
        [];
      recipeList.push(data);
      queryClient.setQueryData(
        ["recipes_list", profile, publicTypeIndex],
        recipeList
      );
    },
  });
  const ready = !!recipes && !!ingredients && !!profile;

  return { ready, recipeMutation };
};
