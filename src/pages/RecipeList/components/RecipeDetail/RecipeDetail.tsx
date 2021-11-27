import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Recipe } from "utils/api/types";
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
      <input onChange={onClickCheckBox} type="checkbox" checked={isChecked} />
    ) : null;
  };
  return (
    <Box onClick={toggleIngredientList} width="100%" marginY={1}>
      <Box display="flex" flexDirection="row" alignItems="center">
        {renderCheckBox()}
        {isIngredientListOpen ? <ExpandMoreIcon /> : <KeyboardArrowRightIcon />}
        <Typography variant="h6" textAlign="center">
          {recipe.title}
        </Typography>
      </Box>
      <IngredientList
        isOpen={isIngredientListOpen}
        ingredients={recipe.ingredients}
      />
    </Box>
  );
};

export default RecipeDetail;
