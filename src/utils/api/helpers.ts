import { solid, space } from "rdf-namespaces";
import {
  INGREDIENT,
  FOOD,
  RECIPE,
  GroceryList,
  GroceryListItem,
} from "models/iris";
import {
  Thing,
  getUrl,
  setThing,
  asUrl,
  buildThing,
  createSolidDataset,
  saveSolidDatasetAt,
  getSolidDataset,
  getThing,
} from "@inrupt/solid-client";

import { fetch } from "@inrupt/solid-client-authn-browser";

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

export const getProfile = async (webId: string) => {
  let webIdDoc = await getSolidDataset(webId);

  let profile = getThing(webIdDoc, webId) as Thing;

  const profileUrl = asUrl(profile);
  const podRootPosition = profileUrl.search(/\profile\/card#me$/);
  const podRoot = profileUrl.substr(0, podRootPosition);

  let publicTypeIndexRef = getUrl(profile, solid.publicTypeIndex);
  if (!publicTypeIndexRef) {
    // Get public type index url
    publicTypeIndexRef = podRoot + "settings/publicTypeIndex.ttl";

    // create publicTypeIndex
    let publicTypeIndex = createSolidDataset();
    await saveSolidDatasetAt(publicTypeIndexRef, publicTypeIndex, {
      fetch: fetch,
    });
  }

  // Storage
  let storageUrl = getUrl(profile, space.storage);
  if (!storageUrl) {
    storageUrl = podRoot + "/public";
  }

  //Update profile
  profile = buildThing(profile)
    .addUrl(solid.publicTypeIndex, publicTypeIndexRef)
    .addUrl(space.storage, storageUrl)
    .build();

  webIdDoc = setThing(webIdDoc, profile);
  webIdDoc = await saveSolidDatasetAt(webId, webIdDoc, { fetch: fetch });

  return profile;
};
