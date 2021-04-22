import { getGroceryListsResources } from "utils/api/helpers";

import { useProfile } from "ProfileContext";
import { useQuery } from "react-query";
import { groceryListSerializer } from "utils/api/serializers";
import { GroceryList } from "models/iris";
import { TripleSubject, TripleDocument } from "tripledoc";

export const getGroceryLists = async (
  profile: TripleSubject,
  publicTypeIndex: TripleDocument
) => {
  const { foods, groceryLists } = await getGroceryListsResources(
    profile,
    publicTypeIndex
  );
  return groceryLists
    .getAllSubjectsOfType(GroceryList)
    .map((groceryList) =>
      groceryListSerializer(groceryList, groceryLists, foods)
    );
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
