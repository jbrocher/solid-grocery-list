import React from "react";

import { useLocation } from "react-router";
import { Link as RouterLink } from "react-router-dom";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

import Recipe from "components/icons/Recipe";

const BottomBar: React.FunctionComponent = () => {
  const location = useLocation();
  if (location.pathname === "/") return null;
  return (
    <BottomNavigation showLabels>
      <BottomNavigationAction
        label="recipes"
        component={RouterLink}
        to="/recipe-list"
        icon={<Recipe />}
      />
      <BottomNavigationAction
        label="groceries"
        component={RouterLink}
        to="/groceries"
        icon={<ShoppingCartIcon />}
      />
    </BottomNavigation>
  );
};

export default BottomBar;
