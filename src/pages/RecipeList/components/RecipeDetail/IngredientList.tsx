import React from "react";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Ingredient } from "utils/api/types";

interface IngredientListProps {
  ingredients: Ingredient[];
  isOpen: boolean;
}

const IngredientList: React.FunctionComponent<IngredientListProps> = ({
  ingredients,
  isOpen,
}: IngredientListProps) => {
  return (
    <Collapse in={isOpen}>
      <List>
        {ingredients.map((ingredient) => {
          return (
            <ListItem key={ingredient.identifier}>
              {ingredient.food.name} - x{ingredient.quantity}
            </ListItem>
          );
        })}
      </List>
    </Collapse>
  );
};

export default IngredientList;
