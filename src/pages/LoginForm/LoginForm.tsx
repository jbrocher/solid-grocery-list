import React, { useState } from "react";
import Box from "components/atoms/Box";
import Page from "components/templates/Page";
import Text from "components/atoms/Text";
import Button from "components/atoms/Button";
import PodProviderModal from "components/organisms/modals/PodProviderModal";

import auth from "solid-auth-client";

const LoginForm: React.FunctionComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = (_e: any) => setIsModalOpen(!isModalOpen);
  return (
    <Page>
      <Box
        justifyContent="center"
        display="flex"
        flexDirection="column"
        flexGrow={1}
      >
        <Text textAlign="center" type="h1">
          Solid Grocery List
        </Text>
      </Box>
      <Button onClick={toggleModal}>Login</Button>

      <PodProviderModal
        isOpen={isModalOpen}
        toggle={toggleModal}
        handleSelectPodProvider={(podProvider: string) =>
          auth.login(podProvider)
        }
      />
    </Page>
  );
};

export default LoginForm;
