import React from "react";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

interface AppBarProps {
  title: string;
}
const Header: React.FunctionComponent<AppBarProps> = ({ title }) => {
  return (
    <AppBar>
      <Toolbar></Toolbar>
    </AppBar>
  );
};
