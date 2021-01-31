import {
  createThing,
  setThing,
  SolidDataset,
  addStringNoLocale,
  saveSolidDatasetAt,
  Thing,
} from "@inrupt/solid-client";
import { getOrCreateDataset } from "./utils";
import { rdf } from "rdf-namespaces";
import { FOOD, SHOPPING_CATEGORY } from "./iris";

import { Session } from "@inrupt/solid-client-authn-browser";

interface FoodProps {
  shoppingCategory: string;
}

class Food {
  foodDataset: SolidDataset | null;
  dataSetUrl: string;
  thing: Thing;
  session: Session;

  constructor(session: Session, baseUrl: string, id: string, props: FoodProps) {
    this.dataSetUrl = `${baseUrl}/food-items`;
    this.foodDataset = null;
    this.session = session;

    // Create local thing
    let foodItem = createThing({
      url: `${this.dataSetUrl}/${id}`,
    });
    this.thing = foodItem;
    console.log(this.thing);

    // Add local attributes
    this.thing = addStringNoLocale(this.thing, rdf.type, FOOD);
    this.thing = addStringNoLocale(
      this.thing,
      SHOPPING_CATEGORY,
      props["shoppingCategory"]
    );
  }

  async save(): Promise<SolidDataset> {
    this.foodDataset = await getOrCreateDataset(this.dataSetUrl, this.session);
    this.foodDataset = setThing(this.foodDataset, this.thing);
    saveSolidDatasetAt(this.dataSetUrl, this.foodDataset, {
      fetch: this.session.fetch,
    });

    return this.foodDataset;
  }
}

export default Food;
