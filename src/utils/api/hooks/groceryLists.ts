import {
  createGroceryListFromRecipes,
  getGroceryListItems,
  getGroceryListsResources,
  getGroceries,
} from "utils/api/helpers";

import { Recipe } from "utils/api/types";
import { useProfile } from "ProfileContext";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { groceryListSerializer } from "utils/api/serializers";
import { GroceryList } from "models/iris";
import { TripleSubject, TripleDocument } from "tripledoc";

export const getGroceryLists = async (
  profile: TripleSubject,
  publicTypeIndex: TripleDocument
) => {
  const {
    foods,
    groceryLists,
    groceryListItems,
  } = await getGroceryListsResources(profile, publicTypeIndex);
  return groceryLists
    .getAllSubjectsOfType(GroceryList)
    .map((groceryList) =>
      groceryListSerializer(groceryList, groceryListItems, foods)
    );
};

export const useGroceries = () => {
  const { profile, publicTypeIndex } = useProfile();
  const { isSuccess, data: groceries } = useQuery(
    ["groceries", profile, publicTypeIndex],
    () => getGroceries(profile!, publicTypeIndex!),
    {
      enabled: !!profile && !!publicTypeIndex,
    }
  );
  return { isSuccess, groceries };
};

export const useGroceryLists = () => {
  const { profile, publicTypeIndex } = useProfile();
  const groceryListsQuery = useQuery(
    ["grocery_lists", profile, publicTypeIndex],
    () => getGroceryLists(profile!, publicTypeIndex!),
    {
      enabled: !!profile && !!publicTypeIndex,
    }
  );

  const groceryLists = groceryListsQuery.data;
  return { isSuccess: groceryListsQuery.isSuccess, groceryLists };
};

export const useGroceryListItems = () => {
  const { profile, publicTypeIndex } = useProfile();
  const { isSuccess, data: groceryListItems } = useQuery(
    ["grocery_list_items", profile, publicTypeIndex],
    () => getGroceryListItems(profile!, publicTypeIndex!),
    {
      enabled: !!profile && !!publicTypeIndex,
    }
  );
  return { isSuccess, groceryListItems };
};

export const useCreateGroceryList = () => {
  const { isSuccess, groceries } = useGroceries();
  const { isSuccess: isSuccessItems, groceryListItems } = useGroceryListItems();
  const { profile } = useProfile();

  const queryClient = useQueryClient();
  const mutationFn = (recipes: Recipe[]) =>
    createGroceryListFromRecipes(
      recipes,
      groceries!,
      groceryListItems!,
      profile!
    );
  const groceryListMutation = useMutation(mutationFn, {
    onSuccess: () => {
      queryClient.invalidateQueries("grocery_lists");
    },
  });

  const ready = !!isSuccess && !!isSuccessItems;
  return { ready, groceryListMutation };
};
