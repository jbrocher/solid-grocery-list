import React from "react";

import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Box from "@mui/material/Box";

import Text from "components/atoms/Text";

interface ButtonProps {
  title: string;
}
const Button: React.FunctionComponent<ButtonProps> = ({
  title,
}: ButtonProps) => {
  return (
    <Box display="flex" flexDirection="row" alignItems="center">
      <KeyboardArrowRightIcon />
      <Text variant="h3" textAlign="center">
        {title}
      </Text>
    </Box>
  );
};

export default Button;
