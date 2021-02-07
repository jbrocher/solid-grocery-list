import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  position: fixed;
  bottom: 0px;
  width: 100%;
`;
const BottomBar: React.FunctionComponent = () => {
  return (
    <Container>
      <NavLink to="/"> Ajouer une nourriture </NavLink>
      <NavLink to="/food-list"> Nourriture existante </NavLink>
    </Container>
  );
};

export default BottomBar;
