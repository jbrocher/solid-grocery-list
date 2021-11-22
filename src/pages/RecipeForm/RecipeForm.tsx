import React, { useState } from "react";
import { useHistory } from "react-router";
import { Formik, FormikProps, FieldArray } from "formik";
import IngredientModal from "components/organisms/modals/IngredientModal";
import Button from "@mui/material/Button";
import Input from "components/atoms/Input";
import Text from "components/atoms/Text";
import Page from "components/templates/Page";
import Card from "@mui/material/Card";
import { useCreateRecipe } from "utils/api/hooks/recipe";

import { Ingredient } from "utils/api/types";
import * as Yup from "yup";

const validationSchema = Yup.object({
  title: Yup.string().required(),
  ingredients: Yup.array().of(
    Yup.object().shape({
      food: Yup.object({ identifier: Yup.string().required() }).required(),
      quantity: Yup.number().required(),
    })
  ),
});

export interface RecipeFormValues {
  title: string;
  ingredients: Ingredient[];
}
const initialValues = {
  title: "",
  ingredients: [],
};
const RecipeForm: React.FunctionComponent = () => {
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
        values,
        handleSubmit,
      }: FormikProps<RecipeFormValues>) => (
        <Page>
          <Card>
            <Text textAlign="center" mb={2} variant="h1">
              New recipe
            </Text>
            <form onSubmit={handleSubmit}>
              <Input
                value={values.title}
                label="Recipe Name"
                onChange={handleChange}
                name="title"
              />
              <FieldArray
                name="ingredients"
                render={(arrayHelpers) => (
                  <div>
                    <Text mt={2} mb={1} variant="h3">
                      Ingredients
                    </Text>
                    {values.ingredients.map((ingredient, index) => (
                      <div key={index}>
                        <Text variant="body1">
                          {ingredient.food.name}: {ingredient.quantity}
                        </Text>
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
              <Button
                sx={{
                  marginY: 2,
                }}
                disabled={!isValid || isSubmitting || !ready}
                type="submit"
              >
                Create recipe
              </Button>
            </form>
          </Card>
        </Page>
      )}
    </Formik>
  );
};

export default RecipeForm;
