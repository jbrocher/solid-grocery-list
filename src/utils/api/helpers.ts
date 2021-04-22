import { rdf, solid, space } from "rdf-namespaces";
import {
  METRIC_QUANTITY,
  TITLE,
  INGREDIENT,
  FOOD,
  RECIPE,
  GroceryList,
  GroceryListItem,
} from "models/iris";
import {
  createDocument,
  fetchDocument,
  TripleSubject,
  TripleDocument,
} from "tripledoc";
import { RecipeFormValues } from "pages/RecipeForm/RecipeForm";
import { Ingredient, Recipe } from "utils/api/types";

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
  const typeRegistration = publicTypeIndex.addSubject({
    identifier: ressource,
  });
  typeRegistration.addRef(rdf.type, solid.TypeRegistration);
  typeRegistration.addRef(solid.instance, list.asRef());
  typeRegistration.addRef(solid.forClass, RESSOURCES[ressource].iri);
  return await publicTypeIndex.save([typeRegistration]);
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

export const getFoods = async (
  profile: TripleSubject,
  publicTypeIndex: TripleDocument
) => {
  return getOrCreateRessource(profile, publicTypeIndex, "food");
};

export const getRecipes = async (
  profile: TripleSubject,
  publicTypeIndex: TripleDocument
): Promise<TripleDocument> => {
  return getOrCreateRessource(profile, publicTypeIndex, "recipe");
};

export const getRecipeResources = async (
  profile: TripleSubject,
  publicTypeIndex: TripleDocument
) => {
  const foods = await getFoods(profile, publicTypeIndex);
  const ingredients = await getIngredients(profile, publicTypeIndex);
  const recipes = await getRecipes(profile, publicTypeIndex);

  return { foods, ingredients, recipes };
};

export const getGroceryLists = async (
  profile: TripleSubject,
  publicTypeIndex: TripleDocument
): Promise<TripleDocument> => {
  return getOrCreateRessource(profile, publicTypeIndex, "groceryList");
};

export const getGroceryListItems = async (
  profile: TripleSubject,
  publicTypeIndex: TripleDocument
): Promise<TripleDocument> => {
  return getOrCreateRessource(profile, publicTypeIndex, "groceryListItem");
};

export const getGroceryListsResources = async (
  profile: TripleSubject,
  publicTypeIndex: TripleDocument
) => {
  const groceryLists = await getGroceryLists(profile, publicTypeIndex);
  const groceryListItems = await getGroceryListItems(profile, publicTypeIndex);
  const foods = await getFoods(profile, publicTypeIndex);
  return { groceryLists, groceryListItems, foods };
};

export const createIngredient = async (
  ingredient: Ingredient,
  ingredients: TripleDocument,
  profile: TripleSubject
) => {
  // Create a new subject of type ingredient
  // with a GUI
  const ingredientSubject = ingredients.addSubject();
  ingredientSubject.addRef(rdf.type, INGREDIENT);
  ingredientSubject.addRef(
    FOOD,
    makeRef(ingredient.food.identifier, profile, "food")
  );
  ingredientSubject.addInteger(METRIC_QUANTITY, ingredient.quantity);
  await ingredients.save();
  return ingredientSubject;
};

export const createRecipe = async (
  recipe: RecipeFormValues,
  recipes: TripleDocument,
  ingredients: TripleDocument,
  profile: TripleSubject
) => {
  const recipeSubject = recipes.addSubject();
  recipeSubject.addRef(rdf.type, RECIPE);
  recipeSubject.addString(TITLE, recipe.title);
  await Promise.all(
    recipe.ingredients.map(async (ingredient) => {
      const createdIngredient = await createIngredient(
        ingredient,
        ingredients,
        profile
      );
      recipeSubject.addRef(INGREDIENT, createdIngredient.asRef());
      return createdIngredient;
    })
  );
  await recipes.save();
  return {
    ...recipe,
    identifier: recipeSubject.asRef().split("#")[1],
  };
};

export const createGroceryListFromRecipes = (
  recipes: Recipe[],
  groceryLists: TripleDocument,
  groceryListItemsList: TripleDocument
) => {};
