import React from "react";
import { createTheme } from "@mui/material";
import { LinkProps } from "@mui/material/Link";
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";

const LinkBehavior = React.forwardRef<
  any,
  Omit<RouterLinkProps, "to"> & { href: RouterLinkProps["to"] }
>(({ href, ...other }, ref) => {
  return <RouterLink ref={ref} to={href} {...other} />;
});

export const theme = {
  space: [0, 8, 16, 24, 32, 40, 48],
  fontSizes: [16, 20, 24, 32, 40, 48],
  fonts: {
    body: "Roboto Mono",
  },
  fontWeights: {
    normal: 400,
    bold: 700,
  },
  colors: {
    melon: "#f8c291",
    mandarinRed: "#e55039",
    goodSamaritan: "#3c6382",
    forestBlues: "#0a3d62",
    dupain: "#60a3bc",
    waterfall: "#38ada9",
    white: "white",
  },
  palette: {
    primary: {
      main: "#e55039",
    },
    secondary: {
      main: "#FFFFFF",
    },
  },
  radii: [5, 10, 15, 20],
  components: {
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior,
      },
    },
  },
};
export const muiTheme = createTheme(theme);

declare module "@mui/material/styles" {
  interface Theme {
    space: number[];
    fontSizes: number[];
    fonts: {
      body: string;
    };
    fontWeights: {
      normal: number;
      bold: number;
    };
    colors: {
      melon: string;
      mandarinRed: string;
      goodSamaritan: string;
      forestBlues: string;
      dupain: string;
      waterfall: string;
      white: string;
    };
    radii: number[];
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    space: number[];
    fontSizes: number[];
    fonts?: {
      body?: string;
    };
    fontWeights?: {
      normal?: number;
      bold?: number;
    };
    colors?: {
      melon?: string;
      mandarinRed?: string;
      goodSamaritan?: string;
      forestBlues?: string;
      dupain?: string;
      waterfall?: string;
      white?: string;
    };
    radii?: number[];
  }
}
export default muiTheme;
