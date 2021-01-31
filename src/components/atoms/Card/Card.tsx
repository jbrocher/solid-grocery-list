import styled from "styled-components";
import {
  color,
  ColorProps,
  width,
  WidthProps,
  padding,
  PaddingProps,
} from "styled-system";

const Card = styled.div<ColorProps & WidthProps & PaddingProps>`
  ${padding};
  ${color};
  ${width};
  border-radius: ${(props) => props.theme.radii[1]}px;
  box-sizing: border-box;
`;

Card.defaultProps = {
  backgroundColor: "taupe",
};

export default Card;
