import FilterPrice from "./FilterPrice";
import FilterString from "./FilterString";
import { Filter, PageData } from "./Types";

export default class Filters {
  _filters: Filter[];
  _filters2: Filter[];

  constructor(data: PageData, searchParams: URLSearchParams) {
    this._filters = [];
    this._filters2 = [];
    Filters.initializeFilters(data, this._filters2);
    Filters.parseFilters(searchParams, this._filters, this._filters2);
  }

  static initializeFilters(data: PageData, filters: Filter[]) {
    FilterString.createNew2("brand", data);
  }

  static parseFilters(searchParams: URLSearchParams, filters: Filter[], filters2: Filter[]) {
    let keys: any = {};
    searchParams.forEach((value, key) => {
      if (keys[key]) {
        throw new Error("Duplicate filter: " + key);
      }
      const filter = Filters.getFilter(key, value);
      if (filter) {
        filters.push(filter);
        keys[key] = 1;
      }
    });
  }

  static getFilter(key: string, val: string): Filter | null {
    if (!val) {
      return null;
    }

    if (!key.startsWith("f:")) {
      return null;
    }

    let fieldName = key.substring(2);
    if (!fieldName) {
      return null;
    }

    if (fieldName === "price") {
      return FilterPrice.createNew(fieldName, val);
    }

    return FilterString.createNew(fieldName, val);
  }

  getFilters() : Filter[] {
    return this._filters;
  }

  exists() : boolean {
    return this._filters.length > 0;
  }

  match(item: any) : boolean {
    if (!this.exists()) {
      return false;
    }

    let isMatch = true;
    this._filters.forEach((filter, i) => {
      isMatch = isMatch && filter.match(item);
    });
    return isMatch;
  }
}
