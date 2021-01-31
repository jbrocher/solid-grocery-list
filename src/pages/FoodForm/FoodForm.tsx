import React from "react";
import { Formik, FormikProps } from "formik";
import * as Yup from "yup";
import Input from "components/atoms/Input";
import Food from "models/Food";
import { useSession } from "@inrupt/solid-ui-react";
import { SolidDataset } from "@inrupt/solid-client";
import Page from "components/templates/Page";
import Card from "components/atoms/Card";
import Button from "components/atoms/Button";
import Text from "components/atoms/Text";

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
  const { session } = useSession();

  const createFood = async (values: FormValues): Promise<SolidDataset> => {
    const foodItem = new Food(
      session,
      "https://araelath.jbrocher.com",
      values["id"],
      {
        shoppingCategory: values["category"],
      }
    );

    return foodItem.save();
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
            <Text mb={2} type="title">
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
