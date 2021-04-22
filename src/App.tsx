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
import { ModalProvider } from "styled-react-modal";
import FoodForm from "./pages/FoodForm";
import Groceries from "./pages/Groceries";
import Box from "components/atoms/Box";
import RecipeForm from "./pages/RecipeForm";
import FoodList from "./pages/FoodList";
import RecipeList from "./pages/RecipeList";
import AuthentificationProvider from "AuthentificationContext";
import ProfileProvider from "ProfileContext";

import BottomBar from "components/organisms/BottomBar";
const client = new QueryClient();
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
                  <Route exact path="/groceries" component={Groceries} />
                  <Redirect to="/recipe-list" />
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
