import { FieldArray, Formik, FormikProps } from "formik";
import * as Yup from "yup";

import React, { useState } from "react";

import { useHistory } from "react-router";

import { useCreateRecipe } from "utils/api/hooks/recipe";
import { RecipeFormValues } from "utils/api/types";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

import FormDialog from "components/molecules/FormDialog";
import IngredientModal from "components/organisms/modals/IngredientModal";

const validationSchema = Yup.object({
  title: Yup.string().required(),
  ingredients: Yup.array().of(
    Yup.object().shape({
      food: Yup.object({ identifier: Yup.string().required() }).required(),
      quantity: Yup.number().required(),
    })
  ),
});
const initialValues = {
  title: "",
  ingredients: [],
};
const StyledFrom = styled("form")`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

interface RecipeCreationProps {
  open: boolean;
  onClose: () => void;
}

const RecipeCreation: React.FunctionComponent<RecipeCreationProps> = ({
  open,
  onClose,
}) => {
  const { ready, recipeMutation } = useCreateRecipe();
  const [isIngredientModalOpen, setIsIngredientModalOpen] = useState(false);
  const history = useHistory();
  const toggleIngredientModal = () => {
    setIsIngredientModalOpen(!isIngredientModalOpen);
  };

  const handleSubmit = async (data: RecipeFormValues) => {
    await recipeMutation.mutateAsync(data);
    return history.push("/recipe-list");
  };

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnMount={true}
    >
      {({
        handleChange,
        isValid,
        isSubmitting,
        errors,
        submitForm,
        values,
        handleSubmit,
      }: FormikProps<RecipeFormValues>) => (
        <FormDialog open={open} onClose={onClose}>
          <FormDialog.Main>
            <FormDialog.Header>
              <TextField
                size="small"
                value={values.title}
                label="Recipe Name"
                onChange={handleChange}
                name="title"
              />
            </FormDialog.Header>
            <StyledFrom onSubmit={handleSubmit}>
              <FieldArray
                name="ingredients"
                render={(arrayHelpers) => (
                  <div>
                    <Typography textAlign="center" mt={2} mb={1} variant="h6">
                      Ingredients
                    </Typography>
                    {values.ingredients.map((ingredient, index) => (
                      <div key={index}>
                        <Typography variant="body1">
                          {ingredient.food.name}: {ingredient.quantity}
                        </Typography>
                      </div>
                    ))}
                    <IngredientModal
                      isOpen={isIngredientModalOpen}
                      toggle={toggleIngredientModal}
                      handleSubmit={(ingredient) => {
                        arrayHelpers.push(ingredient);
                        toggleIngredientModal();
                      }}
                    />
                    <Button
                      sx={{
                        marginY: 2,
                      }}
                      variant="outlined"
                      type="button"
                      onClick={toggleIngredientModal}
                    >
                      Add ingredient
                    </Button>
                  </div>
                )}
              />
            </StyledFrom>
          </FormDialog.Main>
          <Button
            sx={{
              marginY: 2,
            }}
            disabled={!isValid || isSubmitting || !ready}
            variant="contained"
            type="submit"
            onClick={submitForm}
          >
            Create recipe
          </Button>
        </FormDialog>
      )}
    </Formik>
  );
};

export default RecipeCreation;
