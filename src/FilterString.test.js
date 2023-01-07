import FilterString from "./FilterString";

test("Empty filter doesn't match", () => {
  const filter = FilterString.createNew("", []);
  expect(filter.match({})).toBeFalsy();
})

test("filter keys don't match", () => {
  const filter = FilterString.createNew("foo", []);
  expect(filter.match({"bar": "bar"})).toBeFalsy();
})

test("filter values don't match", () => {
  const filter = FilterString.createNew("foo", ["foo"]);
  expect(filter.match({"foo": "bar"})).toBeFalsy();
})

test("filter values match", () => {
  const filter = FilterString.createNew("foo", ["foo"]);
  expect(filter.match({"foo": "foo"})).toBeTruthy();
})

test("filter values match (multiple values)", () => {
  const filter = FilterString.createNew("foo", ["baz", "foo"]);
  expect(filter.match({"foo": "foo"})).toBeTruthy();
})

test("filter values match (mixed case)", () => {
  const filter = FilterString.createNew("foo", ["FOO"]);
  expect(filter.match({"foo": "foo"})).toBeTruthy();
})

test("filter array match (mixed case)", () => {
  const filter = FilterString.createNew("color", ["orange"]);
  expect(filter.match({"color": ["oRange"]})).toBeTruthy();
})
