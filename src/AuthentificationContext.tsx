import React, { useEffect, useState, useContext } from "react";
import {
  handleIncomingRedirect,
  login,
  fetch,
  getDefaultSession,
} from "@inrupt/solid-client-authn-browser";
import LoginForm from "pages/LoginForm";

interface AuthentificationContextProps {
  webId: string;
}
const AuthentificationContext =
  React.createContext<AuthentificationContextProps>({
    webId: "",
  });
const AuthentificationProvider: React.FunctionComponent = ({ children }) => {
  const [webId, setWebId] = useState("");
  useEffect(() => {
    const handleLogin = async () => {
      await handleIncomingRedirect();
      const session = getDefaultSession();
      if (session.info.isLoggedIn) {
        setWebId(session.info.webId ? session.info.webId : "");
      }
    };
    handleLogin();
  }, []);

  return (
    <AuthentificationContext.Provider value={{ webId }}>
      {webId !== "" ? children : <LoginForm />}
    </AuthentificationContext.Provider>
  );
};

export const useWebId = () => useContext(AuthentificationContext);

export default AuthentificationProvider;
