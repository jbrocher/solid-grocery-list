import React, { useEffect, useState, useContext } from "react";
import auth from "solid-auth-client";
import LoginForm from "pages/LoginForm";

interface AuthentificationContextProps {
  webId: string;
}
const AuthentificationContext = React.createContext<AuthentificationContextProps>(
  {
    webId: "",
  }
);
const AuthentificationProvider: React.FunctionComponent = ({ children }) => {
  const [webId, setWebId] = useState("");
  useEffect(() => {
    // WARNING: this run twice
    async function getWebId() {
      /* 1. Check if we've already got the user's WebID and access to their Pod: */
      let session = await auth.currentSession();
      if (session) {
        return session.webId;
      }
    }
    getWebId().then((webId) => setWebId(webId ? webId : ""));
  }, []);

  return (
    <AuthentificationContext.Provider value={{ webId }}>
      {webId !== "" ? children : <LoginForm />}
    </AuthentificationContext.Provider>
  );
};

export const useWebId = () => useContext(AuthentificationContext);

export default AuthentificationProvider;
