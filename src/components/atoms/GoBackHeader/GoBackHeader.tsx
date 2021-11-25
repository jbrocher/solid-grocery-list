import React from "react";
import Box from "@mui/material/Box";
import Text from "components/atoms/Text";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import ArrowBack from "@mui/icons-material/ArrowBack";
import Typogragpy from "@mui/material/Typography";
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
