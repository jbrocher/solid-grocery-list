import React from "react";
import Page from "components/templates/Page";
import Box from "components/atoms/Box";
import { useRecipeList } from "utils/api/hooks/recipe";
import RecipeDetail from "./components/RecipeDetail";
import Button from "components/atoms/Button";
import { useHistory } from "react-router";

const RecipeList: React.FunctionComponent = () => {
  const recipes = useRecipeList();
  const history = useHistory();

  const goToRecipeForm = () => {
    history.push("/recipe-form");
  };

  return (
    <Page>
      <Box flexGrow={1}>
        {recipes.map((recipe) => (
          <RecipeDetail key={recipe.identifier} recipe={recipe} />
        ))}
      </Box>
      <Button onClick={goToRecipeForm}> Add a Recipe </Button>
    </Page>
  );
};

export default RecipeList;
