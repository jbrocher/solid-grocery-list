import { useQuery } from "react-query";
import { useProfile } from "ProfileContext";
import { SolidDataset } from "@inrupt/solid-client";
import { IngredientsManager } from "models/Ingredient";

export const useIngredients = () => {
  const { profile, publicTypeIndex } = useProfile();
  const { isLoading, data: ingredients } = useQuery<SolidDataset, Error>(
    ["ingredients", profile, publicTypeIndex],
    async () => {
      // Profile and publicTypeIndex are defined thanks to enabled
      const manager = new IngredientsManager(profile!, publicTypeIndex!);
      return await manager.getIngredients();
    },
    {
      enabled: !!profile && !!publicTypeIndex,
    }
  );

  return { isLoading, ingredients };
};
