import styled from "styled-components";
import { variant, width, WidthProps, margin, MarginProps } from "styled-system";

type ButtonProps = {
  variant?: "outlined";
} & MarginProps &
  WidthProps;
const Button = styled.button<ButtonProps>`
  ${width};
  ${margin};
  padding: ${(props) => props.theme.space[1]}px;
  border-radius: ${(props) => props.theme.radii[1]}px;
  background-color: ${(props) => props.theme.colors.mandarinRed};
  color: white;
  font-weight: ${(props) => props.theme.fontWeights.bold};
  outline: none;
  border: none;
  font-family: ${(props) => props.theme.fonts.body};
  ${variant({
    variants: {
      outlined: {
        backgroundColor: "white",
        borderColor: "mandarinRed",
        borderStyle: "solid",
        color: "mandarinRed",
        borderWidth: 2,
      },
    },
  })}
`;

Button.defaultProps = {
  width: "100%",
};
export default Button;
