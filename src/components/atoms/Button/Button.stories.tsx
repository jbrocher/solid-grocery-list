import React from "react";
import Button, { ButtonProps } from "./Button";

import { Story, Meta } from "@storybook/react/types-6-0";

export default {
  title: "Atoms/Button",
  component: Button,
} as Meta;

export const Template: Story<ButtonProps> = (args) => (
  <Button {...args}>Lorep Ipsum</Button>
);

export const Base = Template.bind({});
Base.args = {};

export const Outlined = Template.bind({});
Outlined.args = {
  variant: "outlined",
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};
