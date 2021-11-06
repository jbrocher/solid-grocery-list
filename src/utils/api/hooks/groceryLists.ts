import GroceriesManager from "models/Groceries";
import GroceryListItemManager from "models/GroceryListItem";
import {
  GroceryListItem,
  Recipe,
  GroceryList as GroceryListType,
} from "utils/api/types";
import { useProfile } from "ProfileContext";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { groceryListSerializer } from "utils/api/serializers";
import { GroceryList } from "models/iris";
import {
  getThing,
  getThingAll,
  ThingPersisted,
  Thing,
  SolidDataset,
} from "@inrupt/solid-client";

export const useGroceries = () => {
  const { profile, publicTypeIndex } = useProfile();
  const query = useQuery(
    ["groceries", profile, publicTypeIndex],
    async () => {
      const manager = new GroceriesManager(profile!, publicTypeIndex!);
      return await manager.getGroceries();
    },
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
    async () => {
      const manager = new GroceriesManager(profile!, publicTypeIndex!);
      return await manager.getGroceriesResources();
    },
    {
      enabled: !!profile && !!publicTypeIndex,
    }
  );

  return { ...query, profile, publicTypeIndex };
};
export const useGroceryLists = () => {
  const groceriesResources = useGroceriesResources();

  let groceryLists: GroceryListType[] = [];
  if (groceriesResources.isSuccess) {
    groceryLists = getThingAll(groceriesResources.data.groceryLists).map(
      (groceryList) =>
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
  const { profile, publicTypeIndex } = useProfile();
  const query = useQuery(
    ["grocery_list", identifier],
    async () => {
      const manager = new GroceriesManager(profile!, publicTypeIndex!);
      const groceriesResources = await manager.getGroceriesResources();
      const ref = manager.makeRef(identifier);
      return groceryListSerializer(
        getThing(groceriesResources.groceryLists, ref) as ThingPersisted,
        groceriesResources.groceryListItems,
        groceriesResources.foods
      );
    },
    {
      enabled: !!profile && !!publicTypeIndex,
    }
  );
  return query;
};

export const useEditGroceryList = (listIdentifier: string) => {
  const { profile, publicTypeIndex } = useProfile();
  const queryClient = useQueryClient();
  const mutationFn = async (item: GroceryListItem) => {
    if (!profile || !publicTypeIndex) {
      throw new Error("Resources not ready");
    }
    const manager = new GroceriesManager(profile, publicTypeIndex);
    return await manager.items.toggle(item);
  };
  const groceryListMutation = useMutation(mutationFn, {
    onMutate: async (item) => {
      const queryKey = ["grocery_list", listIdentifier];
      await queryClient.cancelQueries(queryKey);
      const groceryList: GroceryListType | undefined =
        queryClient.getQueryData(queryKey);

      if (!groceryList) return;

      const itemIndex = groceryList.items.findIndex(
        (listItem) => listItem.identifier === item.identifier
      );
      item.done = !item.done;
      groceryList.items[itemIndex] = item;
      queryClient.setQueryData(queryKey, groceryList);
    },
  });

  const ready = !!profile && !!publicTypeIndex;
  return { ready, check: groceryListMutation };
};

export const useGroceryListItems = () => {
  const { profile, publicTypeIndex } = useProfile();
  const { isSuccess, data: groceryListItems } = useQuery(
    ["grocery_list_items", profile, publicTypeIndex],
    async () => {
      const manager = new GroceryListItemManager(profile!, publicTypeIndex!);
      return await manager.getGroceryListItems();
    },
    {
      enabled: !!profile && !!publicTypeIndex,
    }
  );
  return { isSuccess, groceryListItems };
};

export const useCreateGroceryList = () => {
  const { profile, publicTypeIndex } = useProfile();

  const queryClient = useQueryClient();
  const mutationFn = async (recipes: Recipe[]) => {
    if (!profile || !publicTypeIndex) {
      throw new Error("Resources not ready");
    }
    const manager = new GroceriesManager(profile, publicTypeIndex);
    return await manager.createFromRecipes(recipes);
  };
  const groceryListMutation = useMutation(mutationFn, {
    onSuccess: () => {
      queryClient.invalidateQueries("groceriesResources");
    },
  });

  const ready = !!profile && !!publicTypeIndex;
  return { ready, groceryListMutation };
};
