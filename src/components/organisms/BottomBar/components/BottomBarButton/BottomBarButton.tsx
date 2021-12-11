import React from "react";

import { useLocation } from "react-router";

import NavButton from "components/molecules/NavButton";

type BottomBarProps = React.ComponentProps<typeof NavButton>;
const BottomBarButton: React.FunctionComponent<BottomBarProps> = ({
  to,
  ...rest
}: BottomBarProps) => {
  const location = useLocation();
  return (
    <>{!location.pathname.includes(to) && <NavButton to={to} {...rest} />}</>
  );
};

export default BottomBarButton;
