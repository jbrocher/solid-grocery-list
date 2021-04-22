import React, { useState } from "react";
import Page from "components/templates/Page";
import { Recipe } from "utils/api/types";
import ContentContainer from "components/templates/ContentContainer";
import Loading from "pages/Loading";
import { useRecipeList } from "utils/api/hooks/recipe";
import RecipeDetail from "./components/RecipeDetail";
import Button from "components/atoms/Button";
import { useHistory } from "react-router";

const RecipeList: React.FunctionComponent = () => {
  const { isSuccess, recipeList: recipes } = useRecipeList();
  const [isGroceriesModeOn, setIsGroceriesModeOn] = useState(false);
  const [selectedRecipes, setSelectedRecipes] = useState<string[]>([]);
  const history = useHistory();

  const isChecked = (recipe: Recipe) => {
    return !!selectedRecipes.find(
      (identifier) => identifier === recipe.identifier
    );
  };

  const goToRecipeForm = () => {
    history.push("/recipe-form");
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
      <Button mt={1} variant="outlined" onClick={toggleGroceriesMode}>
        {isGroceriesModeOn ? "Cancel" : "Generate list"}
      </Button>
    </Page>
  );
};

export default RecipeList;
