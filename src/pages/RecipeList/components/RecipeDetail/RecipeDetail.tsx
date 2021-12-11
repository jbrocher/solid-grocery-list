import React, { useState } from "react";

import { Recipe } from "utils/api/types";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Box from "@mui/material/Box";
import CheckBox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";

import IngredientList from "./IngredientList";

interface RecipeProps {
  recipe: Recipe;
  isCheckBox: boolean;
  isChecked: boolean;
  onClickCheckBox: () => void;
}

const RecipeDetail: React.FunctionComponent<RecipeProps> = ({
  recipe,
  isCheckBox,
  isChecked,
  onClickCheckBox,
}: RecipeProps) => {
  const [isIngredientListOpen, setIsIngredientListOpen] = useState(false);
  const toggleIngredientList = () => {
    setIsIngredientListOpen(!isIngredientListOpen);
  };
  const renderCheckBox = () => {
    return isCheckBox ? (
      <CheckBox onChange={onClickCheckBox} checked={isChecked} />
    ) : null;
  };
  return (
    <Box>
      <Box display="flex" alignItems="center" width="100%" marginY={1}>
        {renderCheckBox()}
        <Box onClick={toggleIngredientList} display="flex" alignItems="center">
          {isIngredientListOpen ? (
            <ExpandMoreIcon />
          ) : (
            <KeyboardArrowRightIcon />
          )}
          <Typography variant="h6" textAlign="center">
            {recipe.title}
          </Typography>
        </Box>
      </Box>
      <IngredientList
        isOpen={isIngredientListOpen}
        ingredients={recipe.ingredients}
      />
    </Box>
  );
};

export default RecipeDetail;
