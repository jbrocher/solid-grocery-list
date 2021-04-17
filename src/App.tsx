import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { ModalProvider } from "styled-react-modal";
import FoodForm from "./pages/FoodForm";
import Box from "components/atoms/Box";
import RecipeForm from "./pages/RecipeForm";
import FoodList from "./pages/FoodList";
import RecipeList from "./pages/RecipeList";
import AuthentificationProvider from "AuthentificationContext";
import ProfileProvider from "ProfileContext";

import BottomBar from "components/organisms/BottomBar";
function App() {
  return (
    <ModalProvider>
      <AuthentificationProvider>
        <ProfileProvider>
          <Router>
            <Box height="100vh" display="flex" flexDirection="column">
              <Switch>
                <Route exact path="/recipe-list" component={RecipeList} />
                <Route exact path="/recipe-form" component={RecipeForm} />
                <Route exact path="/food-form" component={FoodForm} />
                <Route exact path="/food-list" component={FoodList} />
                <Redirect to="/recipe-list" />
              </Switch>
              <BottomBar />
            </Box>
          </Router>
        </ProfileProvider>
      </AuthentificationProvider>
    </ModalProvider>
  );
}

export default App;
