import { rdf, solid, space } from "rdf-namespaces";
import { FOOD, RECIPE } from "models/iris";
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

const RESSOURCES = {
  food: {
    storage: "public/food-list.ttl",
    iri: FOOD,
  },
  recipe: {
    storage: "public/recipe-list.ttl",
    iri: RECIPE,
  },
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
  const recipeListEntry = publicTypeIndex.findSubject(solid.forClass, FOOD);

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
