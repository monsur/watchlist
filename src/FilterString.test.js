import FilterString from "./FilterString";

test("Empty filter doesn't match", () => {
  const filter = new FilterString("", []);
  expect(filter.match({})).toBeFalsy();
})

test("filter keys don't match", () => {
  const filter = new FilterString("foo", []);
  expect(filter.match({"bar": "bar"})).toBeFalsy();
})

test("filter values don't match", () => {
  const filter = new FilterString("foo", ["foo"]);
  expect(filter.match({"foo": "bar"})).toBeFalsy();
})

test("filter values match", () => {
  const filter = new FilterString("foo", ["foo"]);
  expect(filter.match({"foo": "foo"})).toBeTruthy();
})

test("filter values match (multiple values)", () => {
  const filter = new FilterString("foo", ["baz", "foo"]);
  expect(filter.match({"foo": "foo"})).toBeTruthy();
})

test("filter values match (mixed case)", () => {
  const filter = new FilterString("foo", ["FOO"]);
  expect(filter.match({"foo": "foo"})).toBeTruthy();
})

test("filter array match (mixed case)", () => {
  const filter = new FilterString("color", ["orange"]);
  expect(filter.match({"color": ["oRange"]})).toBeTruthy();
})
