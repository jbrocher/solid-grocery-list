import React from "react";

import Box from "@mui/material/Box";

import styled from "styled-components";

const StyledInput = styled.input`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes[1]};
  border: solid 2px ${(props) => props.theme.colors.melon};
  border-radius: ${(props) => props.theme.radii[0]}px;
  height: ${(props) => props.theme.space[4]}px;
  &:focus {
    border: solid 2px ${(props) => props.theme.colors.mandarinRed};
    outline: none;
  }
`;

const StyledLabel = styled.label`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes[1]}px;
  color: ${(props) => props.theme.colors.grey};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  margin-bottom: ${(props) => props.theme.space[1]}px;
`;

export type InputProps = {
  label: string;
  value: string;
  name: string;
} & React.ComponentProps<typeof StyledInput>;

const Input: React.FC<InputProps> = ({
  label,
  value,
  name,
  ...rest
}: InputProps) => {
  return (
    <Box width="100%" display="flex" flexDirection="column">
      <StyledLabel> {label} </StyledLabel>
      <StyledInput value={value} name={name} {...rest} />
    </Box>
  );
};

export default Input;
