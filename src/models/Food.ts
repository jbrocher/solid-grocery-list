import {
  Thing,
  asUrl,
  buildThing,
  createThing,
  saveSolidDatasetAt,
  setThing,
} from "@inrupt/solid-client";
import { fetch } from "@inrupt/solid-client-authn-browser";
import { FOOD, FOOD_NAME, SHOPPING_CATEGORY } from "models/iris";
import { rdf } from "rdf-namespaces";

import ResourceManager from "./Resource";

class FoodManager extends ResourceManager {
  constructor(profile: Thing) {
    super(profile, {
      identifier: "food",
      storage: "public/food-list.ttl",
      iri: FOOD,
    });
  }

  async getFoods() {
    return this.getOrCreate();
  }

  async create(name: string, shoppingCategory: string) {
    let foods = await this.getFoods();
    if (!foods) {
      throw new Error("Missing FoodList");
    }

    const food = buildThing(createThing())
      .addUrl(rdf.type, FOOD)
      .addStringNoLocale(SHOPPING_CATEGORY, shoppingCategory)
      .addStringNoLocale(FOOD_NAME, name)
      .build();

    foods = setThing(foods, food);
    foods = await saveSolidDatasetAt(this.getBaseUrl(), foods, {
      fetch: fetch,
    });

    return {
      identifier: asUrl(food, this.getBaseUrl()).split("#")[1],
      name: name,
      category: shoppingCategory,
    };
  }
}

export default FoodManager;
