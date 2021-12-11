import React from "react";

import { useHistory } from "react-router";

import { useFoodList } from "utils/api/hooks/food";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";

import Loading from "pages/Loading";

import GoBackHeader from "components/atoms/GoBackHeader";
import Page from "components/templates/Page";

const renderFoodItem = (name: string, shoppingCategory: string) => {
  return (
    <Grid xs item key={name}>
      <Card>
        <CardHeader
          title={name}
          subheader={`Rayon: ${shoppingCategory}`}
          variant="h3"
        />
      </Card>
    </Grid>
  );
};
const FoodList: React.FunctionComponent = () => {
  const foodList = useFoodList();

  const history = useHistory();
  const goToFoodForm = () => {
    history.push("/food-form");
  };

  if (!foodList) {
    return <Loading />;
  }

  return (
    <Page>
      <GoBackHeader title="foods" />
      <Grid sx={{ overflow: "auto" }} padding={2} spacing={2} container>
        {foodList.map((foodItem) =>
          renderFoodItem(foodItem.name, foodItem.category)
        )}
      </Grid>
      <Button onClick={goToFoodForm}> Add a Food </Button>
    </Page>
  );
};

export default FoodList;
