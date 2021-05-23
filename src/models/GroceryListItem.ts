import ResourceManager from "models/Resource";
import { rdf } from "rdf-namespaces";
import { TripleSubject, TripleDocument } from "tripledoc";
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
  constructor(profile: TripleSubject, publicTypeIndex: TripleDocument) {
    super(profile, publicTypeIndex, {
      identifier: "groceryListItem",
      storage: "public/grocery-list-item.ttl",
      iri: GroceryListItem,
    });
    this.foods = new FoodManager(profile, publicTypeIndex);
  }

  getGroceryListItems = async () => {
    return this.getOrCreate();
  };

  toggle = async (item: GroceryListItemType) => {
    const groceryListItems = await this.getGroceryListItems();
    const subject = groceryListItems.getSubject(this.makeRef(item.identifier));
    const checked = subject.getString(groceryListItemDone) === "true";
    subject.setString(groceryListItemDone, checked ? "false" : "true");
    groceryListItems.save();
    item.done = !checked;
    console.log(item);
    return item;
  };

  create = async (groceryListItem: GroceryListItemValues) => {
    const groceryListItems = await this.getGroceryListItems();
    const itemSubject = groceryListItems.addSubject();
    itemSubject.addRef(rdf.type, GroceryListItem);
    itemSubject.addRef(
      groceryListItemObject,
      this.foods.makeRef(groceryListItem.object)
    );
    itemSubject.addString(
      groceryListItemDone,
      groceryListItem.done ? "true" : "false"
    );
    itemSubject.addInteger(QUANTITY, groceryListItem.quantity);
    await groceryListItems.save();
    return itemSubject;
  };
}

export default GroceryListItemManager;
