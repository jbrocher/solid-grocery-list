import React, { useContext } from "react";

import CloseIcon from "@mui/icons-material/Close";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";

import { FormDialogContext } from "./FormDialog";

const Header: React.FunctionComponent = ({ children }) => {
  const { onClose } = useContext(FormDialogContext);
  return (
    <AppBar sx={{ position: "relative" }}>
      <Toolbar>
        <Box flexGrow={1}>{children}</Box>
        <IconButton color="inherit" onClick={onClose} aria-label="close">
          <CloseIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
