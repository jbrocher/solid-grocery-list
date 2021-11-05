import { solid, space } from "rdf-namespaces";
import {
  INGREDIENT,
  FOOD,
  RECIPE,
  GroceryList,
  GroceryListItem,
} from "models/iris";
import { Thing, getUrl, getSolidDataset, getThing } from "@inrupt/solid-client";

export const getProfile = async (webId: string) => {
  const webIdDoc = await getSolidDataset(webId);

  return getThing(webIdDoc, webId);
};

export const RESSOURCES = {
  food: {
    storage: "public/food-list.ttl",
    iri: FOOD,
  },
  recipe: {
    storage: "public/recipe-list.ttl",
    iri: RECIPE,
  },
  ingredient: {
    storage: "public/ingredient-list.ttl",
    iri: INGREDIENT,
  },
  groceryList: {
    storage: "public/grocery-list.ttl",
    iri: GroceryList,
  },
  groceryListItem: {
    storage: "public/grocery-list-item.ttl",
    iri: GroceryListItem,
  },
};

export type Ressource = keyof typeof RESSOURCES;

export const makeRef = (
  identifier: string,
  profile: Thing,
  ressource: Ressource
) => {
  const storage = getUrl(profile, space.storage);

  // Decide at what URL within the user's Pod the new Document should be stored:
  return `${storage}${RESSOURCES[ressource].storage}#${identifier}`;
};

export const getPublicTypeIndex = async (profile: Thing) => {
  /* 1. Check if a Document tracking our notes already exists. */
  const publicTypeIndexRef = getUrl(profile, solid.publicTypeIndex);

  if (publicTypeIndexRef) {
    const publicTypeIndex = await getSolidDataset(publicTypeIndexRef);
    return publicTypeIndex;
  } else {
    throw new Error("Missing public type index");
  }
};
