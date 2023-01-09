import FilterString from "./FilterString";
import data from "../public/data.json";

test("Empty filter doesn't match", () => {
  const filter = FilterString.createNew("brand", data);
  expect(filter.match({})).toBeFalsy();
})

test("filter keys don't match", () => {
  const filter = FilterString.createNew("brand", data);
  expect(filter.match({"bar": "bar"})).toBeFalsy();
})

test("filter values don't match", () => {
  const filter = FilterString.createNew("brand", data);
  expect(filter.match({"brand": "Rolex"})).toBeFalsy();
})

test("filter values match", () => {
  const filter = FilterString.createNew("brand", data);
  filter.initialize("rolex");
  expect(filter.match({"brand": "Rolex"})).toBeTruthy();
})

test("filter values match (multiple values)", () => {
  const filter = FilterString.createNew("brand", data);
  filter.initialize("rolex,cartier");
  expect(filter.match({"brand": "Cartier"})).toBeTruthy();
})