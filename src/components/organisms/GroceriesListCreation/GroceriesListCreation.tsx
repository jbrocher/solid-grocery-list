import React, { useState } from "react";

import { useCreateGroceryList } from "utils/api/hooks/groceryLists";
import { useRecipeList } from "utils/api/hooks/recipe";
import { Recipe } from "utils/api/types";

import CloseIcon from "@mui/icons-material/Close";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Slide from "@mui/material/Slide";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { TransitionProps } from "@mui/material/transitions";

import CollapsibleCheckbox from "components/molecules/CollapsibleCheckbox";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface GroceriesListCreationProps {
  open: boolean;
  onClose: () => void;
}
const GroceriesListCreation: React.FunctionComponent<GroceriesListCreationProps> =
  ({ open, onClose }) => {
    const [selectedRecipes, setSelectedRecipes] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [listName, setListName] = useState("");
    const { ready, groceryListMutation } = useCreateGroceryList();
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
      <Dialog TransitionComponent={Transition} fullScreen open={open}>
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <TextField
              color="secondary"
              variant="outlined"
              size="small"
              label="List name"
              value={listName}
              onChange={(e) => setListName(e.target.value)}
              sx={{ flexGrow: 1 }}
            />
            <IconButton color="inherit" onClick={onClose} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
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
          <Button
            variant="contained"
            onClick={() => handleCreateList()}
            disabled={isSubmitting}
          >
            Create List
          </Button>
        </Box>
      </Dialog>
    );
  };

export default GroceriesListCreation;
