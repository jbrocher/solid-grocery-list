import React from "react";
import { useRecipeList } from "utils/api/hooks";

const RecipeList: React.FunctionComponent = () => {
  const recipes = useRecipeList();
  console.log(recipes);

  return (
    <div>
      {recipes.recipeItems.map((recipe) => (
        <div key={recipe.title}>
          <h1>{recipe.title}</h1>
          <ul>
            {recipe.ingredients.map((ingredient) => {
              return (
                <li>
                  {`${ingredient.food.identifier}: ${ingredient.quantity}`}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
