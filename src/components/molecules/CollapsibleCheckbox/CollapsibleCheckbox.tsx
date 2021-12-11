import React, { useState } from "react";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Box from "@mui/material/Box";
import CheckBox from "@mui/material/Checkbox";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";

interface CollapsibleCheckboxProps {
  title: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CollapsibleCheckbox: React.FunctionComponent<CollapsibleCheckboxProps> =
  ({ title, checked, onChange, children }) => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center">
            <CheckBox onChange={onChange} checked={checked} />
            <Typography variant="h6" textAlign="center">
              {title}
            </Typography>
          </Box>
          {open ? (
            <ExpandMoreIcon onClick={() => setOpen(false)} />
          ) : (
            <KeyboardArrowRightIcon onClick={() => setOpen(true)} />
          )}
        </Box>
        <Collapse in={open}>{children}</Collapse>
      </>
    );
  };

export default CollapsibleCheckbox;
