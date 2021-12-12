import React from "react";

import Box from "@mui/material/Box";

const Main: React.FunctionComponent = ({ children }) => {
  return <Box flexGrow={1}>{children}</Box>;
};

export default Main
