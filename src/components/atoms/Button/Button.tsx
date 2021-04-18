import styled from "styled-components";
import { variant, width, WidthProps, margin, MarginProps } from "styled-system";

type BaseButtonProps = {
  variant: "outlined" | "disabled";
} & MarginProps &
  WidthProps;

const BaseButton = styled.button<BaseButtonProps>`
  ${width};
  ${margin};
  font-size: ${(props) => props.theme.fontSizes[1]}px;
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
      disabled: {
        opacity: 0.5,
      },
    },
  })}
`;

export type ButtonProps = {
  disabled?: boolean;
  children: React.ReactNode;
} & React.ComponentProps<typeof BaseButton>;

const Button: React.FunctionComponent<ButtonProps> = ({
  disabled,
  children,
  variant,
  ...rest
}: ButtonProps) => {
  return (
    <BaseButton
      disabled={disabled}
      variant={disabled ? "disabled" : variant}
      {...rest}
    >
      {children}
    </BaseButton>
  );
};

Button.defaultProps = {
  width: "100%",
  disabled: false,
};
export default Button;
