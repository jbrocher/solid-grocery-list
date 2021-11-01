import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { use100vh } from "utils/use100vh";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import {queryFn} from "utils/queryFn"
import { ModalProvider } from "styled-react-modal";
import FoodForm from "./pages/FoodForm";
import Groceries from "./pages/Groceries";
import Box from "components/atoms/Box";
import RecipeForm from "./pages/RecipeForm";
import FoodList from "./pages/FoodList";
import RecipeList from "./pages/RecipeList";
import Homepage from "./pages/Homepage";
import AuthentificationProvider from "AuthentificationContext";
import ProfileProvider from "ProfileContext";


import BottomBar from "components/organisms/BottomBar";
const client = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: queryFn
    }
  }
});

function App() {
  const windowHeight = use100vh();

  return (
    <ModalProvider>
      <QueryClientProvider client={client}>
        <AuthentificationProvider>
          <ProfileProvider>
            <Router>
              <Box height={windowHeight} display="flex" flexDirection="column">
                <Switch>
                  <Route exact path="/recipe-list" component={RecipeList} />
                  <Route exact path="/recipe-form" component={RecipeForm} />
                  <Route exact path="/food-form" component={FoodForm} />
                  <Route exact path="/food-list" component={FoodList} />
                  <Route path="/groceries" component={Groceries} />
                  <Route path="/" component={Homepage} />
                  <Redirect to="/" />
                </Switch>
                <BottomBar />
              </Box>
            </Router>
          </ProfileProvider>
        </AuthentificationProvider>
      </QueryClientProvider>
    </ModalProvider>
  );
}

export default App;
