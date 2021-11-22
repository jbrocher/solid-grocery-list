import React from "react";
import { groupByShoppingCategory } from "utils/dataManipulation";
import Page from "components/templates/Page";
import GoBackHeader from "components/atoms/GoBackHeader";
import { useParams } from "react-router-dom";
import {
  useGroceryList,
  useEditGroceryList,
} from "utils/api/hooks/groceryLists";
import Text from "components/atoms/Text";
import Box from "@mui/material/Box";
import Loading from "pages/Loading";

type GroceryListParams = {
  identifier: string;
};
export const GroceryList: React.FunctionComponent = () => {
  const { identifier } = useParams<GroceryListParams>();

  const groceryListQuery = useGroceryList(identifier);
  const { ready, check } = useEditGroceryList(identifier);
  if (!groceryListQuery.isSuccess || !ready) {
    return <Loading />;
  }
  const list = groceryListQuery.data!;
  const groupedByCategory = groupByShoppingCategory(list);

  const renderList = () => {
    return Object.keys(groupedByCategory).map((category) => {
      return (
        <Box key={category}>
          <Text variant="h3"> {category} </Text>
          {groupedByCategory[category].map((item) => {
            return (
              <li key={item.identifier}>
                <input
                  onChange={() => check.mutate(item)}
                  type="checkbox"
                  checked={item.done}
                />
                {`${item.object.name} -x${item.quantity}`}
              </li>
            );
          })}
        </Box>
      );
    });
  };
  return (
    <Page>
      <GoBackHeader title={list.title} />
      {renderList()}
    </Page>
  );
};

export default GroceryList;
