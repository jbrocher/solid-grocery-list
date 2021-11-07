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

  useEffect(() => {
    getProfile(webId).then((profile) => {
      setProfile(profile);
    });
  }, [webId, setProfile]);

  useEffect(() => {
    if (profile) {
      // In the future if other app uses the same tech we might
      // need to get an up to date verion of the public type index
      // before registering a new resource
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
