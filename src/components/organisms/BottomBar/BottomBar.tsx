import React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import ShoppingCart from "components/icons/ShoppingCart";
import { Link as RouterLink } from "react-router-dom";
import Egg from "components/icons/Egg";
import Recipe from "components/icons/Recipe";
import { useHistory, useLocation } from "react-router";

const BottomBar: React.FunctionComponent = () => {
  const location = useLocation();
  if (location.pathname === "/") return null;
  return (
    <BottomNavigation showLabels>
      <BottomNavigationAction
        label="foods"
        component={RouterLink}
        to="/food-list"
        icon={<Egg />}
      >
        Foods
      </BottomNavigationAction>
      <BottomNavigationAction
        label="recipes"
        component={RouterLink}
        to="/recipe-list"
        icon={<Recipe />}
      >
        Recipes
      </BottomNavigationAction>
      <BottomNavigationAction
        label="groceries"
        component={RouterLink}
        to="/groceries"
        icon={<ShoppingCart />}
      >
        Groceries
      </BottomNavigationAction>
    </BottomNavigation>
  );
};

export default BottomBar;
