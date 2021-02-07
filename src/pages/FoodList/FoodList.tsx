import React, { useContext, useState, useEffect, useRef } from "react";
import { FoodManager, FoodItem } from "models/Food";
import { WebIdContext } from "App";
import Page from "components/templates/Page";
import Card from "components/atoms/Card";
import Text from "components/atoms/Text";

const FoodList: React.FunctionComponent = () => {
  const [foodList, setFoodList] = useState([] as FoodItem[]);
  const webId = useContext(WebIdContext);
  const foodManager = useRef(new FoodManager(webId));
  useEffect(() => {
    foodManager.current.all().then((list) => {
      if (list) setFoodList(foodManager.current.formatFoodList(list));
    });
  });

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
      {foodList.map((foodItem) =>
        renderFoodItem(foodItem.identifier, foodItem.category)
      )}
    </Page>
  );
};

export default FoodList;
