import React, { useState } from "react";

import FoodSelector, { FoodSelectorProps } from "./FoodSelector";
import { Story, Meta } from "@storybook/react/types-6-0";
import { Food } from "utils/api/types";

export default {
  title: "Organisms/FoodSelector",
  component: FoodSelector,
} as Meta;

const Template: Story<FoodSelectorProps> = (args) => {
  const [food, setFood] = useState<Food | null>(args.foodItems[0]);

  const handleSelect = (food: Food | null) => {
    setFood(food);
  };
  return (
    <FoodSelector
      onSelect={handleSelect}
      selected={food}
      foodItems={args.foodItems}
    />
  );
};

export const Base = Template.bind({});

Base.args = {
  foodItems: [
    { identifier: "banane", category: "fruit" },
    { identifier: "pomme", category: "fruit" },
  ],
};
