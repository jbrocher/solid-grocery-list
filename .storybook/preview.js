import React from "react";
import theme from "theme";
import { ThemeProvider } from "styled-components";
// Necessary to access fonts
import "../src/index.css";

export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <Story />
    </ThemeProvider>
  ),
];
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
};
