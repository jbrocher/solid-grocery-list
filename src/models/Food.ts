import {
  Thing,
  asUrl,
  buildThing,
  createThing,
  saveSolidDatasetAt,
  setThing,
} from "@inrupt/solid-client";
import { fetch } from "@inrupt/solid-client-authn-browser";
import { Food, shoppingCategory } from "models/iris";
import { rdf, rdfs } from "rdf-namespaces";

import ResourceManager from "./Resource";

class FoodManager extends ResourceManager {
  constructor(profile: Thing) {
    super(profile, {
      identifier: "food",
      storage: "public/food-list.ttl",
      iri: Food,
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
      .addUrl(rdf.type, Food)
      .addStringNoLocale(shoppingCategory, shoppingCategory)
      .addStringNoLocale(rdfs.label, name)
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
