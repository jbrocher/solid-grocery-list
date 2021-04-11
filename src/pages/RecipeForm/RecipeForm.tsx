import React, { useState } from "react";
import { Formik, FormikProps, FieldArray } from "formik";
import IngredientModal from "components/organisms/modals/IngredientModal";
import Button from "components/atoms/Button";
import Input from "components/atoms/Input";
import Text from "components/atoms/Text";
import Page from "components/templates/Page";
import Card from "components/atoms/Card";
import { useRecipes } from "utils/api/hooks/recipe";
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
  const recipes = useRecipes();
  const { ready, createRecipe } = useCreateRecipe();
  const [isIngredientModalOpen, setIsIngredientModalOpen] = useState(false);
  const toggleIngredientModal = () => {
    setIsIngredientModalOpen(!isIngredientModalOpen);
  };

  if (!recipes || !ready) {
    return <div> loading ... </div>;
  }

  const handleSubmit = (data: RecipeFormValues) => {
    console.log(data);
    createRecipe(data).then((result) => console.log(result));
  };

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      {({
        handleChange,
        isValid,
        errors,
        values,
        handleSubmit,
      }: FormikProps<RecipeFormValues>) => (
        <Page>
          <Card>
            <Text type="h1"> Nouvelle Recette </Text>
            <form onSubmit={handleSubmit}>
              <Input
                value={values.title}
                label="Titre de la recette"
                onChange={handleChange}
                name="title"
              />
              <FieldArray
                name="ingredients"
                render={(arrayHelpers) => (
                  <div>
                    {values.ingredients.map((ingredient, index) => (
                      <div key={index}>
                        <Text type="body">
                          {ingredient.food.identifier}: {ingredient.quantity}
                        </Text>
                      </div>
                    ))}
                    <IngredientModal
                      isOpen={isIngredientModalOpen}
                      toggle={toggleIngredientModal}
                      handleSubmit={(ingredient: Ingredient) => {
                        console.log(ingredient);
                        arrayHelpers.push(ingredient);
                        toggleIngredientModal();
                      }}
                    />
                    <Button type="button" onClick={toggleIngredientModal}>
                      Add ingredient
                    </Button>
                  </div>
                )}
              />
              <Button type="submit">Ajouter la recette</Button>
            </form>
          </Card>
        </Page>
      )}
    </Formik>
  );
};

export default RecipeForm;
