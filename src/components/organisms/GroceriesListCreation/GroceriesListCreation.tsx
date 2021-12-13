import React, { useState } from "react";

import { useCreateGroceryList } from "utils/api/hooks/groceryLists";
import { useRecipeList } from "utils/api/hooks/recipe";
import { Recipe } from "utils/api/types";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import TextField from "@mui/material/TextField";

import CollapsibleCheckbox from "components/molecules/CollapsibleCheckbox";
import FormDialog from "components/molecules/FormDialog";

interface GroceriesListCreationProps {
  open: boolean;
  onClose: () => void;
}
const GroceriesListCreation: React.FunctionComponent<GroceriesListCreationProps> =
  ({ open, onClose }) => {
    const [selectedRecipes, setSelectedRecipes] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [listName, setListName] = useState("");
    const { groceryListMutation } = useCreateGroceryList();
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

    const handleCreateList = async () => {
      setIsSubmitting(true);
      await groceryListMutation.mutateAsync({
        recipes: getSelectedRecipes(),
        listName: listName,
      });
      setIsSubmitting(false);
      onClose();
    };

    const toggleRecipe = (recipe: Recipe) => {
      if (isChecked(recipe)) {
        setSelectedRecipes(
          selectedRecipes.filter(
            (identifier) => identifier !== recipe.identifier
          )
        );
      } else {
        setSelectedRecipes([...selectedRecipes, recipe.identifier]);
      }
    };
    const { isSuccess, recipeList: recipes } = useRecipeList();
    return (
      <FormDialog open={open} onClose={onClose}>
        <FormDialog.Header>
          <TextField
            color="secondary"
            variant="outlined"
            size="small"
            label="List name"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
            sx={{ flexGrow: 1 }}
          />
        </FormDialog.Header>
        <FormDialog.Main>
          <Box height="100%" display="flex" flexDirection="column" padding={3}>
            <List sx={{ flexGrow: 1 }}>
              {isSuccess ? (
                recipes!.map((recipe) => (
                  <CollapsibleCheckbox
                    key={recipe.title}
                    onChange={(_event) => toggleRecipe(recipe)}
                    checked={isChecked(recipe)}
                    title={recipe.title}
                  >
                    {recipe.ingredients.map((ingredient) => (
                      <ListItem key={ingredient.identifier}>
                        {ingredient.food.name}
                      </ListItem>
                    ))}
                  </CollapsibleCheckbox>
                ))
              ) : (
                <CircularProgress />
              )}
            </List>
          </Box>
        </FormDialog.Main>
        <Button
          variant="contained"
          onClick={() => handleCreateList()}
          disabled={isSubmitting}
        >
          {isSubmitting ? <CircularProgress size="2em" /> : "Create recipe"}
        </Button>
      </FormDialog>
    );
  };

export default GroceriesListCreation;
