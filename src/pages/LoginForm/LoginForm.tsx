import React, { useState } from "react";

import { use100vh } from "utils/use100vh";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import Text from "components/atoms/Text";
import PodProviderModal from "components/organisms/modals/PodProviderModal";

const LoginForm: React.FunctionComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = (_e: any) => setIsModalOpen(!isModalOpen);
  const windowHeight = use100vh();
  return (
    <Box height={`${windowHeight}px`} display="flex" flexDirection="column">
      <Box
        justifyContent="center"
        display="flex"
        flexDirection="column"
        flexGrow={1}
      >
        <Text textAlign="center" variant="h1">
          Solid Grocery List
        </Text>
      </Box>
      <Button color="primary" variant="contained" onClick={toggleModal}>
        Login
      </Button>

      <PodProviderModal isOpen={isModalOpen} toggle={toggleModal} />
    </Box>
  );
};

export default LoginForm;
