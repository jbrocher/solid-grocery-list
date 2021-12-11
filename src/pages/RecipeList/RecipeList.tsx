import theme from "theme";

import React, { useState } from "react";

import { useHistory } from "react-router";

import { useCreateGroceryList } from "utils/api/hooks/groceryLists";
import { useRecipeList } from "utils/api/hooks/recipe";
import { Recipe } from "utils/api/types";

import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import Slide from "@mui/material/Slide";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import Typography from "@mui/material/Typography";

import Loading from "pages/Loading";

import RecipeDetail from "./components/RecipeDetail";
import GoBackHeader from "components/atoms/GoBackHeader";
import GroceryListModal from "components/organisms/modals/GroceryListModal";
import ContentContainer from "components/templates/ContentContainer";
import Page from "components/templates/Page";

const RecipeList: React.FunctionComponent = () => {
  const { isSuccess, recipeList: recipes } = useRecipeList();
  const [isGroceriesModeOn, setIsGroceriesModeOn] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedRecipes, setSelectedRecipes] = useState<string[]>([]);
  const { ready, groceryListMutation } = useCreateGroceryList();
  const history = useHistory();

  const isChecked = (recipe: Recipe) => {
    return !!selectedRecipes.find(
      (identifier) => identifier === recipe.identifier
    );
  };

  const getSelectedRecipes = () => {
    if (!recipes) {
      return [];
    }
    return recipes.filter((recipe) =>
      selectedRecipes.includes(recipe.identifier)
    );
  };

  const goToRecipeForm = () => {
    history.push("/recipe-form");
  };

  const handleCreateList = async (name: string) => {
    setIsSubmitting(true);
    await groceryListMutation.mutateAsync({
      recipes: getSelectedRecipes(),
      listName: name,
    });
    history.push("/groceries");
  };

  const toggleRecipe = (recipe: Recipe) => {
    if (isChecked(recipe)) {
      setSelectedRecipes(
        selectedRecipes.filter((identifier) => identifier !== recipe.identifier)
      );
    } else {
      setSelectedRecipes([...selectedRecipes, recipe.identifier]);
    }
  };
  const toggleGroceriesMode = () => {
    setIsGroceriesModeOn(!isGroceriesModeOn);
  };
  if (!isSuccess) {
    return <Loading />;
  }

  return (
    <Page>
      <GoBackHeader title="Recipes" />
      <ContentContainer>
        {recipes!.map((recipe) => (
          <RecipeDetail
            isChecked={isChecked(recipe)}
            onClickCheckBox={() => toggleRecipe(recipe)}
            isCheckBox={isGroceriesModeOn}
            key={recipe.identifier}
            recipe={recipe}
          />
        ))}
      </ContentContainer>
      <Slide in={isGroceriesModeOn} unmountOnExit direction="right">
        <Box
          position="absolute"
          display="flex"
          padding={1}
          alignItems="center"
          bottom={theme.spacing(7)}
        >
          <Typography>Create groceries list ?</Typography>
          <Fab sx={{ margin: 2 }} size="small" onClick={toggleGroceriesMode}>
            <CloseIcon />
          </Fab>
          <Fab
            color="primary"
            size="small"
            onClick={() => setIsDialogOpen(true)}
          >
            <CheckIcon />
          </Fab>
        </Box>
      </Slide>
      <GroceryListModal
        open={isDialogOpen}
        cancel={() => setIsDialogOpen(false)}
        confirm={(name) => handleCreateList(name)}
      />
      {!isGroceriesModeOn && (
        <SpeedDial
          ariaLabel="Recipe actions"
          sx={{
            position: "absolute",
            bottom: theme.spacing(7),
            right: theme.spacing(2),
          }}
          icon={<SpeedDialIcon />}
        >
          <SpeedDialAction onClick={goToRecipeForm} icon={<AddIcon />} />
          <SpeedDialAction
            onClick={toggleGroceriesMode}
            icon={<ShoppingCartIcon />}
          />
        </SpeedDial>
      )}
    </Page>
  );
};

export default RecipeList;
