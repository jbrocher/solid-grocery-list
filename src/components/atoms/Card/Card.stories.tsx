import React from "react";

import Card, { CardProps } from "./Card";

import { Story, Meta } from "@storybook/react/types-6-0";

export default {
  title: "Atoms/Card",
  component: Card,
} as Meta;

export const Base = () => <Card>Lorep Ipsum</Card>;

Base.args = {
  backgroundColor: "taupe",
  padding: 0,
  width: "100%",
};
