import { login } from "@inrupt/solid-client-authn-browser";
import { Formik, FormikHelpers } from "formik";
import * as yup from "yup";

import React from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";

import styled from "styled-components";

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
    <Dialog open={isOpen} onClose={toggle}>
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
            <DialogContent>
              {errors.podProvider && (
                <StyledError> {errors.podProvider}</StyledError>
              )}
              <TextField
                name="podProvider"
                value={values.podProvider}
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="https://inrupt.net"
                label="What is your pod provider ? "
              />
            </DialogContent>
            <DialogActions>
              <Button
                variant="contained"
                sx={{
                  mt: 3,
                }}
                disabled={!isValid || isSubmitting}
                type="button"
                onClick={submitForm}
              >
                Connect to pod
              </Button>
            </DialogActions>
          </>
        )}
      </Formik>
    </Dialog>
  );
};

export default PodProviderModal;
