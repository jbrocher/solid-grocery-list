import { METRIC_QUANTITY, FOOD, INGREDIENT } from "models/iris";
import { useQuery } from "react-query";
import { makeRef } from "utils/api/helpers";
import { rdf } from "rdf-namespaces";
import { useProfile } from "ProfileContext";
import { TripleSubject, TripleDocument } from "tripledoc";
import { Ingredient } from "utils/api/types";
import { getIngredients } from "utils/api/helpers";

export const useIngredients = () => {
  const { profile, publicTypeIndex } = useProfile();
  const { isLoading, data: ingredients } = useQuery<TripleDocument, Error>(
    ["ingredients", profile, publicTypeIndex],
    () =>
      getIngredients(
        profile as TripleSubject,
        publicTypeIndex as TripleDocument
      ),
    {
      enabled: !!profile && !!publicTypeIndex,
    }
  );

  return { isLoading, ingredients };
};

export const useCreateIngredient = () => {
  const { ingredients } = useIngredients();
  const { profile } = useProfile();

  const createIngredient = async (ingredient: Ingredient) => {
    if (!ingredients || !profile) {
      throw new Error("Missing Ingredients Document");
    }

    // Create a new subject of type ingredient
    // with a GUI
    const ingredientSubject = ingredients.addSubject();
    ingredientSubject.addRef(rdf.type, INGREDIENT);
    ingredientSubject.addRef(
      FOOD,
      makeRef(ingredient.food.identifier, profile, "food")
    );
    ingredientSubject.addInteger(METRIC_QUANTITY, ingredient.quantity);
    await ingredients.save();
    return ingredientSubject;
  };
  const ready = !!ingredients && !!profile;

  return { ready, createIngredient };
};
