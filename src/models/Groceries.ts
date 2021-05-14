import Resource from "models/Resource";
import dayjs from "dayjs";
import { groupByIngredients } from "utils/dataManipulation";
import { Recipe } from "utils/api/types";
import ResourceManager from "./Resource";
import { rdf, rdfs } from "rdf-namespaces";
import IngredientManager from "./Ingredient";
import FoodManager from "./Food";
import GrocerylistItemManager from "./GroceryListItem";
import { RecipeFormValues } from "pages/RecipeForm/RecipeForm";
import { TripleSubject, TripleDocument } from "tripledoc";
import { GroceryList, INGREDIENT, RECIPE, TITLE } from "models/iris";

class GroceriesManager extends Resource {
  items: GrocerylistItemManager;
  constructor(profile: TripleSubject, publicTypeIndex: TripleDocument) {
    super(
      profile,
      publicTypeIndex,

      {
        identifier: "groceries",
        storage: "public/groceries-list.ttl",
        iri: GroceryList,
      }
    );
    this.items = new GrocerylistItemManager(profile, publicTypeIndex);
  }

  async getGroceries(): Promise<TripleDocument> {
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
    const groceries = await this.getGroceries();
    const groceriesSubject = groceries.addSubject();
    groceriesSubject.addRef(rdf.type, GroceryList);
    const title = dayjs().format("YYYY-MM-DD");
    await Promise.all(
      Object.keys(ingredients).map(async (identifier) => {
        const itemValues = {
          object: identifier,
          quantity: ingredients[identifier],
          done: false,
        };
        const createdItem = await this.items.create(itemValues);
        groceriesSubject.addRef(rdfs.member, createdItem.asRef());
        return createdItem;
      })
    );
    groceriesSubject.addString(rdfs.label, title);
    groceries.save();
  }
}
