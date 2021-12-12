import React from "react";

import {
  NavLink as RouterNavLink,
  NavLinkProps as RouterNavLinkProps,
} from "react-router-dom";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { styled } from "@mui/material/styles";

import Recipe from "components/icons/Recipe";

const StyledNavLink = styled(RouterNavLink)(({ theme }) => ({
  "&.active": {
    color: theme.palette.primary.main,
  },
}));

const LinkBehavior = React.forwardRef<any, RouterNavLinkProps>((props, ref) => (
  <StyledNavLink ref={ref} {...props} role={undefined} />
));
const BottomBar: React.FunctionComponent = () => {
  return (
    <BottomNavigation showLabels>
      <BottomNavigationAction
        label="recipes"
        component={LinkBehavior}
        activeClassName="active"
        to="/recipe-list"
        icon={<Recipe />}
      />
      <BottomNavigationAction
        label="groceries"
        activeClassName="active"
        component={LinkBehavior}
        to="/groceries"
        icon={<ShoppingCartIcon />}
      />
    </BottomNavigation>
  );
};

export default BottomBar;
