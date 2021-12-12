import React from "react";

import Box from "@mui/material/Box";

export const Content: React.FunctionComponent = ({ children }) => {
  return (
    <Box overflow="auto" flexShrink={1} flexGrow={1}>
      {children}
    </Box>
  );
};

export default Content;
