import React from "react";
import { Formik, FormikProps } from "formik";
import * as Yup from "yup";
import Loading from "pages/Loading";
import Input from "components/atoms/Input";
import { useCreateFood } from "utils/api/hooks/food";
import Page from "components/templates/Page";
import Card from "components/atoms/Card";
import Button from "components/atoms/Button";
import Text from "components/atoms/Text";
import { useHistory } from "react-router";

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
  const history = useHistory();

  const { loading, createFood } = useCreateFood();
  const handleSubmit = async (values: FormValues): Promise<void> => {
    await createFood(values["id"], values["category"]);
    return history.push("/food-list");
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnMount={true}
    >
      {({
        handleBlur,
        handleChange,
        isValid,
        isSubmitting,
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
              <Button
                disabled={!isValid || isSubmitting}
                mt={1}
                width="100%"
                type="submit"
              >
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
