import React from "react";
import Box from "@mui/material/Box";
import Text from "components/atoms/Text";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { useHistory } from "react-router";

interface GoBackHeaderProps {
  title: string;
}

const GoBackHeader: React.FunctionComponent<GoBackHeaderProps> = ({
  title,
}: GoBackHeaderProps) => {
  const history = useHistory();
  const goBack = () => history.goBack();
  return (
    <Box
      mb={3}
      p={1}
      onClick={goBack}
      display="flex"
      alignItems="center"
      borderBottom="solid"
      borderColor="mandarinRed"
    >
      <KeyboardArrowLeftIcon />
      <Text ml={2} variant="h2">
        {title}
      </Text>
    </Box>
  );
};

export default GoBackHeader;
