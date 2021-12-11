import React, { useState } from "react";

import { useCreateFood, useFoodList } from "utils/api/hooks/food";
import { Food } from "utils/api/types";
import { SpoonacularIntgredient } from "utils/spoonacular";

import Button from "@mui/material/Button";

import Input from "components/atoms/Input";
import FoodSelector from "components/organisms/FoodSelector";
import StyledModal from "components/organisms/modals/components/StyledModal";

export interface IngredientFormValues {
  food: Food;
  quantity: number;
}
interface IngredientModalProps {
  handleSubmit: (ingredient: IngredientFormValues) => void;
  isOpen: boolean;
  toggle: (_e: any) => void;
}

const IngredientModal: React.FunctionComponent<IngredientModalProps> = ({
  handleSubmit,
  isOpen,
  toggle,
}: IngredientModalProps) => {
  const [selectedFoodItem, setSelectedFoodItem] =
    useState<SpoonacularIntgredient | null>(null);
  const [quantity, setQuantity] = useState(0);
  const { createFood } = useCreateFood();
  const handleSelect = (selected: SpoonacularIntgredient | null) => {
    setSelectedFoodItem(selected);
  };
  const foodList = useFoodList();

  const submit = async () => {
    if (selectedFoodItem === null) {
      return;
    }
    let existingFood = foodList?.find(
      (food) => food.name === selectedFoodItem.name
    );
    if (existingFood === undefined) {
      existingFood = await createFood(
        selectedFoodItem.name,
        selectedFoodItem.aisle
      );
    }
    handleSubmit({
      food: existingFood,
      quantity: quantity,
    });
  };

  return (
    <StyledModal
      isOpen={isOpen}
      onBackgroundClick={toggle}
      onEscapeKeydown={toggle}
    >
      <FoodSelector selected={selectedFoodItem} onSelect={handleSelect} />
      <Input
        name="quantity"
        value={quantity.toString()}
        type="number"
        onChange={(e: any) => {
          setQuantity(parseInt(e.target.value));
        }}
        label="quantity"
      />
      <Button type="button" onClick={submit}>
        Add
      </Button>
    </StyledModal>
  );
};

export default IngredientModal;
