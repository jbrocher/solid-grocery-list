import React, { useState } from "react";
import Page from "components/templates/Page";
import Button from "components/atoms/Button";
import PodProviderModal from "components/organisms/modals/PodProviderModal";

import auth from "solid-auth-client";

const LoginForm: React.FunctionComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = (_e: any) => setIsModalOpen(!isModalOpen);
  return (
    <Page>
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
