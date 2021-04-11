import React from "react";
import Page from "components/templates/Page";
import { useRecipeList } from "utils/api/hooks/recipe";

const RecipeList: React.FunctionComponent = () => {
  const recipes = useRecipeList();

  return (
    <Page>
      {recipes.map((recipe) => (
        <div key={recipe.identifier}>
          <h1>{recipe.title}</h1>
          <ul>
            {recipe.ingredients.map((ingredient, index) => {
              return (
                <li key={index}>
                  {`${ingredient.food.identifier}: ${ingredient.quantity}`}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </Page>
  );
};

export default RecipeList;
