import React from "react";
import { Autocomplete } from "@material-ui/lab";
import { TextField } from "@material-ui/core";
import { Food } from "utils/api/types";

export interface FoodSelectorProps {
  foodItems: Food[];
  selected: Food | null;
  onSelect: (value: Food | null) => void;
}
const FoodSelector: React.FunctionComponent<FoodSelectorProps> = ({
  foodItems,
  selected,
  onSelect,
}: FoodSelectorProps) => {
  const handleChange = (_event: any, newValue: Food | null) => {
    onSelect(newValue);
  };

  return (
    <Autocomplete
      options={foodItems}
      getOptionLabel={(food) => food.name}
      style={{ width: "100%" }}
      getOptionSelected={(food_a, food_b) => {
        return food_a.identifier === food_b.identifier;
      }}
      value={selected}
      onChange={handleChange}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Banana, goat cheese ..."
          variant="outlined"
        />
      )}
    />
  );
};

export default FoodSelector;
