import styled from "styled-components";
import {
  space,
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
    FlexboxProps {}

const Box = styled.div<BoxInterface>(
  {
    boxSizing: "border-box",
    minWidth: 0,
  },
  space,
  color,
  layout,
  flexbox
);

export default Box;
