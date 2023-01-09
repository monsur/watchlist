import FilterPrice from "./FilterPrice";
import FilterString from "./FilterString";
import { Filter, PageData } from "./Types";

export default class Filters {
  _filters: Filter[];

  constructor(data: PageData, searchParams: URLSearchParams) {
    this._filters = [];
    Filters.initializeFilters(data, this._filters);
    Filters.parseFilters(searchParams, this._filters);
  }

  static initializeFilters(data: PageData, filters: Filter[]) {
    filters.push(FilterString.createNew("brand", data));
  }

  static parseFilters(searchParams: URLSearchParams, filters: Filter[]) {
    let keys: any = {};
    searchParams.forEach((value, key) => {
      if (keys[key]) {
        // Duplicate filters are not allowed.
        throw new Error("Duplicate filter: " + key);
      }

      if (!value) {
        // Skip if this is an empty query param.
        return;
      }

      if (!key.startsWith("f:")) {
        // Skip if this is not a filter query params, e.g. "foo".
        return;
      }

      let fieldName = key.substring(2);
      if (!fieldName) {
        // Skip of this is not a filter query param, e.g. "f:".
        return;
      }

      const fieldFilter = filters.find((item) => item.fieldName === fieldName);
      if (!fieldFilter) {
        // Skip if the field name is not valid.
        // Right now, there must be a valid filter object to be able to filter on a field.
        // Could make the filter more generic and allow filtering on any field (even if 
        // there's not filter object), but that's more work.
        return;
      }

      fieldFilter.initialize(value);
    });
  }

  isEnabled() {
    let isEnabled = true;
    this._filters.forEach((f) => {
      isEnabled = isEnabled && f.enabled;
    });
    return isEnabled;
  }

  match(item: any): boolean {
    let isMatch = true;
    this._filters.forEach((filter, i) => {
      isMatch = isMatch && filter.match(item);
    });
    return isMatch;
  }
}
