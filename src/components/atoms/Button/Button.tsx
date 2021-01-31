import styled from "styled-components";
import { width, WidthProps, margin, MarginProps } from "styled-system";
const Button = styled.button<WidthProps & MarginProps>`
  ${width};
  ${margin};
  border-radius: ${(props) => props.theme.radii[3]}px;
  background-color: ${(props) => props.theme.colors.grey};
  color: white;
  height: ${(props) => props.theme.space[4]}px;
  font-weight: ${(props) => props.theme.fontWeights.bold};
  outline: none;
  border: solid 3px ${(props) => props.theme.colors.beige};
  font-family: ${(props) => props.theme.fonts.body};
`;

export default Button;
