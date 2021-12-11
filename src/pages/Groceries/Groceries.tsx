import theme from "theme";

import React, { useState } from "react";

import { Link as RouterLink } from "react-router-dom";

import { useGroceryLists } from "utils/api/hooks/groceryLists";

import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Typography from "@mui/material/Typography";

import Loading from "pages/Loading";

import GoBackHeader from "components/atoms/GoBackHeader";
import GroceriesListCreation from "components/organisms/GroceriesListCreation";
import Page from "components/templates/Page";

const Groceries: React.FunctionComponent = () => {
  const { isSuccess, groceryLists } = useGroceryLists();
  const [openForm, setOpenForm] = useState(false);
  if (!isSuccess) {
    return <Loading />;
  }

  return (
    <Page>
      <GoBackHeader title="Groceries" />
      <List sx={{ overflow: "auto" }}>
        {groceryLists.map((list) => (
          <ListItem key={list.identifier}>
            <ListItemButton
              sx={{ flexDirection: "column", justifyContent: "flex-start" }}
              component={RouterLink}
              to={`/groceries/${list.identifier}`}
            >
              <Typography variant="h6"> {list.title} </Typography>
              <Typography color="text.secondary" variant="body2">
                {list.items.length} Items
              </Typography>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Fab
        sx={{
          position: "absolute",
          bottom: theme.spacing(8),
          right: theme.spacing(2),
        }}
        color="primary"
      >
        <AddIcon onClick={() => setOpenForm(true)} />
      </Fab>
      <GroceriesListCreation
        onClose={() => setOpenForm(false)}
        open={openForm}
      />
    </Page>
  );
};

export default Groceries;
