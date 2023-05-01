import FilterPrice from "./FilterPrice";
import data from "../public/wishlist.json";

test("Price doesn't match (low only)", () => {
  let filter = FilterPrice.createNew("price", data);
  filter.initialize("100");
  expect(filter.match({"price": 99})).toBeFalsy();
})

test("Price match (low only)", () => {
  let filter = FilterPrice.createNew("price", data);
  filter.initialize("100");
  expect(filter.match({"price": 101})).toBeTruthy();
})

test("Price doesn't match (range)", () => {
  let filter = FilterPrice.createNew("price", data);
  filter.initialize("100-200");
  expect(filter.match({"price": 99})).toBeFalsy();
})

test("Price match (range)", () => {
  let filter = FilterPrice.createNew("price", data);
  filter.initialize("100-200");
  expect(filter.match({"price": 101})).toBeTruthy();
})

test("Price match (range, low)", () => {
  let filter = FilterPrice.createNew("price", data);
  filter.initialize("100-200");
  expect(filter.match({"price": 100})).toBeTruthy();
})

test("Price match (range, high)", () => {
  let filter = FilterPrice.createNew("price", data);
  filter.initialize("100-200");
  expect(filter.match({"price": 200})).toBeTruthy();
})

test("Invalid low price", () => {
  let filter = FilterPrice.createNew("price", data);
  expect(() => filter.initialize("foo")).toThrow();
})

test("Invalid high price", () => {
  let filter = FilterPrice.createNew("price", data);
  expect(() => filter.initialize("0-foo")).toThrow();
})

test("Invalid range", () => {
  let filter = FilterPrice.createNew("price", data);
  expect(() => filter.initialize("100-1")).toThrow();
})