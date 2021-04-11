import { rdf, solid, space } from "rdf-namespaces";
import { INGREDIENT, FOOD, RECIPE } from "models/iris";
import {
  createDocument,
  fetchDocument,
  TripleSubject,
  TripleDocument,
} from "tripledoc";

export const getProfile = async (webId: string): Promise<TripleSubject> => {
  const webIdDoc = await fetchDocument(webId);

  return webIdDoc.getSubject(webId);
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
};

export type Ressource = keyof typeof RESSOURCES;

export const makeRef = (
  identifier: string,
  profile: TripleSubject,
  ressource: Ressource
) => {
  const storage = profile.getRef(space.storage);

  // Decide at what URL within the user's Pod the new Document should be stored:
  return `${storage}${RESSOURCES[ressource].storage}#${identifier}`;
};

export const getPublicTypeIndex = async (
  profile: TripleSubject
): Promise<TripleDocument> => {
  /* 1. Check if a Document tracking our notes already exists. */
  const publicTypeIndexRef = (profile as TripleSubject).getRef(
    solid.publicTypeIndex
  );

  if (publicTypeIndexRef) {
    const publicTypeIndex = await fetchDocument(publicTypeIndexRef);
    return publicTypeIndex;
  } else {
    throw new Error("Missing public type index");
  }
};

const createFoodList = async (
  profile: TripleSubject,
  publicTypeIndex: TripleDocument
): Promise<TripleDocument> => {
  return createRessource(profile, publicTypeIndex, "food");
};

const createRecipeList = async (
  profile: TripleSubject,
  publicTypeIndex: TripleDocument
): Promise<TripleDocument> => {
  return createRessource(profile, publicTypeIndex, "recipe");
};

const createRessource = async (
  profile: TripleSubject,
  publicTypeIndex: TripleDocument,
  ressource: keyof typeof RESSOURCES
): Promise<TripleDocument> => {
  const storage = profile.getRef(space.storage);

  // Decide at what URL within the user's Pod the new Document should be stored:
  const ref = storage + RESSOURCES[ressource].storage;
  // Create the new Document:
  const list = createDocument(ref);
  list.save();

  // Store a reference to that Document in the public Type Index for `schema:TextDigitalDocument`:
  const typeRegistration = publicTypeIndex.addSubject();
  typeRegistration.addRef(rdf.type, solid.TypeRegistration);
  typeRegistration.addRef(solid.instance, list.asRef());
  typeRegistration.addRef(solid.forClass, RESSOURCES[ressource].iri);
  const test = publicTypeIndex.save([typeRegistration]);

  return test;
};

export const getOrCreateFoodList = async (
  profile: TripleSubject,
  publicTypeIndex: TripleDocument
): Promise<TripleDocument> => {
  const foodListEntry = publicTypeIndex.findSubject(solid.forClass, FOOD);

  if (foodListEntry == null) {
    return await createFoodList(profile, publicTypeIndex);
  } else {
    const foodListRef = foodListEntry.getRef(solid.instance);
    if (foodListRef) {
      const foodList = await fetchDocument(foodListRef);
      return foodList;
    } else {
      throw new Error("Invalid food list type registry");
    }
  }
};

export const getOrCreateRecipeList = async (
  profile: TripleSubject,
  publicTypeIndex: TripleDocument
): Promise<TripleDocument> => {
  const recipeListEntry = publicTypeIndex.findSubject(solid.forClass, RECIPE);

  if (recipeListEntry == null) {
    return await createRecipeList(profile, publicTypeIndex);
  } else {
    const foodListRef = recipeListEntry.getRef(solid.instance);
    if (foodListRef) {
      const foodList = await fetchDocument(foodListRef);
      return foodList;
    } else {
      throw new Error("Invalid recipe list type registry");
    }
  }
};

export const getOrCreateRessource = async (
  profile: TripleSubject,
  publicTypeIndex: TripleDocument,
  ressource: keyof typeof RESSOURCES
): Promise<TripleDocument> => {
  const entry = publicTypeIndex.findSubject(
    solid.forClass,
    RESSOURCES[ressource].iri
  );

  if (entry == null) {
    return await createRessource(profile, publicTypeIndex, ressource);
  } else {
    const ressourceRef = entry.getRef(solid.instance);
    if (ressourceRef) {
      const ressourceList = await fetchDocument(ressourceRef);
      return ressourceList;
    } else {
      throw new Error("Invalid recipe list type registry");
    }
  }
};

export const getIngredients = async (
  profile: TripleSubject,
  publicTypeIndex: TripleDocument
) => {
  return getOrCreateRessource(profile, publicTypeIndex, "ingredient");
};
