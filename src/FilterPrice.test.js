import FilterPrice from "./FilterPrice";

test("Price doesn't match (low only)", () => {
  let filter = new FilterPrice("100");
  expect(filter.match({"price": 99})).toBeFalsy();
})

test("Price match (low only)", () => {
  let filter = new FilterPrice("100");
  expect(filter.match({"price": 101})).toBeTruthy();
})

test("Price doesn't match (range)", () => {
  let filter = new FilterPrice("100-200");
  expect(filter.match({"price": 99})).toBeFalsy();
})

test("Price match (range)", () => {
  let filter = new FilterPrice("100-200");
  expect(filter.match({"price": 101})).toBeTruthy();
})

test("Price match (range, low)", () => {
  let filter = new FilterPrice("100-200");
  expect(filter.match({"price": 100})).toBeTruthy();
})

test("Price match (range, high)", () => {
  let filter = new FilterPrice("100-200");
  expect(filter.match({"price": 200})).toBeTruthy();
})

