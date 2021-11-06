import { useQuery, useMutation, useQueryClient } from "react-query";
import { RECIPE } from "models/iris";
import { rdf } from "rdf-namespaces";
import RecipeManager from "models/Recipe";
import { Recipe } from "utils/api/types";
import { getUrl, getThingAll, Thing, SolidDataset } from "@inrupt/solid-client";
import { RecipeFormValues } from "pages/RecipeForm/RecipeForm";
import { useProfile } from "ProfileContext";
import { recipeSerializer } from "utils/api/serializers";

export const useRecipes = () => {
  const { profile, publicTypeIndex } = useProfile();
  const { isSuccess, data: recipes } = useQuery(
    // typescript doesn't understand enabled
    ["recipes", profile, publicTypeIndex],
    async () => {
      const manager = new RecipeManager(profile!, publicTypeIndex!);
      return await manager.getRecipes();
    },
    {
      enabled: !!profile && !!publicTypeIndex,
    }
  );
  return { recipes, isSuccess };
};

export const getRecipeList = async (
  profile: Thing,
  publicTypeIndex: SolidDataset
) => {
  const manager = new RecipeManager(profile, publicTypeIndex);
  const { foods, recipes, ingredients } = await manager.getRecipeResources();
  console.log(recipes);
  return getThingAll(recipes)
    .filter((recipe) => getUrl(recipe, rdf.type) === RECIPE)
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
  const { profile, publicTypeIndex } = useProfile();
  const mutationFn = async (recipe: RecipeFormValues) => {
    const manager = new RecipeManager(profile!, publicTypeIndex!);
    return await manager.create(recipe);
  };

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
  const ready = !!profile && !!publicTypeIndex;

  return { ready, recipeMutation };
};
