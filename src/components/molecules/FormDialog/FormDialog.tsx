import React from "react";

import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";

import Header from "./Header";
import Main from "./Main";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface FormDialogProps {
  open: boolean;
  onClose: () => void;
}

interface CompoundFormDialog extends React.FunctionComponent<FormDialogProps> {
  Main: React.FunctionComponent;
  Header: React.FunctionComponent;
}

export const FormDialogContext = React.createContext<FormDialogProps>(
  {} as FormDialogProps
);

const FormDialog: CompoundFormDialog = ({ open, onClose, children }) => {
  return (
    <FormDialogContext.Provider value={{ open, onClose }}>
      <Dialog TransitionComponent={Transition} fullScreen open={open}>
        {children}
      </Dialog>
    </FormDialogContext.Provider>
  );
};

FormDialog.Main = Main;
FormDialog.Header = Header;

export default FormDialog;
