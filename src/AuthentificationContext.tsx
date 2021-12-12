import {
  getDefaultSession,
  handleIncomingRedirect,
} from "@inrupt/solid-client-authn-browser";

import React, { useContext, useEffect, useState } from "react";

import { useHistory } from "react-router-dom";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

import LoginForm from "pages/LoginForm";
import Loading from "pages/Loading"

interface AuthentificationContextProps {
  webId: string;
}
const AuthentificationContext =
  React.createContext<AuthentificationContextProps>({
    webId: "",
  });
const AuthentificationProvider: React.FunctionComponent = ({ children }) => {
  const [webId, setWebId] = useState<string>();
  const history = useHistory();
  useEffect(() => {
    const handleLogin = async () => {
      await handleIncomingRedirect({ restorePreviousSession: true });
      const session = getDefaultSession();
      if (session.info.isLoggedIn) {
        setWebId(session.info.webId ? session.info.webId : "");
      } else {
        setWebId("");
      }
      history.replace("/");
    };
    handleLogin();
  }, [history]);

  if (webId === undefined) {
    return (
      <Loading />
    );
  }

  return (
    <AuthentificationContext.Provider value={{ webId }}>
      {webId !== "" ? children : <LoginForm />}
    </AuthentificationContext.Provider>
  );
};

export const useWebId = () => useContext(AuthentificationContext);

export default AuthentificationProvider;
