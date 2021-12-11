import { Meta, Story } from "@storybook/react/types-6-0";

import React from "react";

import { BrowserRouter as Router } from "react-router-dom";

import NavButton, { NavButtonProps } from "./NavButton";

export default {
  title: "molecules/NavButton",
  component: NavButton,
} as Meta;

export const Base: Story<NavButtonProps> = () => (
  <Router>
    <NavButton to="/">Lorep Ipsum</NavButton>
  </Router>
);

Base.args = {};
