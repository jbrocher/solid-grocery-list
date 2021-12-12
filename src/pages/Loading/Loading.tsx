import React from "react";

import Box from "@mui/material/Box";

import Egg from "components/icons/Egg";
import HardEgg from "components/icons/HardEgg";

const Loading: React.FunctionComponent = () => {
  return (
    <>
      <Box
        sx={{
          "@keyframes dropFade": {
            "0%": {
              transform: "translate(-50%, -100vh)",
              opacity: "100%",
            },
            "50%": {
              transform: "translate(-50%, 0px)",
              opacity: "100%",
            },
            "100%": {
              opacity: "0%",
            },
          },
          "@keyframes fadeDrop": {
            "0%": {
              opacity: "0%",
            },
            "50%": {
              opacity: "100%",
            },
            "100%": {
              transform: "translate(-50%, 100vh)",
            },
          },
        }}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <HardEgg
          sx={{
            animation: "dropFade 2s linear infinite",
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            top: "50%",
            fontSize: 80,
          }}
        />
        <Egg
          sx={{
            position: "absolute",
            opacity: "0%",
            transform: "translateX(-50%)",
            left: "50%",
            top: "50%",
            animation: "fadeDrop 2s 1.5s linear infinite",
            fontSize: 80,
          }}
        />
      </Box>
    </>
  );
};

export default Loading;
