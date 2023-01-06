import Filter from "./Filter";

test("Empty filter doesn't match", () => {
  const filter = new Filter("", []);
  expect(filter.match({})).toBeFalsy();
})

test("filter keys don't match", () => {
  const filter = new Filter("foo", []);
  expect(filter.match({"bar": "bar"})).toBeFalsy();
})

test("filter values don't match", () => {
  const filter = new Filter("foo", ["foo"]);
  expect(filter.match({"foo": "bar"})).toBeFalsy();
})

test("filter values match", () => {
  const filter = new Filter("foo", ["foo"]);
  expect(filter.match({"foo": "foo"})).toBeTruthy();
})

test("filter values match (multiple values)", () => {
  const filter = new Filter("foo", ["baz", "foo"]);
  expect(filter.match({"foo": "foo"})).toBeTruthy();
})

test("filter values match (mixed case)", () => {
  const filter = new Filter("foo", ["FOO"]);
  expect(filter.match({"foo": "foo"})).toBeTruthy();
})
