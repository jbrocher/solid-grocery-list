import Food from "../Food";
import { FOOD, SHOPPING_CATEGORY } from "../iris";
import { rdf } from "rdf-namespaces";
import {
  createSolidDataset,
  getThing,
  getStringNoLocale,
  saveSolidDatasetAt,
} from "@inrupt/solid-client";
jest.mock("@inrupt/solid-client", () => ({
  ...jest.requireActual("@inrupt/solid-client"),
  saveSolidDatasetAt: jest.fn(),
}));

test("It should create a food instance", async () => {
  saveSolidDatasetAt.mockImplementation(() => createSolidDataset());
  const props = {
    shoppingCategory: "fruits",
  };
  const foodItem = new Food({}, "https://example.com", "apple", props);
  expect(getStringNoLocale(foodItem.thing, rdf.type)).toEqual(FOOD);

  const foodDataset = await foodItem.save();
  const appleThing = getThing(
    foodDataset,
    "https://example.com/food-items/apple"
  );
  expect(getStringNoLocale(appleThing, rdf.type)).toEqual(FOOD);
  expect(getStringNoLocale(appleThing, SHOPPING_CATEGORY)).toEqual("fruits");
});
