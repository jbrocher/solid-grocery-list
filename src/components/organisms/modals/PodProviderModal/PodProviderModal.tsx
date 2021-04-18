import React, { useState } from "react";
import StyledModal from "components/organisms/modals/components/StyledModal";
import Input from "components/atoms/Input";
import Button from "components/atoms/Button";

export interface PodProviderModalProps {
  handleSelectPodProvider: (podProvider: string) => Promise<void>;
  isOpen: boolean;
  toggle: (_e: any) => void;
}

const PodProviderModal: React.FunctionComponent<PodProviderModalProps> = ({
  isOpen,
  handleSelectPodProvider,
  toggle,
}: PodProviderModalProps) => {
  const [podProvider, setPodProvider] = useState("https://inrupt.net");
  const handleClick = () => {
    handleSelectPodProvider(podProvider);
  };
  return (
    <StyledModal
      isOpen={isOpen}
      onBackgroundClick={toggle}
      onEscapeKeydown={toggle}
    >
      <Input
        name="pod_provider"
        value={podProvider}
        placeholder="https://inrupt.net"
        onChange={(e: any) => {
          setPodProvider(e.target.value);
        }}
        label="What is your pod provider ? "
      />
      <Button mt={3} type="button" onClick={handleClick}>
        Connect to pod
      </Button>
    </StyledModal>
  );
};

export default PodProviderModal;
