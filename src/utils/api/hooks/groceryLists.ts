import GroceriesManager from "models/Groceries";
import GroceryListItemManager from "models/GroceryListItem";
import { rdf } from "rdf-namespaces";
import {
  GroceryListItem,
  Recipe,
  GroceryList as GroceryListType,
} from "utils/api/types";
import { GroceryList } from "models/iris";
import { useProfile } from "ProfileContext";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { groceryListSerializer } from "utils/api/serializers";
import {
  getThing,
  getThingAll,
  getUrl,
  ThingPersisted,
} from "@inrupt/solid-client";

export const useGroceries = () => {
  const { profile } = useProfile();
  const query = useQuery(
    ["groceries", profile],
    async () => {
      const manager = new GroceriesManager(profile!);
      return await manager.getGroceries();
    },
    {
      enabled: !!profile,
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
  const { profile } = useProfile();
  const query = useQuery(
    ["groceriesResources", profile],
    async () => {
      const manager = new GroceriesManager(profile!);
      return await manager.getGroceriesResources();
    },
    {
      enabled: !!profile,
    }
  );

  return { ...query, profile };
};
export const useGroceryLists = () => {
  const groceriesResources = useGroceriesResources();

  let groceryLists: GroceryListType[] = [];
  if (groceriesResources.isSuccess) {
    groceryLists = getThingAll(groceriesResources.data.groceryLists)
      .filter((list) => getUrl(list, rdf.type) === GroceryList)
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
  const { profile } = useProfile();
  const query = useQuery(
    ["grocery_list", identifier],
    async () => {
      const manager = new GroceriesManager(profile!);
      const groceriesResources = await manager.getGroceriesResources();
      const ref = manager.makeRef(identifier);
      return groceryListSerializer(
        getThing(groceriesResources.groceryLists, ref) as ThingPersisted,
        groceriesResources.groceryListItems,
        groceriesResources.foods
      );
    },
    {
      enabled: !!profile,
    }
  );
  return query;
};

export const useEditGroceryList = (listIdentifier: string) => {
  const { profile } = useProfile();
  const queryClient = useQueryClient();
  const mutationFn = async (item: GroceryListItem) => {
    if (!profile) {
      throw new Error("Resources not ready");
    }
    const manager = new GroceriesManager(profile);
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

  const ready = !!profile;
  return { ready, check: groceryListMutation };
};

export const useGroceryListItems = () => {
  const { profile } = useProfile();
  const { isSuccess, data: groceryListItems } = useQuery(
    ["grocery_list_items", profile],
    async () => {
      const manager = new GroceryListItemManager(profile!);
      return await manager.getGroceryListItems();
    },
    {
      enabled: !!profile,
    }
  );
  return { isSuccess, groceryListItems };
};

export const useCreateGroceryList = () => {
  const { profile } = useProfile();

  const queryClient = useQueryClient();
  const mutationFn = async ({
    recipes,
    listName,
  }: {
    recipes: Recipe[];
    listName: string;
  }) => {
    if (!profile) {
      throw new Error("Resources not ready");
    }
    const manager = new GroceriesManager(profile);
    return await manager.createFromRecipes(recipes, listName);
  };
  const groceryListMutation = useMutation(mutationFn, {
    onSuccess: () => {
      queryClient.invalidateQueries("groceriesResources");
    },
  });

  const ready = !!profile;
  return { ready, groceryListMutation };
};
