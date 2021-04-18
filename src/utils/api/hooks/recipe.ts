import { INGREDIENT, TITLE, RECIPE } from "models/iris";
import { useEffect, useState } from "react";
import { rdf } from "rdf-namespaces";
import { Recipe } from "utils/api/types";
import { getOrCreateRecipeList } from "utils/api/helpers";
import { TripleDocument } from "tripledoc";
import { useProfile } from "ProfileContext";
import { useRecipeSerializer } from "utils/api/serializers";
import { useCreateIngredient } from "./ingredients";
import { RecipeFormValues } from "pages/RecipeForm/RecipeForm";

export const useRecipes = () => {
  const { profile, publicTypeIndex } = useProfile();
  const [recipeList, setRecipeList] = useState<TripleDocument | null>(null);
  useEffect(() => {
    if (profile && publicTypeIndex) {
      getOrCreateRecipeList(profile, publicTypeIndex).then((recipeList) => {
        setRecipeList(recipeList);
      });
    }
  }, [profile, publicTypeIndex]);
  return recipeList;
};

export const useRecipeList = () => {
  const recipes = useRecipes();
  const [recipeItems, setRecipeItems] = useState<Recipe[] | null>(null);
  const { ready: serializerReady, recipeSerializer } = useRecipeSerializer();

  useEffect(() => {
    if (recipes && serializerReady) {
      setRecipeItems(
        recipes
          .getAllSubjectsOfType(RECIPE)
          .map((recipe) => recipeSerializer(recipe))
      );
    }
  }, [recipes, serializerReady, recipeSerializer]);

  return recipeItems;
};

export const useCreateRecipe = () => {
  const { ready: ingredientsReady, createIngredient } = useCreateIngredient();
  const recipes = useRecipes();

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
    return recipeSubject;
  };
  const ready = ingredientsReady !== null && recipes !== null;
  return { ready, createRecipe };
};
