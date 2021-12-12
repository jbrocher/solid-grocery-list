import React from "react";

import Box from "@mui/material/Box";

export const Content: React.FunctionComponent = ({ children }) => {
  return (
    <Box
      width="100%"
      padding={2}
      overflow="auto"
      minHeight={0}
      flexShrink={1}
      flexGrow={1}
    >
      {children}
    </Box>
  );
};

export default Content;
