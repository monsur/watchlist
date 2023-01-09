import Filters from "./Filters";
import data from "../public/data.json";

test("Parse empty query params", () => {
  let searchParams = new URLSearchParams();
  let filters = new Filters(data, searchParams);

  // If not filters are enabled, match everything.
  expect(filters.match({})).toBeTruthy();
  expect(filters.match({"foo": "bar"})).toBeTruthy();
});

test("Parse invalid query params", () => {
  let searchParams = new URLSearchParams();
  searchParams.set("f", "rolex");
  searchParams.set("f:", "rolex");
  searchParams.set("brand", "rolex");
  searchParams.set("g:brand", "rolex");
  let filters = new Filters(data, searchParams);

  // If not filters are enabled, match everything.
  expect(filters.match({})).toBeTruthy();
  expect(filters.match({"brand": "rolex"})).toBeTruthy();
});

test("Parse empty filter query params", () => {
  let searchParams = new URLSearchParams();
  searchParams.set("f:brand", "");
  let filters = new Filters(data, searchParams);

  // If not filters are enabled, match everything.
  expect(filters.match({"brand": "rolex"})).toBeTruthy();
});

test("Parse valid filter query params", () => {
  let searchParams = new URLSearchParams();
  searchParams.set("f:brand", "rolex");
  let filters = new Filters(data, searchParams);
  expect(filters.match({"brand": "Rolex"})).toBeTruthy();
});

test("Parse filter with multiple values", () => {
  let searchParams = new URLSearchParams();
  searchParams.set("f:brand", "rolex,cartier");
  let filters = new Filters(data, searchParams);
  expect(filters.match({"brand": "Rolex"})).toBeTruthy();
  expect(filters.match({"brand": "Cartier"})).toBeTruthy();
});

test("Parse multiple filters", () => {
  let searchParams = new URLSearchParams();
  searchParams.set("f:foo", "bar,baz");
  searchParams.set("f:brand", "rolex");
  let filters = new Filters(data, searchParams);
  expect(filters.match({"brand": "Rolex"})).toBeTruthy();
  expect(filters.match({"brand": "Cartier"})).toBeFalsy();
});

test("Parse duplicate filters", () => {
  let searchParams = new URLSearchParams();
  searchParams.set("f:brand", "rolex");
  searchParams.set("f:brand", "rolex");
  let filters = new Filters(data, searchParams);
  expect(filters.match({"brand": "Rolex"})).toBeTruthy();
});

test("Match one filter, one value", () => {
  let searchParams = new URLSearchParams();
  searchParams.set("f:brand", "Rolex");
  let filters = new Filters(data, searchParams);
  expect(filters.match({"brand": "Rolex"})).toBeTruthy();
})

test("Misses multiple filters", () => {
  let searchParams = new URLSearchParams();
  searchParams.set("f:color", "orange");
  searchParams.set("f:brand", "rolex");
  let filters = new Filters(data, searchParams);
  expect(filters.match({"color": "black"})).toBeFalsy();
})

test("Matches multiple filters", () => {
  let searchParams = new URLSearchParams();
  searchParams.set("f:foo", "bar, baz");
  searchParams.set("f:brand", "rolex");
  let filters = new Filters(data, searchParams);
  expect(filters.match({"foo": "bar", "brand": "rolex"})).toBeTruthy();
})

test("Matches multiple filters (with price)", () => {
  let searchParams = new URLSearchParams();
  searchParams.set("f:price", "1000");
  searchParams.set("f:brand", "rolex");
  let filters = new Filters(data, searchParams);
  expect(filters.match({"price": 1001, "brand": "rolex"})).toBeTruthy();
})