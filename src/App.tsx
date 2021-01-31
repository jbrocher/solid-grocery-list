import React, { useEffect, useState } from "react";
import "./App.css";
import { useSession } from "@inrupt/solid-ui-react";
import { LoginButton } from "@inrupt/solid-ui-react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import FoodForm from "./pages/FoodForm";

function App() {
  const { session } = useSession();
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  return session.info.isLoggedIn ? (
    <Router>
      <Switch>
        <Route component={FoodForm} />
      </Switch>
    </Router>
  ) : (
    <LoginButton oidcIssuer="https://jbrocher.com" redirectUrl={url} />
  );
}

export default App;
