import { Filters } from "./Filters";

test("Parse empty query params", () => {
  let searchParams = new URLSearchParams();
  let filters = new Filters(searchParams);
  expect(filters.filters.length).toEqual(0);
  expect(filters.exists()).toEqual(false);
});

test("Parse invalid query params", () => {
  let searchParams = new URLSearchParams();
  searchParams.set("f", "bar");
  searchParams.set("f:", "bar");
  searchParams.set("foo", "bar");
  searchParams.set("g:foo", "bar");
  let filters = new Filters(searchParams);
  expect(filters.filters.length).toEqual(0);
  expect(filters.exists()).toEqual(false);
});

test("Parse empty filter query params", () => {
  let searchParams = new URLSearchParams();
  searchParams.set("f:foo", "");
  let filters = new Filters(searchParams);
  expect(filters.filters.length).toEqual(0);
  expect(filters.exists()).toEqual(false);
});

test("Parse valid filter query params", () => {
  let searchParams = new URLSearchParams();
  searchParams.set("f:foo", "bar");
  let filters = new Filters(searchParams);
  expect(filters.filters.length).toEqual(1);
  expect(filters.exists()).toEqual(true);

  let filter = filters.filters[0];
  expect(filter.key).toEqual("foo");
  expect(filter.vals.length).toEqual(1);
  expect(filter.vals[0]).toEqual("bar");
});

test("Parse filter with multiple values", () => {
  let searchParams = new URLSearchParams();
  searchParams.set("f:foo", "bar,baz");
  let filters = new Filters(searchParams);
  expect(filters.filters.length).toEqual(1);
  expect(filters.exists()).toEqual(true);

  let filter = filters.filters[0];
  expect(filter.key).toEqual("foo");
  expect(filter.vals.length).toEqual(2);
  expect(filter.vals[0]).toEqual("bar");
  expect(filter.vals[1]).toEqual("baz");
});

test("Parse multiple filters", () => {
  let searchParams = new URLSearchParams();
  searchParams.set("f:foo", "bar,baz");
  searchParams.set("f:brand", "rolex");
  let filters = new Filters(searchParams);
  expect(filters.filters.length).toEqual(2);
  expect(filters.exists()).toEqual(true);

  let filter = filters.filters[0];
  expect(filter.key).toEqual("foo");
  expect(filter.vals.length).toEqual(2);
  expect(filter.vals[0]).toEqual("bar");
  expect(filter.vals[1]).toEqual("baz");

  filter = filters.filters[1];
  expect(filter.key).toEqual("brand");
  expect(filter.vals.length).toEqual(1);
  expect(filter.vals[0]).toEqual("rolex");
});

test("Parse duplicate filters", () => {
  let searchParams = new URLSearchParams();
  searchParams.set("f:foo", "bar");
  searchParams.set("f:foo", "baz");
  let filters = new Filters(searchParams);
  expect(filters.filters.length).toEqual(1);
  expect(filters.exists()).toEqual(true);

  let filter = filters.filters[0];
  expect(filter.key).toEqual("foo");
  expect(filter.vals.length).toEqual(1);
  expect(filter.vals[0]).toEqual("baz");
});
