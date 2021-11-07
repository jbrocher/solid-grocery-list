import { useQuery } from "react-query";
import { useProfile } from "ProfileContext";
import { SolidDataset } from "@inrupt/solid-client";
import { IngredientsManager } from "models/Ingredient";

export const useIngredients = () => {
  const { profile } = useProfile();
  const { isLoading, data: ingredients } = useQuery<SolidDataset, Error>(
    ["ingredients", profile],
    async () => {
      // Profile and publicTypeIndex are defined thanks to enabled
      const manager = new IngredientsManager(profile!);
      return await manager.getIngredients();
    },
    {
      enabled: !!profile,
    }
  );

  return { isLoading, ingredients };
};
