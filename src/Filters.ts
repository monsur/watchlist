import Filter from "./Filter";

export default class Filters {
  _filters: Filter[];

  constructor(searchParams: URLSearchParams) {
    this._filters = [];
    Filters.parseFilters(searchParams, this._filters);
  }

  static parseFilters(searchParams: URLSearchParams, filters: Filter[]) {
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

    let filterKey = key.substring(2);
    if (!filterKey) {
      return null;
    }

    return new Filter(filterKey, val.split(","));
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

    let isMatch = false;
    this._filters.forEach((filter, i) => {
      isMatch = isMatch || filter.match(item);
    });
    return isMatch;
  }
}
