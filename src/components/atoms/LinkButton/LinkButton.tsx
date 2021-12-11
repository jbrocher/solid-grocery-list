import React from "react";

import { useHistory } from "react-router";

import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Box from "@mui/material/Box";

import Text from "components/atoms/Text";

interface LinkButtonProps {
  link: string;
  title: string;
}
const LinkButton: React.FunctionComponent<LinkButtonProps> = ({
  link,
  title,
}: LinkButtonProps) => {
  const history = useHistory();
  const go = () => {
    history.push(link);
  };
  return (
    <Box onClick={go} display="flex" flexDirection="row" alignItems="center">
      <KeyboardArrowRightIcon />
      <Text variant="h3" textAlign="center">
        {title}
      </Text>
    </Box>
  );
};

export default LinkButton;
