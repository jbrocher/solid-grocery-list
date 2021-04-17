import React from "react";
import { useSpring, a } from "react-spring";
import Box from "components/atoms/Box";
import { useMeasure } from "utils/useMeasure";
import { Ingredient } from "utils/api/types";

interface IngredientListProps {
  ingredients: Ingredient[];
  isOpen: boolean;
}
const IngredientList: React.FunctionComponent<IngredientListProps> = ({
  ingredients,
  isOpen,
}: IngredientListProps) => {
  const {
    ref,
    bounds: { height: viewHeight },
  } = useMeasure();

  const { height, opacity } = useSpring({
    from: { height: 0, opacity: 0 },
    to: {
      height: isOpen ? viewHeight : 0,
      opacity: isOpen ? 1 : 0,
    },
  });

  return (
    <Box overflow="hidden" style={{ height }}>
      <a.ul style={{ opacity }} ref={ref}>
        {ingredients.map((ingredient) => {
          return (
            <li key={ingredient.identifier}>
              {ingredient.food.name} - x{ingredient.quantity}
            </li>
          );
        })}
      </a.ul>
    </Box>
  );
};

export default IngredientList;
