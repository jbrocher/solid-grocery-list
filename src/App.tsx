import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { useSession } from "@inrupt/solid-ui-react";
import { LoginButton } from "@inrupt/solid-ui-react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import FoodForm from "./pages/FoodForm";
import styled from "styled-components";

function App() {
  const { session } = useSession();
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  const Container = styled.div`
    background-color: ${(props) => props.theme.colors.pink};
  `;
  return session.info.isLoggedIn ? (
    <Container>
      <Router>
        <Switch>
          <Route component={FoodForm} />
        </Switch>
      </Router>
    </Container>
  ) : (
    <LoginButton oidcIssuer="https://jbrocher.com" redirectUrl={url} />
  );
}

export default App;
