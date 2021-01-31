import React from "react";
import styled from "styled-components";
import Box from "components/atoms/Box";

const StyledInput = styled.input`
  font-family: ${(props) => props.theme.fonts.body};
  border: solid 3px ${(props) => props.theme.colors.taupe};
  border-radius: ${(props) => props.theme.radii[0]}px;
  height: ${(props) => props.theme.space[4]}px;
  &:focus {
    border: solid 3px ${(props) => props.theme.colors.beige};
    outline: none;
  }
`;

const StyledLabel = styled.label`
  font-family: ${(props) => props.theme.fonts.body};
  color: ${(props) => props.theme.colors.grey};
  font-weight: ${(props) => props.theme.fontWeights.bold};
`;

export type InputProps = {
  label: string;
  value: string;
  name: string;
} & React.HtmlHTMLAttributes<HTMLInputElement>;

const Input: React.FC<InputProps> = ({
  label,
  value,
  name,
  ...rest
}: InputProps) => {
  return (
    <Box display="flex" flexDirection="column">
      <StyledLabel> {label} </StyledLabel>
      <StyledInput value={value} name={name} {...rest} />
    </Box>
  );
};

export default Input;
