import React, { useContext } from "react";
import { Formik, FormikProps } from "formik";
import * as Yup from "yup";
import Input from "components/atoms/Input";
import Food from "models/Food";
import Page from "components/templates/Page";
import Card from "components/atoms/Card";
import Button from "components/atoms/Button";
import Text from "components/atoms/Text";
import { WebIdContext } from "App";

const validationSchema = Yup.object({
  id: Yup.string().required(),
  category: Yup.string().required(),
});

interface FormValues {
  id: string;
  category: string;
}
const initialValues = {
  id: "",
  category: "",
};

const FoodForm: React.FunctionComponent = () => {
  const webId = useContext(WebIdContext);

  const createFood = async (values: FormValues): Promise<void> => {
    if (webId) {
      const foodItem = new Food(webId, values["id"], values["category"]);

      return foodItem.save();
    } else {
      throw "Missing webId";
    }
  };
  return (
    <Formik
      onSubmit={createFood}
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      {({
        handleBlur,
        handleReset,
        handleChange,
        isValid,
        handleSubmit,
        values,
      }: FormikProps<FormValues>) => (
        <Page justifyContent="center" p={1}>
          <Card p={3} width="100%">
            <Text mb={2} type="h1">
              Ajouter un nouveau produit
            </Text>
            <form onSubmit={handleSubmit}>
              <Input
                value={values.id}
                label={"Food name"}
                onChange={handleChange}
                onBlur={handleBlur}
                name="id"
              />
              <Input
                label={"Rayon"}
                value={values.category}
                onChange={handleChange}
                onBlur={handleBlur}
                name="category"
              />
              <Button disabled={!isValid} mt={1} width="100%" type="submit">
                Create new Food
              </Button>
            </form>
          </Card>
        </Page>
      )}
    </Formik>
  );
};

export default FoodForm;
