import React from "react";
import { useSpring, a } from "react-spring";
import Box from "@mui/material/Box";
import styled from "styled-components";
import { useMeasure } from "utils/useMeasure";
import { Ingredient } from "utils/api/types";

interface IngredientListProps {
  ingredients: Ingredient[];
  isOpen: boolean;
}

const StyledList = styled(a.ul)`
  margin: 0px;
  padding-top: ${(props) => props.theme.space[1]}px;
  box-sizing: border-box;
`;

const IngredientList: React.FunctionComponent<IngredientListProps> = ({
  ingredients,
  isOpen,
}: IngredientListProps) => {
  const {
    ref,
    bounds: { height: viewHeight, top: paddingTop },
  } = useMeasure();

  const { height, opacity }: any = useSpring({
    from: { height: 0, opacity: 0 },
    to: {
      height: isOpen ? viewHeight + paddingTop : 0,
      opacity: isOpen ? 1 : 0,
    },
  });

  return (
    <Box overflow="hidden" style={{ height }}>
      <StyledList style={{ opacity }} ref={ref}>
        {ingredients.map((ingredient) => {
          return (
            <li key={ingredient.identifier}>
              {ingredient.food.name} - x{ingredient.quantity}
            </li>
          );
        })}
      </StyledList>
    </Box>
  );
};

export default IngredientList;
