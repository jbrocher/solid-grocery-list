import React from "react";
import Box from "components/atoms/Box";
import { NavLink, NavLinkProps } from "react-router-dom";
import styled from "styled-components";
import { variant, margin, MarginProps } from "styled-system";

import Text from "components/atoms/Text";

const StyledNavLink = styled(NavLink)`
 ${margin}
  padding: ${(props) => props.theme.space[2]}px;
  color: black;
  text-decoration: none;
  display: flex;
  align-items: center;
  flex-direction: column;
  flex-grow: 1;
  flex-basis: 0px;
  flex-shrin; :1;
  &.active {
    color: ${(props) => props.theme.colors.mandarinRed};
  }
  ${variant({
    variants: {
      outlined: {
        borderWidth: "2px",
        borderColor: "mandarinRed",
        borderStyle: "solid",
        borderRadius: "2",
      },
    },
  })}
`;

export type NavButtonProps = {
  children: React.ReactNode;
  variant?: "outlined";
  Icon?: React.FunctionComponent;
} & NavLinkProps &
  MarginProps;

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
