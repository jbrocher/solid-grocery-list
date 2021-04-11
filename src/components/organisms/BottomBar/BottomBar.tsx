import React from "react";
import NavButton from "components/molecules/NavButton";
import styled from "styled-components";
import Egg from "components/icons/Egg";
import Recipe from "components/icons/Recipe";

const Container = styled.div`
  width: 100%;
  display: flex;
`;
const BottomBar: React.FunctionComponent = () => {
  return (
    <Container>
      <NavButton to="/food-list" Icon={Egg}>
        Foods
      </NavButton>
      <NavButton to="/recipe-list" Icon={Recipe}>
        Recipes
      </NavButton>
    </Container>
  );
};

export default BottomBar;
