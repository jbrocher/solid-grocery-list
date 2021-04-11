import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ModalProvider } from "styled-react-modal";
import FoodForm from "./pages/FoodForm";
import Box from "components/atoms/Box";
import RecipeForm from "./pages/RecipeForm";
import FoodList from "./pages/FoodList";
import RecipeList from "./pages/RecipeList";
import auth from "solid-auth-client";
import ProfileProvider from "ProfileContext";

import BottomBar from "components/organisms/BottomBar";
export const WebIdContext = React.createContext("");
function App() {
  const [webId, setWebId] = useState("");

  useEffect(() => {
    // WARNING: this run twice
    async function getWebId() {
      /* 1. Check if we've already got the user's WebID and access to their Pod: */
      let session = await auth.currentSession();
      if (session) {
        return session.webId;
      }

      /* 2. User has not logged in; ask for their Identity Provider: */
      // Implement `getIdentityProvider` to get a string with the user's Identity Provider (e.g.
      // `https://inrupt.net` or `https://solid.community`) using a method of your choice.
      const identityProvider = "https://inrupt.net";

      /* 3. Initiate the login process - this will redirect the user to their Identity Provider: */
      auth.login(identityProvider);
    }
    getWebId().then((webId) => setWebId(webId ? webId : ""));
  }, []);

  return webId !== "" ? (
    <WebIdContext.Provider value={webId}>
      <ProfileProvider>
        <ModalProvider>
          <Router>
            <Box height="100vh" display="flex" flexDirection="column">
              <Switch>
                <Route exact path="/recipe-list" component={RecipeList} />
                <Route exact path="/recipe-form" component={RecipeForm} />
                <Route exact path="/food-form" component={FoodForm} />
                <Route exact path="/food-list" component={FoodList} />
                <Route exact component={FoodList} />
              </Switch>
              <BottomBar />
            </Box>
          </Router>
        </ModalProvider>
      </ProfileProvider>
    </WebIdContext.Provider>
  ) : (
    <>loading...</>
  );
}

export default App;
