import React, { useState } from "react";
import {
  useAutocompleteIngredient,
  SpoonacularIntgredient,
} from "utils/spoonacular";
import { Autocomplete } from "@material-ui/lab";
import { TextField } from "@material-ui/core";

export interface FoodSelectorProps {
  selected: SpoonacularIntgredient | null;
  onSelect: (value: SpoonacularIntgredient | null) => void;
}

const FoodSelector: React.FunctionComponent<FoodSelectorProps> = ({
  selected,
  onSelect,
}: FoodSelectorProps) => {
  const [query, setQuery] = useState("");
  const { isSuccess, data } = useAutocompleteIngredient(query);

  const handleChange = async (
    _event: any,
    newValue: SpoonacularIntgredient | null
  ) => {
    onSelect(newValue);
  };

  return (
    <Autocomplete
      options={data ?? []}
      getOptionLabel={(food) => food.name}
      style={{ width: "100%" }}
      value={selected}
      onChange={handleChange}
      onInputChange={(_e, newInputVaule) => {
        setQuery(newInputVaule);
      }}
      inputValue={query}
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
