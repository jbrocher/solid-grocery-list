import React from "react";
import { useLocation } from "react-router";
import NavButton from "components/molecules/NavButton";
import styled from "styled-components";
import ShoppingCart from "components/icons/ShoppingCart";
import Egg from "components/icons/Egg";
import Recipe from "components/icons/Recipe";
import HomeButton from "components/icons/HomeButton";
import { useHistory } from "react-router";

const Container = styled.div`
  width: 100%;
  position: relative;
  display: flex;
`;

const HomeButtonContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: ${(props) => props.theme.radii[2]}px;
  border: solid 2px;
  border-color: ${(props) => props.theme.colors.mandarinRed};
  padding: ${(props) => props.theme.space[1]}px;
  width: ${(props) => props.theme.space[3]}px;
  height: ${(props) => props.theme.space[3]}px;
  transform: translate(-50%, -50%);
`;

const BottomBar: React.FunctionComponent = () => {
  const location = useLocation();
  const history = useHistory();
  const goHome = () => history.push("/");
  return (
    <Container>
      {location.pathname !== "/" && (
        <HomeButtonContainer onClick={goHome}>
          <HomeButton />
        </HomeButtonContainer>
      )}
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
