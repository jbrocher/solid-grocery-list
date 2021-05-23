import React from "react";
import BottomBarButton from "./components/BottomBarButton";
import styled from "styled-components";
import ShoppingCart from "components/icons/ShoppingCart";
import Egg from "components/icons/Egg";
import Recipe from "components/icons/Recipe";
import HomeButton from "components/icons/HomeButton";
import { useHistory, useLocation } from "react-router";

const Container = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HomeButtonContainer = styled.div`
  position: absolute;
  border-radius: ${(props) => props.theme.radii[2]}px;
  order: 2;
  border: solid 2px;
  border-color: ${(props) => props.theme.colors.mandarinRed};
  padding: ${(props) => props.theme.space[1]}px;
  width: ${(props) => props.theme.space[3]}px;
  height: ${(props) => props.theme.space[3]}px;
`;

const BottomBar: React.FunctionComponent = () => {
  const history = useHistory();
  const location = useLocation();
  if (location.pathname === "/") return null;
  const goHome = () => history.push("/");
  return (
    <Container>
      <HomeButtonContainer onClick={goHome}>
        <HomeButton />
      </HomeButtonContainer>
      <BottomBarButton to="/food-list" Icon={Egg}>
        Foods
      </BottomBarButton>
      <BottomBarButton to="/recipe-list" Icon={Recipe}>
        Recipes
      </BottomBarButton>
      <BottomBarButton to="/groceries" Icon={ShoppingCart}>
        Groceries
      </BottomBarButton>
    </Container>
  );
};

export default BottomBar;
