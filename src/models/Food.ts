import { rdf, space, solid } from "rdf-namespaces";
import { FOOD, SHOPPING_CATEGORY } from "./iris";
import {
  createDocument,
  fetchDocument,
  TripleSubject,
  TripleDocument,
} from "tripledoc";

import { Session } from "@inrupt/solid-client-authn-browser";

class Food {
  type: typeof FOOD;
  identifier: string;
  shoppingCategory: string;
  webId: string;
  profile: TripleSubject | null;
  publicTypeIndex: TripleDocument | null;
  foodList: null | TripleDocument;

  constructor(webId: string, identifier: string, shoppingCategory: string) {
    // Attributes initialized asynchronously
    this.profile = null;
    this.publicTypeIndex = null;
    this.foodList = null;

    this.type = FOOD;
    this.webId = webId;
    this.identifier = identifier;
    this.shoppingCategory = shoppingCategory;
  }

  async _getProfile(): Promise<TripleSubject> {
    const webIdDoc = await fetchDocument(this.webId);

    this.profile = webIdDoc.getSubject(this.webId);
    return this.profile;
  }

  async _getPublicTypeIndex(): Promise<TripleDocument> {
    /* 1. Check if a Document tracking our notes already exists. */
    if (!this.profile) {
      await this._getProfile();
    }
    const publicTypeIndexRef = (this.profile as TripleSubject).getRef(
      solid.publicTypeIndex
    );
    if (publicTypeIndexRef) {
      this.publicTypeIndex = await fetchDocument(publicTypeIndexRef);
    } else {
      throw "Missing public type index";
    }
    return this.publicTypeIndex;
  }

  async _createFoodlist(): Promise<TripleDocument> {
    if (!this.profile) {
      this._getProfile();
    }
    const storage = (this.profile as TripleSubject).getRef(space.storage);

    // Decide at what URL within the user's Pod the new Document should be stored:
    const foodListRef = storage + "public/food-list.ttl";
    // Create the new Document:
    const foodList = createDocument(foodListRef);
    this.foodList = await foodList.save();

    // Store a reference to that Document in the public Type Index for `schema:TextDigitalDocument`:
    if (!this.publicTypeIndex) {
      this._getPublicTypeIndex();
    }
    const typeRegistration = (this
      .publicTypeIndex as TripleDocument).addSubject();
    typeRegistration.addRef(rdf.type, solid.TypeRegistration);
    typeRegistration.addRef(solid.instance, foodList.asRef());
    typeRegistration.addRef(solid.forClass, FOOD);
    const test = (this.publicTypeIndex as TripleDocument).save([
      typeRegistration,
    ]);

    return test;
  }

  async _getOrCreateFoodList(): Promise<TripleDocument> {
    if (!this.publicTypeIndex) {
      await this._getPublicTypeIndex();
    }

    const foodListEntry = (this.publicTypeIndex as TripleDocument).findSubject(
      solid.forClass,
      FOOD
    );

    if (foodListEntry == null) {
      return await this._createFoodlist();
    } else {
      const foodListRef = foodListEntry.getRef(solid.instance);
      if (foodListRef) {
        this.foodList = await fetchDocument(foodListRef);
        return this.foodList;
      } else {
        throw "Invalid food list type registry";
      }
    }
  }

  async init(): Promise<void> {
    this._getOrCreateFoodList();
  }

  async save(): Promise<void> {
    if (!this.foodList) {
      this.init();
    }
    const food = (this.foodList as TripleDocument).addSubject({
      identifier: this.identifier,
    });
    food.addRef(rdf.type, FOOD);
    food.addString(SHOPPING_CATEGORY, this.shoppingCategory);
  }
}

export default Food;
