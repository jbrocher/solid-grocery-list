import { Meta, Story } from "@storybook/react/types-6-0";

import React, { useState } from "react";

import { Food } from "utils/api/types";
import { SpoonacularIntgredient } from "utils/spoonacular";

import FoodSelector, { FoodSelectorProps } from "./FoodSelector";

export default {
  title: "Organisms/FoodSelector",
  component: FoodSelector,
} as Meta;

const Template: Story<FoodSelectorProps> = (args) => {
  const [food, setFood] = useState<SpoonacularIntgredient | null>({
    id: 1,
    name: "apple",
    aisle: "fruits",
  });

  const handleSelect = (food: SpoonacularIntgredient | null) => {
    setFood(food);
  };
  return <FoodSelector onSelect={handleSelect} selected={food} />;
};

export const Base = Template.bind({});

Base.args = {};
