import { useProfile } from "ProfileContext";
import { useQuery } from "react-query";
import { useState } from "react";
import FoodManager from "models/Food";
import { foodSerializer } from "utils/api/serializers";
import { rdf } from "rdf-namespaces";
import { FOOD } from "models/iris";
import { getUrl, Thing, getThingAll } from "@inrupt/solid-client";

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
      .filter((food) => getUrl(food, rdf.type) === FOOD)
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
