import ResourceManager from "models/Resource";
import dayjs from "dayjs";
import { groupByIngredients } from "utils/dataManipulation";
import { Recipe } from "utils/api/types";
import { rdf, rdfs } from "rdf-namespaces";
import GrocerylistItemManager from "./GroceryListItem";
import {
  Thing,
  asUrl,
  saveSolidDatasetAt,
  setThing,
  buildThing,
  createThing,
} from "@inrupt/solid-client";
import { fetch } from "@inrupt/solid-client-authn-browser";
import { GroceryList } from "models/iris";

class GroceriesManager extends ResourceManager {
  items: GrocerylistItemManager;
  constructor(profile: Thing) {
    super(profile, {
      identifier: "groceries",
      storage: "public/grocery-list.ttl",
      iri: GroceryList,
    });
    this.items = new GrocerylistItemManager(profile);
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

  async createFromRecipes(recipes: Recipe[]) {
    const ingredients = groupByIngredients(recipes);
    let groceries = await this.getGroceries();

    const groceriesSubject = buildThing(createThing()).addUrl(
      rdf.type,
      GroceryList
    );

    const title = dayjs().format("YYYY-MM-DD");
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
    groceriesSubject.addStringNoLocale(rdfs.label, title);
    groceries = setThing(groceries, groceriesSubject.build());
    saveSolidDatasetAt(this.getBaseUrl(), groceries, { fetch: fetch });
  }
}

export default GroceriesManager;
