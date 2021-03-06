import React, { useState } from "react";
import StyledModal from "components/organisms/modals/components/StyledModal";
import Button from "components/atoms/Button";
import FoodSelector from "components/organisms/FoodSelector";
import { useFoodList } from "utils/api/hooks/food";
import { Food } from "utils/api/types";
import Input from "components/atoms/Input";

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
  const [selectedFoodItem, setSelectedFoodItem] = useState<Food | null>(null);
  const [quantity, setQuantity] = useState(0);
  const handleSelect = (selected: Food | null) => {
    setSelectedFoodItem(selected);
  };
  const foodList = useFoodList();

  const submit = () => {
    if (selectedFoodItem !== null) {
      handleSubmit({
        food: selectedFoodItem,
        quantity: quantity,
      });
    }
  };

  return (
    <StyledModal
      isOpen={isOpen}
      onBackgroundClick={toggle}
      onEscapeKeydown={toggle}
    >
      <FoodSelector
        foodItems={foodList ? foodList : []}
        selected={selectedFoodItem}
        onSelect={handleSelect}
      />
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
