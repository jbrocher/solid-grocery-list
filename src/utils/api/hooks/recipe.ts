import { useQuery, useMutation, useQueryClient } from "react-query";
import { RECIPE } from "models/iris";
import { rdf } from "rdf-namespaces";
import RecipeManager from "models/Recipe";
import { Recipe } from "utils/api/types";
import { getUrl, getThingAll, Thing } from "@inrupt/solid-client";
import { RecipeFormValues } from "pages/RecipeForm/RecipeForm";
import { useProfile } from "ProfileContext";
import { recipeSerializer } from "utils/api/serializers";

export const useRecipes = () => {
  const { profile } = useProfile();
  const { isSuccess, data: recipes } = useQuery(
    // typescript doesn't understand enabled
    ["recipes", profile],
    async () => {
      const manager = new RecipeManager(profile!);
      return await manager.getRecipes();
    },
    {
      enabled: !!profile,
    }
  );
  return { recipes, isSuccess };
};

export const getRecipeList = async (profile: Thing) => {
  const manager = new RecipeManager(profile);
  const { foods, recipes, ingredients } = await manager.getRecipeResources();
  console.log(recipes);
  return getThingAll(recipes)
    .filter((recipe) => getUrl(recipe, rdf.type) === RECIPE)
    .map((recipe) => recipeSerializer(recipe, ingredients, foods));
};

export const useRecipeList = () => {
  const { profile } = useProfile();

  const recipesListQuery = useQuery(
    ["recipes_list", profile],
    () => getRecipeList(profile!),
    {
      enabled: !!profile,
    }
  );

  const recipeList = recipesListQuery.data;
  return { isSuccess: recipesListQuery.isSuccess, recipeList };
};

export const useCreateRecipe = () => {
  const { profile } = useProfile();
  const mutationFn = async (recipe: RecipeFormValues) => {
    const manager = new RecipeManager(profile!);
    return await manager.create(recipe);
  };

  const queryClient = useQueryClient();
  const recipeMutation = useMutation(mutationFn, {
    onSuccess: (data) => {
      const recipeList: Recipe[] =
        queryClient.getQueryData(["recipes_list", profile]) ?? [];
      recipeList.push(data);
      queryClient.setQueryData(["recipes_list", profile], recipeList);
    },
  });
  const ready = !!profile;

  return { ready, recipeMutation };
};
