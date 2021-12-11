import React from "react";

import { useHistory } from "react-router";

import ArrowBack from "@mui/icons-material/ArrowBack";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typogragpy from "@mui/material/Typography";

interface GoBackHeaderProps {
  title: string;
}

const GoBackHeader: React.FunctionComponent<GoBackHeaderProps> = ({
  title,
}: GoBackHeaderProps) => {
  const history = useHistory();
  const goBack = () => history.goBack();
  return (
    <AppBar>
      <Toolbar>
        <IconButton color="inherit" onClick={goBack}>
          <ArrowBack />
        </IconButton>
        <Typogragpy variant="h6"> {title} </Typogragpy>
      </Toolbar>
    </AppBar>
  );
};

export default GoBackHeader;
