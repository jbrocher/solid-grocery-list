import { useQuery } from "react-query";

export interface SpoonacularIntgredient {
  name: string;
  id: number;
  aisle: string;
}

export const useAutocompleteIngredient = (query: string) => {
  const { isSuccess, data } = useQuery<SpoonacularIntgredient[]>(
    `https://api.spoonacular.com/food/ingredients/autocomplete?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}&query=${query}&metaInformation=true`
  );

  return { isSuccess, data };
};
