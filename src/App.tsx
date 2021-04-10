import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import FoodForm from "./pages/FoodForm";
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
        setWebId(session.webId);
        return webId;
      }

      /* 2. User has not logged in; ask for their Identity Provider: */
      // Implement `getIdentityProvider` to get a string with the user's Identity Provider (e.g.
      // `https://inrupt.net` or `https://solid.community`) using a method of your choice.
      const identityProvider = "https://jbrocher.com";

      /* 3. Initiate the login process - this will redirect the user to their Identity Provider: */
      auth.login(identityProvider);
    }
    getWebId().then();
  }, [webId]);

  return webId !== "" ? (
    <WebIdContext.Provider value={webId}>
      <ProfileProvider>
        <Router>
          <Switch>
            <Route exact path="/food-list" component={FoodList} />
            <Route exact path="/recipe-list" component={RecipeList} />
            <Route exact path="/recipe-form" component={RecipeForm} />
            <Route component={FoodForm} />
          </Switch>
          <BottomBar />
        </Router>
      </ProfileProvider>
    </WebIdContext.Provider>
  ) : (
    <>loading...</>
  );
}

export default App;
