import { Thing, getThingAll, getUrl } from "@inrupt/solid-client";
import { useProfile } from "ProfileContext";
import FoodManager from "models/Food";
import { Food } from "models/iris";
import { rdf } from "rdf-namespaces";
import { useQuery } from "react-query";

import { useState } from "react";

import { foodSerializer } from "utils/api/serializers";

export const useFoods = () => {
  const { profile } = useProfile();
  const { data: foods } = useQuery(
    ["food", profile],
    async () => {
      const manager = new FoodManager(profile!);
      return await manager.getFoods();
    },
    { enabled: !!profile }
  );
  return foods;
};

export const useFoodList = () => {
  const foods = useFoods();
  if (foods) {
    return getThingAll(foods)
      .filter((food) => getUrl(food, rdf.type) === Food)
      .map((food) => foodSerializer(food));
  } else {
    return null;
  }
};

export const useCreateFood = () => {
  const [loading, setLoading] = useState(false);
  const { profile } = useProfile();
  const foodManager = new FoodManager(profile as Thing);
  const createFood = async (name: string, shoppingCategory: string) => {
    setLoading(true);
    const createdFood = await foodManager.create(name, shoppingCategory);
    setLoading(false);
    return createdFood;
  };
  return { loading, createFood };
};
