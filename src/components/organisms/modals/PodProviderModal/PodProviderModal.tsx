import React from "react";
import { Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import styled from "styled-components";

import StyledModal from "components/organisms/modals/components/StyledModal";
import Input from "components/atoms/Input";
import Button from "components/atoms/Button";
import { login } from "@inrupt/solid-client-authn-browser";

export interface PodProviderModalProps {
  isOpen: boolean;
  toggle: (_e: any) => void;
}

const validationSchema = yup.object().shape({
  podProvider: yup.string().required().url("Please enter a valid url"),
});

interface FormValues {
  podProvider: string;
}

const StyledError = styled.div`
  color: red;
  margin-bottom: 8px;
`;

const PodProviderModal: React.FunctionComponent<PodProviderModalProps> = ({
  isOpen,
  toggle,
}: PodProviderModalProps) => {
  const handleSubmit = async (
    values: FormValues,
    { setFieldError }: FormikHelpers<FormValues>
  ) => {
    try {
      await login({
        oidcIssuer: values.podProvider,
        redirectUrl: window.location.href,
        clientName: "Solid Grocery List",
      });
    } catch {
      setFieldError(
        "podProvider",
        "We're sorry something went wrong. Try again or enter a different provider"
      );
    }
  };

  return (
    <StyledModal
      isOpen={isOpen}
      onBackgroundClick={toggle}
      onEscapeKeydown={toggle}
    >
      <Formik
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        initialValues={{ podProvider: "https://broker.pod.inrupt.com" }}
      >
        {({
          isValid,
          isSubmitting,
          submitForm,
          values,
          handleChange,
          errors,
          handleBlur,
        }) => (
          <>
            {errors.podProvider && (
              <StyledError> {errors.podProvider}</StyledError>
            )}
            <Input
              name="podProvider"
              value={values.podProvider}
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder="https://inrupt.net"
              label="What is your pod provider ? "
            />
            <Button
              disabled={!isValid || isSubmitting}
              mt={3}
              type="button"
              onClick={submitForm}
            >
              Connect to pod
            </Button>
          </>
        )}
      </Formik>
    </StyledModal>
  );
};

export default PodProviderModal;
