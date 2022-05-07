import { Thing, getThingAll, getUrl } from "@inrupt/solid-client";
import { useProfile } from "ProfileContext";
import RecipeManager from "models/Recipe";
import { Recipe } from "models/iris";
import { rdf } from "rdf-namespaces";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { recipeSerializer } from "utils/api/serializers";
import { Recipe as RecipeType } from "utils/api/types";
import { RecipeFormValues } from "utils/api/types";

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
    .filter((recipe) => getUrl(recipe, rdf.type) === Recipe)
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
      const recipeList: RecipeType[] =
        queryClient.getQueryData(["recipes_list", profile]) ?? [];
      recipeList.push(data);
      queryClient.setQueryData(["recipes_list", profile], recipeList);
    },
  });
  const ready = !!profile;

  return { ready, recipeMutation };
};
