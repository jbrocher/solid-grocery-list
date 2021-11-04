import React, { useState } from "react";

import FoodSelector, { FoodSelectorProps } from "./FoodSelector";
import { Story, Meta } from "@storybook/react/types-6-0";
import { SpoonacularIntgredient } from "utils/spoonacular";
import { Food } from "utils/api/types";

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
