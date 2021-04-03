import { TripleDocument, TripleSubject } from "tripledoc";
import { rdf } from "rdf-namespaces";
import { FOOD, SHOPPING_CATEGORY } from "models/iris";
import { useProfile } from "ProfileContext";

import { useEffect, useState } from "react";

import { getOrCreateFoodList } from "utils/solid-api";
export interface FoodItem {
  identifier: string;
  category: string;
}

export interface useFoodListReturnValue {
  foodList: TripleDocument | null;
  foodItems: FoodItem[];
}
const formatFoodList = (list: TripleSubject[]): FoodItem[] => {
  return list.map((subject) => ({
    identifier: subject.asRef().split("#")[1],
    category: subject.getString(SHOPPING_CATEGORY) ?? "default",
  }));
};

export const useFoodList = (): useFoodListReturnValue => {
  const { profile, publicTypeIndex } = useProfile();
  const [foodList, setFoodList] = useState<TripleDocument | null>(null);

  useEffect(() => {
    if (profile && publicTypeIndex) {
      getOrCreateFoodList(profile, publicTypeIndex).then((foodList) => {
        setFoodList(foodList);
      });
    }
  }, [profile, publicTypeIndex, setFoodList]);

  return foodList
    ? {
        foodList,
        foodItems: formatFoodList(foodList.getAllSubjectsOfType(FOOD)),
      }
    : { foodList, foodItems: [] };
};

export const useCreateFood = (foodList: TripleDocument | null) => {
  const [loading, setLoading] = useState(false);
  const createFood = async (identifier: string, shoppingCategory: string) => {
    if (foodList === null) {
      throw new Error("Missing FoodList");
    }

    const food = foodList.addSubject({
      identifier: identifier,
    });
    food.addRef(rdf.type, FOOD);
    food.addString(SHOPPING_CATEGORY, shoppingCategory);
    await foodList.save();
    setLoading(false);
  };
  return { loading, createFood };
};
