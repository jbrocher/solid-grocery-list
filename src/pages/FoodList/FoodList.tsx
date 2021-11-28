import React from "react";
import Button from "@mui/material/Button";
import { useFoodList } from "utils/api/hooks/food";
import Page from "components/templates/Page";
import GoBackHeader from "components/atoms/GoBackHeader";
import Loading from "pages/Loading";
import { useHistory } from "react-router";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";

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
