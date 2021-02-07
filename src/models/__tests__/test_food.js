import Food from "../Food";
import { FOOD } from "../iris";

test("It should create a food instance", async () => {
  saveSolidDatasetAt.mockImplementation(() => createSolidDataset());
  const props = {
    shoppingCategory: "fruits",
  };
  const foodItem = new Food("https://example.com", "apple", props);
  expect(foodItem.type).toEqual(FOOD);
  expect(foodItem.shoppingCategory).toEqual("fruits");
});
