import React, { useState } from "react";
import Modal from "styled-react-modal";
import Button from "components/atoms/Button";
import FoodSelector from "components/organisms/FoodSelector";
import { useFoodList } from "utils/api/hooks";
import { Food, Ingredient } from "utils/api/types";
import Input from "components/atoms/Input";

interface IngredientModalProps {
  handleSubmit: (ingredient: Ingredient) => void;
  isOpen: boolean;
  toggle: (_e: any) => void;
}

const StyledModal = Modal.styled`
  width: 80%;
  display: flex;
  padding: ${(props: any) => props.theme.space[3]}px;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background-color: ${(props: any) => props.theme.colors.white};
`;

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
  const food = useFoodList();

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
        foodItems={food.foodItems}
        selected={selectedFoodItem}
        onSelect={handleSelect}
      />
      <Input
        name="quantity"
        value={quantity.toString()}
        type="number"
        onChange={(e: any) => {
          setQuantity(e.target.value);
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
