import React, { useState } from "react";
import Page from "components/templates/Page";
import { Recipe } from "utils/api/types";
import ContentContainer from "components/templates/ContentContainer";
import GoBackHeader from "components/atoms/GoBackHeader";
import Loading from "pages/Loading";
import { useRecipeList } from "utils/api/hooks/recipe";
import { useCreateGroceryList } from "utils/api/hooks/groceryLists";
import RecipeDetail from "./components/RecipeDetail";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";
import GroceryListModal from "components/organisms/modals/GroceryListModal";
import FromControlLabel from "@mui/material/FormControlLabel";
import { useHistory } from "react-router";

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
        <FromControlLabel
          control={
            <Switch
              checked={isGroceriesModeOn}
              onChange={toggleGroceriesMode}
            />
          }
          label="Grocries mode"
        />
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
      {isGroceriesModeOn ? (
        <Box justifyContent="center" display="flex">
          <Button
            sx={{ m: 1 }}
            variant="outlined"
            color="info"
            onClick={toggleGroceriesMode}
          >
            cancel
          </Button>
          <Button
            sx={{ m: 1 }}
            disabled={!ready || isSubmitting}
            variant="outlined"
            onClick={() => setIsDialogOpen(true)}
          >
            Create Grocery List
          </Button>
        </Box>
      ) : (
        <Button onClick={goToRecipeForm}> Add a Recipe </Button>
      )}
      <GroceryListModal
        open={isDialogOpen}
        cancel={() => setIsDialogOpen(false)}
        confirm={(name) => handleCreateList(name)}
      />
    </Page>
  );
};

export default RecipeList;
