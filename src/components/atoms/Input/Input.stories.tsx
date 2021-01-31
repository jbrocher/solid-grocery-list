import React from "react";
import Input from "components/atoms/Input";
import { InputProps } from "components/atoms/Input/Input";

import { Story, Meta } from "@storybook/react/types-6-0";
export default {
  title: "Atoms/Input",
  component: Input,
} as Meta;

const Template: Story<InputProps> = (args) => <Input {...args} />;

export const Base = Template.bind({});

Base.args = {
  label: "test",
};
