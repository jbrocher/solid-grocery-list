import React from "react";
import { useFoodList } from "utils/api/hooks";
import Page from "components/templates/Page";
import Card from "components/atoms/Card";
import Text from "components/atoms/Text";

const FoodList: React.FunctionComponent = () => {
  const food = useFoodList();

  const renderFoodItem = (identifier: string, shoppingCategory: string) => {
    return (
      <Card p={1} marginY={1} key={identifier}>
        <Text type="h3"> {identifier} </Text>
        <Text type="body"> {`Rayon: ${shoppingCategory}`} </Text>
      </Card>
    );
  };

  return (
    <Page>
      {food.foodItems.map((foodItem) =>
        renderFoodItem(foodItem.identifier, foodItem.category)
      )}
    </Page>
  );
};

export default FoodList;
