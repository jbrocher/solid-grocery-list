import { METRIC_QUANTITY, FOOD, INGREDIENT } from "models/iris";
import { makeRef } from "utils/api/helpers";
import { rdf } from "rdf-namespaces";
import { useProfile } from "ProfileContext";
import { TripleDocument } from "tripledoc";
import { Ingredient } from "utils/api/types";
import { useEffect, useState } from "react";
import { getIngredients } from "utils/api/helpers";

export const useIngredients = () => {
  const { profile, publicTypeIndex } = useProfile();
  const [ingredients, setIngredients] = useState<TripleDocument | null>(null);
  useEffect(() => {
    if (profile && publicTypeIndex) {
      getIngredients(profile, publicTypeIndex).then((ingredients) =>
        setIngredients(ingredients)
      );
    }
  }, [profile, publicTypeIndex]);

  return ingredients;
};

export const useCreateIngredient = () => {
  const ingredients = useIngredients();
  const { profile } = useProfile();

  const createIngredient = async (ingredient: Ingredient) => {
    if (ingredients === null || profile === null) {
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
  const ready = ingredients && profile;

  return { ready, createIngredient };
};
