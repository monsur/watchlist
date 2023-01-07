import Filters from "./Filters";

test("Parse empty query params", () => {
  let searchParams = new URLSearchParams();
  let filters = new Filters(null, searchParams);
  expect(filters.getFilters().length).toEqual(0);
  expect(filters.exists()).toBeFalsy();
  expect(filters.match({})).toBeFalsy();
  expect(filters.match({"foo": "bar"})).toBeFalsy();
});

test("Parse invalid query params", () => {
  let searchParams = new URLSearchParams();
  searchParams.set("f", "bar");
  searchParams.set("f:", "bar");
  searchParams.set("foo", "bar");
  searchParams.set("g:foo", "bar");
  let filters = new Filters(null, searchParams);
  expect(filters.getFilters().length).toEqual(0);
  expect(filters.exists()).toBeFalsy();
  expect(filters.match({})).toBeFalsy();
  expect(filters.match({"foo": "bar"})).toBeFalsy();
});

test("Parse empty filter query params", () => {
  let searchParams = new URLSearchParams();
  searchParams.set("f:foo", "");
  let filters = new Filters(null, searchParams);
  expect(filters.getFilters().length).toEqual(0);
  expect(filters.exists()).toBeFalsy();
});

test("Parse valid filter query params", () => {
  let searchParams = new URLSearchParams();
  searchParams.set("f:foo", "bar");
  let filters = new Filters(null, searchParams);
  expect(filters.getFilters().length).toEqual(1);
  expect(filters.exists()).toBeTruthy();

  let filter = filters.getFilters()[0];
  expect(filter.fieldName).toEqual("foo");
  expect(filter.vals.length).toEqual(1);
  expect(filter.vals[0]).toEqual("bar");
});

test("Parse filter with multiple values", () => {
  let searchParams = new URLSearchParams();
  searchParams.set("f:foo", "bar,baz");
  let filters = new Filters(null, searchParams);
  expect(filters.getFilters().length).toEqual(1);
  expect(filters.exists()).toBeTruthy();

  let filter = filters.getFilters()[0];
  expect(filter.fieldName).toEqual("foo");
  expect(filter.vals.length).toEqual(2);
  expect(filter.vals[0]).toEqual("bar");
  expect(filter.vals[1]).toEqual("baz");
});

test("Parse multiple filters", () => {
  let searchParams = new URLSearchParams();
  searchParams.set("f:foo", "bar,baz");
  searchParams.set("f:brand", "rolex");
  let filters = new Filters(null, searchParams);
  expect(filters.getFilters().length).toEqual(2);
  expect(filters.exists()).toBeTruthy();

  let filter = filters.getFilters()[0];
  expect(filter.fieldName).toEqual("foo");
  expect(filter.vals.length).toEqual(2);
  expect(filter.vals[0]).toEqual("bar");
  expect(filter.vals[1]).toEqual("baz");

  filter = filters.getFilters()[1];
  expect(filter.fieldName).toEqual("brand");
  expect(filter.vals.length).toEqual(1);
  expect(filter.vals[0]).toEqual("rolex");
});

test("Parse duplicate filters", () => {
  let searchParams = new URLSearchParams();
  searchParams.set("f:foo", "bar");
  searchParams.set("f:foo", "baz");
  let filters = new Filters(null, searchParams);
  expect(filters.getFilters().length).toEqual(1);
  expect(filters.exists()).toBeTruthy();

  let filter = filters.getFilters()[0];
  expect(filter.fieldName).toEqual("foo");
  expect(filter.vals.length).toEqual(1);
  expect(filter.vals[0]).toEqual("baz");
});

test("Match one filter, one value", () => {
  let searchParams = new URLSearchParams();
  searchParams.set("f:foo", "bar");
  let filters = new Filters(null, searchParams);
  expect(filters.match({"foo": "bar"})).toBeTruthy();
})

test("Match one filter, multiple values", () => {
  let searchParams = new URLSearchParams();
  searchParams.set("f:foo", "bar, baz");
  let filters = new Filters(null, searchParams);
  expect(filters.match({"foo": "bar"})).toBeTruthy();
})

test("Misses multiple filters", () => {
  let searchParams = new URLSearchParams();
  searchParams.set("f:foo", "bar, baz");
  searchParams.set("f:rolex", "bar");
  let filters = new Filters(null, searchParams);
  expect(filters.match({"foo": "bar"})).toBeFalsy();
})

test("Matches multiple filters", () => {
  let searchParams = new URLSearchParams();
  searchParams.set("f:foo", "bar, baz");
  searchParams.set("f:brand", "rolex");
  let filters = new Filters(null, searchParams);
  expect(filters.match({"foo": "bar", "brand": "rolex"})).toBeTruthy();
})

test("Matches multiple filters (with price)", () => {
  let searchParams = new URLSearchParams();
  searchParams.set("f:price", "1000");
  searchParams.set("f:brand", "rolex");
  let filters = new Filters(null, searchParams);
  expect(filters.match({"price": 1001, "brand": "rolex"})).toBeTruthy();
})