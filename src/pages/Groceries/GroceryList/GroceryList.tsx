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
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemSecondaryAction from "@mui/material/ListItemButton";
import Checkbox from "@mui/material/Checkbox";
import Loading from "pages/Loading";
import Typography from "@mui/material/Typography";

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
          <Text variant="h6"> {category} </Text>
          <List>
            {groupedByCategory[category].map((item) => {
              return (
                <ListItemButton onClick={() => check.mutate(item)} dense>
                  <ListItem
                    sx={{
                      justifyContent: "space-between",
                    }}
                    disablePadding
                    key={item.identifier}
                  >
                    <Box>
                      <Checkbox edge="start" checked={item.done} />
                      {item.object.name}
                    </Box>
                    <Typography
                      color="text.secondary"
                      fontWeight="bolder"
                      variant="body2"
                    >
                      {item.quantity}
                    </Typography>
                  </ListItem>
                </ListItemButton>
              );
            })}
          </List>
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
