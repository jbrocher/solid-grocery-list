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
import { useHistory } from "react-router";

const RecipeList: React.FunctionComponent = () => {
  const { isSuccess, recipeList: recipes } = useRecipeList();
  const [isGroceriesModeOn, setIsGroceriesModeOn] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const handleCreateList = async () => {
    setIsSubmitting(true);
    await groceryListMutation.mutateAsync(getSelectedRecipes());
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

  const renderGroceriesButton = () => {
    if (isGroceriesModeOn) {
      return (
        <>
          <Button
            sx={{ mt: 1 }}
            variant="outlined"
            onClick={toggleGroceriesMode}
          >
            cancel
          </Button>
          <Button
            sx={{ mt: 1 }}
            disabled={!ready || isSubmitting}
            variant="outlined"
            onClick={handleCreateList}
          >
            go
          </Button>
        </>
      );
    } else {
      return (
        <Button sx={{ mt: 1 }} variant="outlined" onClick={toggleGroceriesMode}>
          create list
        </Button>
      );
    }
  };

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
      <Button onClick={goToRecipeForm}> Add a Recipe </Button>
      {renderGroceriesButton()}
    </Page>
  );
};

export default RecipeList;
