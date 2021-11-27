import React from "react";
import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";

const ShoppingCart: React.FunctionComponent = (props: SvgIconProps) => (
  <SvgIcon viewBox="0 0 32 32" {...props}>
    <defs>
      <style>.cls-1</style>
    </defs>
    <title>shopping--cart</title>
    <circle cx="10" cy="28" r="2" />
    <circle cx="24" cy="28" r="2" />
    <path d="M28,7H5.82L5,2.8A1,1,0,0,0,4,2H0V4H3.18L7,23.2A1,1,0,0,0,8,24H26V22H8.82L8,18H26a1,1,0,0,0,1-.78l2-9A1,1,0,0,0,28,7Zm-2.8,9H7.62L6.22,9H26.75Z" />
    <rect
      id="_Transparent_Rectangle_"
      data-name="&lt;Transparent Rectangle&gt;"
      width="32"
      height="32"
    />
  </SvgIcon>
);
