import React from "react";
import Box from "components/atoms/Box";
import { NavLink, NavLinkProps } from "react-router-dom";
import styled from "styled-components";

import Text from "components/atoms/Text";

const StyledNavLink = styled(NavLink)`
  padding: ${(props) => props.theme.space[2]}px;
  color: black;
  text-decoration: none;
  display: flex;
  align-items: center;
  flex-direction: column;
  flex-grow: 1;
  &.active {
    color: ${(props) => props.theme.colors.mandarinRed};
  }
`;

export type NavButtonProps = {
  children: React.ReactNode;
  Icon?: React.FunctionComponent;
} & NavLinkProps;

const NavButton: React.FunctionComponent<NavButtonProps> = ({
  children,
  Icon,
  ...navLinkProps
}: NavButtonProps) => {
  return (
    <StyledNavLink activeClassName="active" {...navLinkProps}>
      <Box width="1em" height="1em">
        {Icon && <Icon />}
      </Box>
      <Text type="h3" color="inherit">
        {children}
      </Text>
    </StyledNavLink>
  );
};

export default NavButton;
