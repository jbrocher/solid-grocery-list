import React from "react";
import Text from "components/atoms/Text";
import Egg from "components/icons/Egg";
import Box from "@mui/material/Box";
import Page from "components/templates/Page";

const Loading: React.FunctionComponent = () => {
  return (
    <Page sx={{ justifyContent: "center", alignItems: "center" }}>
      <Box mb={3} width="56px" height="56px">
        <Egg />
      </Box>
      <Text variant="h3"> Loading ... </Text>
    </Page>
  );
};

export default Loading;
