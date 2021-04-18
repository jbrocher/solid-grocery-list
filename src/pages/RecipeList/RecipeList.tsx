import React from "react";
import Page from "components/templates/Page";
import ContentContainer from "components/templates/ContentContainer";
import Loading from "pages/Loading";
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

  if (!recipes) {
    return <Loading />;
  }

  return (
    <Page>
      <ContentContainer>
        {recipes.map((recipe) => (
          <RecipeDetail key={recipe.identifier} recipe={recipe} />
        ))}
      </ContentContainer>
      <Button onClick={goToRecipeForm}> Add a Recipe </Button>
    </Page>
  );
};

export default RecipeList;
