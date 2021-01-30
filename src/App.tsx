import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { useSession } from "@inrupt/solid-ui-react";
import { LoginButton } from "@inrupt/solid-ui-react";
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
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{session.info.webId}</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </Container>
  ) : (
    <LoginButton oidcIssuer="https://jbrocher.com" redirectUrl={url} />
  );
}

export default App;
