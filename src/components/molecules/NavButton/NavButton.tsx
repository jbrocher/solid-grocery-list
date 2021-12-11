import React from "react";

import { NavLink, NavLinkProps } from "react-router-dom";

import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

import Text from "components/atoms/Text";

const StyledNavLink = styled(NavLink)`
  color: black;
  text-decoration: none;
  display: flex;
  align-items: center;
  flex-direction: column;
  flex-grow: 1;
  flex-basis: 0px;
  flex-shrink: 1;
  &.active {
    color: ${(props) => props.theme.colors.mandarinRed};
  }
  $
`;

export type NavButtonProps = {
  children: React.ReactNode;
  to: string;
  Icon?: React.FunctionComponent;
};

const NavButton: React.FunctionComponent<NavButtonProps> = ({
  children,
  Icon,
  to,
  ...navLinkProps
}: NavButtonProps) => {
  return (
    <StyledNavLink activeClassName="active" to={to} {...navLinkProps}>
      <Box width="1em" height="1em">
        {Icon && <Icon />}
      </Box>
      <Text variant="h4" color="inherit">
        {children}
      </Text>
    </StyledNavLink>
  );
};

export default NavButton;
