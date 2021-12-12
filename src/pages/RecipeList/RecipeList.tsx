import theme from "theme";

import React, { useState } from "react";

import { useRecipeList } from "utils/api/hooks/recipe";

import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";

import Loading from "pages/Loading";

import GoBackHeader from "components/atoms/GoBackHeader";
import RecipeCreation from "components/organisms/RecipeCreation";
import RecipeDetail from "components/organisms/RecipeDetail";
import ContentContainer from "components/templates/ContentContainer";
import Page from "components/templates/Page";

const RecipeList: React.FunctionComponent = () => {
  const { isSuccess, recipeList: recipes } = useRecipeList();
  const [isRecipeCreationOpen, setIsRecipeCreationOpen] = useState(false);

  if (!isSuccess) {
    return <Loading />;
  }

  return (
    <Page>
      <GoBackHeader title="Recipes" />
      <ContentContainer>
        {recipes!.map((recipe) => (
          <RecipeDetail
            isChecked={false}
            onClickCheckBox={() => undefined}
            isCheckBox={false}
            key={recipe.identifier}
            recipe={recipe}
          />
        ))}
        <Fab
          sx={{
            position: "absolute",
            bottom: theme.spacing(8),
            right: theme.spacing(2),
          }}
          color="primary"
        >
          <AddIcon onClick={() => setIsRecipeCreationOpen(true)} />
        </Fab>
      </ContentContainer>

      <RecipeCreation
        open={isRecipeCreationOpen}
        onClose={() => setIsRecipeCreationOpen(false)}
      />
    </Page>
  );
};

export default RecipeList;
