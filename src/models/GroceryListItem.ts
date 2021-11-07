import ResourceManager from "models/Resource";
import { rdf } from "rdf-namespaces";
import {
  setStringNoLocale,
  saveSolidDatasetAt,
  getThing,
  getStringNoLocale,
  createThing,
  buildThing,
  setThing,
  ThingPersisted,
  Thing,
} from "@inrupt/solid-client";
import { fetch } from "@inrupt/solid-client-authn-browser";
import { GroceryListItem as GroceryListItemType } from "utils/api/types";

import {
  GroceryListItem,
  groceryListItemObject,
  groceryListItemDone,
  QUANTITY,
} from "models/iris";
import FoodManager from "models/Food";

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
    const groceryListItems = await this.getGroceryListItems();
    const subject = getThing(
      groceryListItems,
      this.makeRef(item.identifier)
    ) as ThingPersisted;
    const checked = getStringNoLocale(subject, groceryListItemDone) === "true";

    setStringNoLocale(subject, groceryListItemDone, checked ? "false" : "true");
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
