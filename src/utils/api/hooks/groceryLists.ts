import GroceriesManager from "models/Groceries";
import GroceryListItemManager from "models/GroceryListItem";
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
  const manager = new GroceriesManager(profile, publicTypeIndex);
  const {
    foods,
    groceryLists,
    groceryListItems,
  } = await manager.getGroceriesResources();
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
    const manager = new GroceriesManager(
      groceriesResources.profile!,
      groceriesResources.publicTypeIndex!
    );
    const ref = manager.makeRef(identifier);
    groceryList = groceryListSerializer(
      groceriesResources.data.groceryLists.getSubject(ref),
      groceriesResources.data.groceryListItems,
      groceriesResources.data.foods
    );
  }

  return { isSuccess: groceriesResources.isSuccess, groceryList };
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
      queryClient.invalidateQueries("grocery_lists");
    },
  });

  const ready = !!profile && !!publicTypeIndex;
  return { ready, groceryListMutation };
};
