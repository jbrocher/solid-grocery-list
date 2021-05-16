import React from "react";
import Button from "components/atoms/Button";
import { useFoodList } from "utils/api/hooks/food";
import Page from "components/templates/Page";
import GoBackHeader from "components/atoms/GoBackHeader";
import Loading from "pages/Loading";
import ContentContainer from "components/templates/ContentContainer";
import { useHistory } from "react-router";
import Card from "components/atoms/Card";
import Text from "components/atoms/Text";

const FoodList: React.FunctionComponent = () => {
  const foodList = useFoodList();

  const history = useHistory();
  const goToFoodForm = () => {
    history.push("/food-form");
  };
  const renderFoodItem = (name: string, shoppingCategory: string) => {
    return (
      <Card p={1} marginY={1} key={name}>
        <Text type="h3"> {name} </Text>
        <Text type="body"> {`Rayon: ${shoppingCategory}`} </Text>
      </Card>
    );
  };

  if (!foodList) {
    return <Loading />;
  }

  return (
    <Page>
      <GoBackHeader title="foods" />
      <ContentContainer>
        {foodList.map((foodItem) =>
          renderFoodItem(foodItem.name, foodItem.category)
        )}
      </ContentContainer>
      <Button onClick={goToFoodForm}> Add a Food </Button>
    </Page>
  );
};

export default FoodList;
