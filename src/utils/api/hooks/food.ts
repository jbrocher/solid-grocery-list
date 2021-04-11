import { useProfile } from "ProfileContext";
import { TripleDocument } from "tripledoc";
import { useEffect, useState } from "react";
import { getFoods } from "utils/api/helpers";

export const useFoods = () => {
  const { profile, publicTypeIndex } = useProfile();
  const [foods, setFoods] = useState<TripleDocument | null>(null);
  useEffect(() => {
    console.log("use foods");
    if (profile && publicTypeIndex) {
      getFoods(profile, publicTypeIndex).then((foods) => setFoods(foods));
    }
  }, [profile, publicTypeIndex]);
  return foods;
};
