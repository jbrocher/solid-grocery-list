import { useProfile } from "ProfileContext";
import { rdf } from "rdf-namespaces";
import { FOOD_NAME, FOOD, SHOPPING_CATEGORY } from "models/iris";
import { TripleDocument } from "tripledoc";
import { useEffect, useState } from "react";
import { getFoods } from "utils/api/helpers";
import { foodSerializer } from "utils/api/serializers";
import { Food } from "utils/api/types";

export const useFoods = () => {
  const { profile, publicTypeIndex } = useProfile();
  const [foods, setFoods] = useState<TripleDocument | null>(null);
  useEffect(() => {
    if (profile && publicTypeIndex) {
      getFoods(profile, publicTypeIndex).then((foods) => setFoods(foods));
    }
  }, [profile, publicTypeIndex]);
  return foods;
};

export const useFoodList = () => {
  const foods = useFoods();
  const [foodItems, setFoodItems] = useState<Food[] | null>(null);
  useEffect(() => {
    if (foods) {
      setFoodItems(
        foods.getAllSubjectsOfType(FOOD).map((food) => foodSerializer(food))
      );
    }
  }, [foods]);
  return foodItems;
};

export const useCreateFood = () => {
  const [loading, setLoading] = useState(false);
  const foods = useFoods();
  const createFood = async (name: string, shoppingCategory: string) => {
    if (foods === null) {
      throw new Error("Missing FoodList");
    }

    const food = foods.addSubject();
    food.addRef(rdf.type, FOOD);
    food.addString(SHOPPING_CATEGORY, shoppingCategory);
    food.addString(FOOD_NAME, name);
    await foods.save();
    setLoading(false);
  };
  return { loading, createFood };
};
