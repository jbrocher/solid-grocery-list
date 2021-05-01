import {
  createGroceryListFromRecipes,
  makeRef,
  getGroceryListItems,
  getGroceryListsResources,
  getGroceries,
} from "utils/api/helpers";

import { Recipe, GroceryList as GroceryListType } from "utils/api/types";
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
  const query = useQuery(
    ["groceries", profile, publicTypeIndex],
    () => getGroceries(profile!, publicTypeIndex!),
    {
      enabled: !!profile && !!publicTypeIndex,
    }
  );

  if (!query.isSuccess) {
    return {
      isSuccess: query.isSuccess,
      groceries: null,
    };
  }
  return { isSuccess: query.isSuccess, groceries: query.data };
};

export const useGroceriesResources = () => {
  const { profile, publicTypeIndex } = useProfile();
  const query = useQuery(
    ["groceriesResources", profile, publicTypeIndex],
    () => getGroceryListsResources(profile!, publicTypeIndex!),
    {
      enabled: !!profile && !!publicTypeIndex,
    }
  );

  return { ...query, profile };
};
export const useGroceryLists = () => {
  const groceriesResources = useGroceriesResources();

  let groceryLists: GroceryListType[] = [];
  if (groceriesResources.isSuccess) {
    groceryLists = groceriesResources.data.groceryLists
      .getAllSubjectsOfType(GroceryList)
      .map((groceryList) =>
        groceryListSerializer(
          groceryList,
          groceriesResources.data.groceryListItems,
          groceriesResources.data.foods
        )
      );
  }
  return { isSuccess: groceriesResources.isSuccess, groceryLists };
};

export const useGroceryList = (identifier: string) => {
  const groceriesResources = useGroceriesResources();
  let groceryList;
  if (groceriesResources.isSuccess) {
    const ref = makeRef(identifier, groceriesResources.profile!, "groceryList");
    groceryList = groceryListSerializer(
      groceriesResources.data.groceryLists.getSubject(ref),
      groceriesResources.data.groceryListItems,
      groceriesResources.data.foods
    );
    console.log(groceryList);
  }

  return { isSuccess: groceriesResources.isSuccess, groceryList };
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
