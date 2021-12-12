import AuthentificationProvider from "AuthentificationContext";
import ProfileProvider from "ProfileContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { ModalProvider } from "styled-react-modal";

import React from "react";

import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";

import { queryFn } from "utils/queryFn";
import { use100vh } from "utils/use100vh";

import Box from "@mui/material/Box";

import FoodForm from "./pages/FoodForm";
import FoodList from "./pages/FoodList";
import Groceries from "./pages/Groceries";
import Homepage from "./pages/Homepage";
import RecipeList from "./pages/RecipeList";

import BottomBar from "components/organisms/BottomBar";

import "./App.css";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: queryFn,
    },
  },
});

function App() {
  const windowHeight = use100vh();

  return (
    <ModalProvider>
      <QueryClientProvider client={client}>
        <Router>
          <AuthentificationProvider>
            <ProfileProvider>
              <Box height={windowHeight} display="flex" flexDirection="column">
                <Switch>
                  <Route exact path="/recipe-list" component={RecipeList} />
                  <Route exact path="/food-form" component={FoodForm} />
                  <Route exact path="/food-list" component={FoodList} />
                  <Route path="/groceries" component={Groceries} />
                  <Route path="/" component={Homepage} />
                  <Redirect to="/" />
                </Switch>
                <BottomBar />
              </Box>
            </ProfileProvider>
          </AuthentificationProvider>
        </Router>
      </QueryClientProvider>
    </ModalProvider>
  );
}

export default App;
