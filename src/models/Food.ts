import ResourceManager from "./Resource";
import { FOOD } from "models/iris";
import { TripleSubject, TripleDocument } from "tripledoc";

class FoodManager extends ResourceManager {
  constructor(profile: TripleSubject, publicTypeIndex: TripleDocument) {
    super(profile, publicTypeIndex, {
      identifier: "food",
      storage: "public/food-list.ttl",
      iri: FOOD,
    });
  }
  async getFoods() {
    return this.getOrCreate();
  }
}

export default FoodManager;
