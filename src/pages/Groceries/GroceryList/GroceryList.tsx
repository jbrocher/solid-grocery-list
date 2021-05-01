import React from "react";
import { groupByShoppingCategory } from "utils/dataManipulation";
import Page from "components/templates/Page";
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
  if (!groceryListQuery.isSuccess) {
    return <Loading />;
  }
  const list = groceryListQuery.groceryList!;
  const groupedByCategory = groupByShoppingCategory(list);

  const renderList = () => {
    return Object.keys(groupedByCategory).map((category) => {
      return (
        <Box key={category}>
          <Text type="h3"> {category} </Text>
          {groupedByCategory[category].map((item) => {
            return (
              <li key={item.identifier}>
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
      <Text type="h1"> {list.title} </Text>
      {renderList()}
    </Page>
  );
};

export default GroceryList;
