import React from "react";
import Box from "components/atoms/Box";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
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
      <Text type="h3" textAlign="center">
        {title}
      </Text>
    </Box>
  );
};

export default Button;
