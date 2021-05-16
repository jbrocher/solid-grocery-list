import styled from "styled-components";
import { animated } from "react-spring";
import {
  space,
  border,
  BorderProps,
  color,
  layout,
  flexbox,
  SpaceProps,
  ColorProps,
  LayoutProps,
  FlexboxProps,
} from "styled-system";

interface BoxInterface
  extends SpaceProps,
    ColorProps,
    LayoutProps,
    FlexboxProps,
    BorderProps {}

const Box = animated(
  styled.div<BoxInterface>(
    {
      boxSizing: "border-box",
      width: "100%",
      minWidth: 0,
    },
    space,
    color,
    layout,
    flexbox,
    border
  )
);

export default Box;
