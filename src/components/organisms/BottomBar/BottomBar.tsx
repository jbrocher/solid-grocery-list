import React from "react";

import { useLocation } from "react-router";
import { Link as RouterLink } from "react-router-dom";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

import Egg from "components/icons/Egg";
import Recipe from "components/icons/Recipe";

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
        icon={<ShoppingCartIcon />}
      >
        Groceries
      </BottomNavigationAction>
    </BottomNavigation>
  );
};

export default BottomBar;
