import React, { useEffect, useState, useContext } from "react";

import { getProfile, getPublicTypeIndex } from "utils/api/helpers";
import { TripleSubject, TripleDocument } from "tripledoc";
import { useWebId } from "AuthentificationContext";

interface ProfileProps {
  profile: TripleSubject | null;
  publicTypeIndex: TripleDocument | null;
}

const ProfileContext = React.createContext<ProfileProps>({
  profile: null,
  publicTypeIndex: null,
});

const ProfileProvider: React.FunctionComponent = ({ children }) => {
  const { webId } = useWebId();
  const [profile, setProfile] = useState<TripleSubject | null>(null);
  const [publicTypeIndex, setPublicTypeIndex] = useState<TripleDocument | null>(
    null
  );

  useEffect(() => {
    getProfile(webId).then((profile) => {
      setProfile(profile);
    });
  }, [webId, setProfile]);

  useEffect(() => {
    if (profile) {
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
