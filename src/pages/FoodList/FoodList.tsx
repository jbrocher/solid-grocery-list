import React from "react";
import Button from "components/atoms/Button";
import { useFoodList } from "utils/api/hooks";
import Page from "components/templates/Page";
import ContentContainer from "components/templates/ContentContainer";
import { useHistory } from "react-router";
import Card from "components/atoms/Card";
import Text from "components/atoms/Text";

const FoodList: React.FunctionComponent = () => {
  const food = useFoodList();

  const history = useHistory();
  const goToFoodForm = () => {
    history.push("/food-form");
  };
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
      <ContentContainer>
        {food.foodItems.map((foodItem) =>
          renderFoodItem(foodItem.identifier, foodItem.category)
        )}
      </ContentContainer>
      <Button onClick={goToFoodForm}> Add a Food </Button>
    </Page>
  );
};

export default FoodList;
