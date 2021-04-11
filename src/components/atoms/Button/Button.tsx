import styled from "styled-components";
import { width, WidthProps, margin, MarginProps } from "styled-system";
const Button = styled.button<WidthProps & MarginProps>`
  ${width};
  ${margin};
  padding: ${(props) => props.theme.radii[1]}px;
  border-radius: ${(props) => props.theme.radii[1]}px;
  background-color: ${(props) => props.theme.colors.mandarinRed};
  color: white;
  font-weight: ${(props) => props.theme.fontWeights.bold};
  outline: none;
  border: none;
  font-family: ${(props) => props.theme.fonts.body};
`;

Button.defaultProps = {
  width: "100%",
};
export default Button;
