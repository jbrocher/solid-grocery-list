import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import PodProviderModal, { PodProviderModalProps } from "./PodProviderModal";

export default {
  title: "components/modals/PodProviderModal",
  components: PodProviderModal,
} as Meta;

const Template: Story<PodProviderModalProps> = (args) => (
  <PodProviderModal {...args} />
);

export const Default = Template.bind({});
Default.args = {
  handleSelectPodProvider: (podProvider) =>
    new Promise((resolve) => "hello world"),
  isOpen: true,
  toggle: () => {},
};
