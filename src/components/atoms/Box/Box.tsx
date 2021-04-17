import styled from "styled-components";
import { a } from "react-spring";
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

const Box = styled(a.div)<BoxInterface>(
  {
    boxSizing: "border-box",
    width: "100%",
    minWidth: 0,
  },
  space,
  color,
  layout,
  flexbox
);

export default Box;
