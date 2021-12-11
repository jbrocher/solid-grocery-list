import {
  Thing,
  ThingPersisted,
  buildThing,
  createThing,
  getStringNoLocale,
  getThing,
  saveSolidDatasetAt,
  setStringNoLocale,
  setThing,
} from "@inrupt/solid-client";
import { fetch } from "@inrupt/solid-client-authn-browser";
import FoodManager from "models/Food";
import ResourceManager from "models/Resource";
import {
  GroceryListItem,
  QUANTITY,
  groceryListItemDone,
  groceryListItemObject,
} from "models/iris";
import { rdf } from "rdf-namespaces";

import { GroceryListItem as GroceryListItemType } from "utils/api/types";

interface GroceryListItemValues {
  done: boolean;
  object: string;
  quantity: number;
}
class GroceryListItemManager extends ResourceManager {
  foods: FoodManager;
  constructor(profile: Thing) {
    super(profile, {
      identifier: "groceryListItem",
      storage: "public/grocery-list-item.ttl",
      iri: GroceryListItem,
    });
    this.foods = new FoodManager(profile);
  }

  getGroceryListItems = async () => {
    return this.getOrCreate();
  };

  toggle = async (item: GroceryListItemType) => {
    let groceryListItems = await this.getGroceryListItems();
    let subject = getThing(
      groceryListItems,
      this.makeRef(item.identifier)
    ) as ThingPersisted;
    const checked = getStringNoLocale(subject, groceryListItemDone) === "true";

    subject = setStringNoLocale(
      subject,
      groceryListItemDone,
      checked ? "false" : "true"
    );
    groceryListItems = setThing(groceryListItems, subject);
    saveSolidDatasetAt(this.getBaseUrl(), groceryListItems, { fetch: fetch });
    item.done = !checked;
    return item;
  };

  create = async (groceryListItem: GroceryListItemValues) => {
    let groceryListItems = await this.getGroceryListItems();
    const itemSubject = buildThing(createThing())
      .addUrl(rdf.type, GroceryListItem)
      .addUrl(groceryListItemObject, this.foods.makeRef(groceryListItem.object))
      .addStringNoLocale(
        groceryListItemDone,
        groceryListItem.done ? "true" : "false"
      )
      .addInteger(QUANTITY, groceryListItem.quantity)
      .build();

    groceryListItems = setThing(groceryListItems, itemSubject);
    saveSolidDatasetAt(this.getBaseUrl(), groceryListItems, { fetch: fetch });

    return itemSubject;
  };
}

export default GroceryListItemManager;
