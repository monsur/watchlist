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

  static parseFilters(searchParams: URLSearchParams, filters2: Filter[]) {
    let keys: any = {};
    searchParams.forEach((value, key) => {
      if (keys[key]) {
        throw new Error("Duplicate filter: " + key);
      }

      if (!value) {
        return;
      }

      if (!key.startsWith("f:")) {
        return;
      }

      let fieldName = key.substring(2);
      if (!fieldName) {
        return;
      }

      const fieldFilter = filters2.find((item) => item.fieldName === fieldName);
      if (!fieldFilter) {
        return;
      }
      fieldFilter.initialize(value);
    });
  }

  isEnabled() {
    let isEnabled = true;
    this._filters.forEach((f) => {
      console.log(f.enabled);
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
