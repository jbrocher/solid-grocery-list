import React, { useEffect, useState, useContext } from "react";

import { getProfile, getPublicTypeIndex } from "utils/api/helpers";
import { SolidDataset, Thing } from "@inrupt/solid-client";

import { useWebId } from "AuthentificationContext";

interface ProfileProps {
  profile: Thing | null;
  publicTypeIndex: SolidDataset | null;
}

const ProfileContext = React.createContext<ProfileProps>({
  profile: null,
  publicTypeIndex: null,
});

const ProfileProvider: React.FunctionComponent = ({ children }) => {
  const { webId } = useWebId();
  const [profile, setProfile] = useState<Thing | null>(null);
  const [publicTypeIndex, setPublicTypeIndex] = useState<SolidDataset | null>(
    null
  );

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
      getPublicTypeIndex(profile).then((publicTypeIndex) => {
        setPublicTypeIndex(publicTypeIndex);
      });
    }
  }, [profile, setPublicTypeIndex]);

  return (
    <ProfileContext.Provider value={{ profile, publicTypeIndex }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);

export default ProfileProvider;
