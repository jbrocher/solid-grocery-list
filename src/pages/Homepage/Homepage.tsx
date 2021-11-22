import React from "react";
import Page from "components/templates/Page";
import NavButton from "components/molecules/NavButton";
import ShoppingCart from "components/icons/ShoppingCart";
import Egg from "components/icons/Egg";
import Recipe from "components/icons/Recipe";
import Text from "components/atoms/Text";

import Box from "@mui/material/Box";

export const Homepage: React.FunctionComponent = () => {
  return (
    <Page sx={{ justifyContent: "center", alignItems: "center" }}>
      <Text variant="h2"> Solid Grocery List </Text>
      <Box>
        <NavButton   to="/food-list" Icon={Egg}>
          Foods
        </NavButton>
        <Box display="flex">
          <NavButton    to="/recipe-list" Icon={Recipe}>
            Recipes
          </NavButton>
          <NavButton
            to="/groceries"
            Icon={ShoppingCart}
          >
            Groceries
          </NavButton>
        </Box>
      </Box>
    </Page>
  );
};

export default Homepage;
