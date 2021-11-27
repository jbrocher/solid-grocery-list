import React from "react";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
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
            <ListItem
              sx={{ justifyContent: "space-between" }}
              key={ingredient.identifier}
            >
              {ingredient.food.name}
              <Typography
                color="text.secondary"
                fontWeight="bolder"
                variant="body2"
              >
                {ingredient.quantity}
              </Typography>
            </ListItem>
          );
        })}
      </List>
    </Collapse>
  );
};

export default IngredientList;
