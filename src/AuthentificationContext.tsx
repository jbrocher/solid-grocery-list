import React, { useEffect, useState, useContext } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useHistory } from "react-router-dom";
import {
  handleIncomingRedirect,
  getDefaultSession,
} from "@inrupt/solid-client-authn-browser";
import LoginForm from "pages/LoginForm";
import Box from "@mui/material/Box";

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
      <Box
        height="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <CircularProgress color="primary" />
      </Box>
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
