export class Filter {
  key: string;
  vals: string[];

  constructor(newKey: string, newVals: string[]) {
    this.key = newKey;
    this.vals = newVals;
  }
}

export class Filters {
  filters: Filter[];

  constructor(searchParams: URLSearchParams) {
    this.filters = [];
    Filters.parseFilters(searchParams, this.filters);
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

  exists() : boolean {
    return this.filters.length > 0;
  }
}
