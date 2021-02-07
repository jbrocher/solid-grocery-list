import styled from "styled-components";
import {
  color,
  ColorProps,
  width,
  WidthProps,
  padding,
  PaddingProps,
  margin,
  MarginProps,
} from "styled-system";

export type CardProps = ColorProps & WidthProps & PaddingProps & MarginProps;

const Card = styled.div<CardProps>`
  ${padding};
  ${margin};
  ${color};
  ${width};
  border-radius: ${(props) => props.theme.radii[1]}px;
  box-sizing: border-box;
`;

Card.defaultProps = {
  backgroundColor: "taupe",
  width: "100%",
};

export default Card;
