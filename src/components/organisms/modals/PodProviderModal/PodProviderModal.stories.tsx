import { Meta, Story } from "@storybook/react/types-6-0";

import React from "react";

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
  isOpen: true,
  toggle: () => {},
};
