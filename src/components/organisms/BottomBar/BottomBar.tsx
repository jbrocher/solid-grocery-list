import React from "react";
import { useLocation } from "react-router";
import NavButton from "components/molecules/NavButton";
import styled from "styled-components";
import ShoppingCart from "components/icons/ShoppingCart";
import Egg from "components/icons/Egg";
import Recipe from "components/icons/Recipe";

const Container = styled.div`
  width: 100%;
  display: flex;
`;
const BottomBar: React.FunctionComponent = () => {
  const location = useLocation();
  return (
    <Container>
      {location.pathname !== "/food-list" && (
        <NavButton to="/food-list" Icon={Egg}>
          Foods
        </NavButton>
      )}
      {location.pathname !== "/recipe-list" && (
        <NavButton to="/recipe-list" Icon={Recipe}>
          Recipes
        </NavButton>
      )}
      {location.pathname !== "/groceries" && (
        <NavButton to="/groceries" Icon={ShoppingCart}>
          Groceries
        </NavButton>
      )}
    </Container>
  );
};

export default BottomBar;
