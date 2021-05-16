import React from "react";
import Box from "components/atoms/Box";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import Text from "components/atoms/Text";

import { useHistory } from "react-router";
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
      <Text type="h3" textAlign="center">
        {title}
      </Text>
    </Box>
  );
};

export default LinkButton;
