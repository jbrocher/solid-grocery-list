import {
  Thing,
  asUrl,
  buildThing,
  createThing,
  saveSolidDatasetAt,
  setThing,
} from "@inrupt/solid-client";
import { fetch } from "@inrupt/solid-client-authn-browser";
import ResourceManager from "models/Resource";
import { GroceryList } from "models/iris";
import { rdf, rdfs } from "rdf-namespaces";

import { Recipe } from "utils/api/types";
import { groupByIngredients } from "utils/dataManipulation";

import GrocerylistItemManager from "./GroceryListItem";

class GroceriesManager extends ResourceManager {
  items: GrocerylistItemManager;
  constructor(profile: Thing) {
    super(profile, {
      identifier: "groceries",
      storage: "public/grocery-list.ttl",
      iri: GroceryList,
    });
    this.items = new GrocerylistItemManager(profile);
    this.items.initialize();
  }

  async getGroceries() {
    return this.getOrCreate();
  }

  async getGroceriesResources() {
    const groceryLists = await this.getGroceries();
    const groceryListItems = await this.items.getGroceryListItems();
    const foods = await this.items.foods.getFoods();
    return { groceryLists, groceryListItems, foods };
  }

  async createFromRecipes(recipes: Recipe[], listName: string) {
    const ingredients = groupByIngredients(recipes);
    let groceries = await this.getGroceries();

    const groceriesSubject = buildThing(createThing()).addUrl(
      rdf.type,
      GroceryList
    );

    await Promise.all(
      Object.keys(ingredients).map(async (identifier) => {
        const itemValues = {
          object: identifier,
          quantity: ingredients[identifier],
          done: false,
        };
        const createdItem = await this.items.create(itemValues);
        groceriesSubject.addUrl(
          rdfs.member,
          asUrl(createdItem, this.items.getBaseUrl())
        );
        return createdItem;
      })
    );

    groceriesSubject.addStringNoLocale(rdfs.label, listName);
    groceries = setThing(groceries, groceriesSubject.build());
    await saveSolidDatasetAt(this.getBaseUrl(), groceries, { fetch: fetch });
  }
}

export default GroceriesManager;
