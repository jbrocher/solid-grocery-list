import { useProfile } from "ProfileContext";
import { useQuery } from "react-query";
import { rdf } from "rdf-namespaces";
import { FOOD_NAME, FOOD, SHOPPING_CATEGORY } from "models/iris";
import { TripleSubject, TripleDocument } from "tripledoc";
import { useState } from "react";
import { getFoods } from "utils/api/helpers";
import { foodSerializer } from "utils/api/serializers";

export const useFoods = () => {
  const { profile, publicTypeIndex } = useProfile();
  const { data: foods } = useQuery(
    ["food", profile, publicTypeIndex],
    () => getFoods(profile as TripleSubject, publicTypeIndex as TripleDocument),
    { enabled: !!profile && !!publicTypeIndex }
  );
  return foods;
};

export const useFoodList = () => {
  const foods = useFoods();
  if (foods) {
    return foods.getAllSubjectsOfType(FOOD).map((food) => foodSerializer(food));
  } else {
    return null;
  }
};

export const useCreateFood = () => {
  const [loading, setLoading] = useState(false);
  const foods = useFoods();
  const createFood = async (name: string, shoppingCategory: string) => {
    if (!foods) {
      throw new Error("Missing FoodList");
    }
    console.log(name);
    console.log(foods.asRef());

    const food = foods.addSubject();
    food.addRef(rdf.type, FOOD);
    food.addString(SHOPPING_CATEGORY, shoppingCategory);
    food.addString(FOOD_NAME, name);
    await foods.save();
    setLoading(false);
  };
  return { loading, createFood };
};
