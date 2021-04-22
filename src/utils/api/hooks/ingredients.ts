import { METRIC_QUANTITY, FOOD, INGREDIENT } from "models/iris";
import { useQuery } from "react-query";
import { makeRef } from "utils/api/helpers";
import { rdf } from "rdf-namespaces";
import { useProfile } from "ProfileContext";
import { TripleSubject, TripleDocument } from "tripledoc";
import { getIngredients } from "utils/api/helpers";

export const useIngredients = () => {
  const { profile, publicTypeIndex } = useProfile();
  const { isLoading, data: ingredients } = useQuery<TripleDocument, Error>(
    ["ingredients", profile, publicTypeIndex],
    () =>
      getIngredients(
        profile as TripleSubject,
        publicTypeIndex as TripleDocument
      ),
    {
      enabled: !!profile && !!publicTypeIndex,
    }
  );

  return { isLoading, ingredients };
};

export const useCreateIngredient = () => {
  const { ingredients } = useIngredients();
  const { profile } = useProfile();
};
