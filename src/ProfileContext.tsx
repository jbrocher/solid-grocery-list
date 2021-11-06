import React, { useEffect, useState, useContext } from "react";

import { getProfile } from "utils/api/helpers";
import { Thing } from "@inrupt/solid-client";

import { useWebId } from "AuthentificationContext";

interface ProfileProps {
  profile: Thing | null;
}

const ProfileContext = React.createContext<ProfileProps>({
  profile: null,
});

const ProfileProvider: React.FunctionComponent = ({ children }) => {
  const { webId } = useWebId();
  const [profile, setProfile] = useState<Thing | null>(null);
  console.log(profile);
  console.log(webId);

  useEffect(() => {
    getProfile(webId).then((profile) => {
      setProfile(profile);
    });
  }, [webId]);

  useEffect(() => {
    if (profile) {
    }
  }, [profile]);

  return (
    <ProfileContext.Provider value={{ profile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);

export default ProfileProvider;
