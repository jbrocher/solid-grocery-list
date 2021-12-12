import React from "react";

import Box from "@mui/material/Box";

interface ContentContainerProps {
  children: React.ReactNode;
}
const ContentContainer: React.FunctionComponent<ContentContainerProps> = ({
  children,
}) => {
  return (
    <Box
      padding={2}
      flexShrink={1}
      overflow="auto"
      mb={1}
      minHeight={0}
      flexGrow={1}
    >
      {children}
    </Box>
  );
};

export default ContentContainer;
