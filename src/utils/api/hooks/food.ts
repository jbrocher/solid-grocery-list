import { useProfile } from "ProfileContext";
import { useQuery } from "react-query";
import { useState } from "react";
import FoodManager from "models/Food";
import { foodSerializer } from "utils/api/serializers";
import { Thing, SolidDataset, getThingAll } from "@inrupt/solid-client";

export const useFoods = () => {
  const { profile, publicTypeIndex } = useProfile();
  const { data: foods } = useQuery(
    ["food", profile, publicTypeIndex],
    async () => {
      const manager = new FoodManager(profile!, publicTypeIndex!);
      return await manager.getFoods();
    },
    { enabled: !!profile && !!publicTypeIndex }
  );
  return foods;
};

export const useFoodList = () => {
  const foods = useFoods();
  if (foods) {
    return getThingAll(foods).map((food) => foodSerializer(food));
  } else {
    return null;
  }
};

export const useCreateFood = () => {
  const [loading, setLoading] = useState(false);
  const { profile, publicTypeIndex } = useProfile();
  const foodManager = new FoodManager(
    profile as Thing,
    publicTypeIndex as SolidDataset
  );
  const createFood = async (name: string, shoppingCategory: string) => {
    setLoading(true);
    const createdFood = await foodManager.create(name, shoppingCategory);
    setLoading(false);
    return createdFood;
  };
  return { loading, createFood };
};
