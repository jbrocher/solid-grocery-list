import React, { useState } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

interface GroceryListModalProps {
  cancel: () => void;
  confirm: (name: string) => void;
  open: boolean;
}

const GroceryListModal: React.FunctionComponent<GroceryListModalProps> = ({
  cancel,
  confirm,
  open,
}) => {
  const [name, setName] = useState("");
  return (
    <Dialog open={open} onClose={cancel}>
      <DialogTitle>Create a List</DialogTitle>
      <DialogContent>
        <DialogContentText>Please give a name to your list.</DialogContentText>
        <TextField
          autoFocus
          value={name}
          onChange={({ target: { value } }) => setName(value)}
          margin="dense"
          id="name"
          label="List name"
          type="email"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => cancel()}>Cancel</Button>
        <Button onClick={() => confirm(name)}>Create Recipe</Button>
      </DialogActions>
    </Dialog>
  );
};

export default GroceryListModal;
