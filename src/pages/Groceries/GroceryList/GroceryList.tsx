import React from "react";
import { useParams } from "react-router-dom";
import { useGroceryList } from "utils/api/hooks/groceryLists";
import Text from "components/atoms/Text";
import Box from "components/atoms/Box";
import Loading from "pages/Loading";

type GroceryListParams = {
  identifier: string;
};
export const GroceryList: React.FunctionComponent = () => {
  const { identifier } = useParams<GroceryListParams>();

  const groceryListQuery = useGroceryList(identifier);
  console.log(groceryListQuery.groceryList);
  if (!groceryListQuery.isSuccess) {
    return <Loading />;
  }
  const list = groceryListQuery.groceryList!;
  return (
    <Box>
      <Text type="h1"> {list.title} </Text>
      {list.items.map((item) => {
        return <li> {item.object.name}</li>;
      })}
    </Box>
  );
};

export default GroceryList;
