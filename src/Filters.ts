import FilterPrice from "./FilterPrice";
import FilterString from "./FilterString";
import { Filter, PageData } from "./Types";

export default class Filters {
  _filters: Filter[];

  constructor(data: PageData, searchParams: URLSearchParams) {
    this._filters = [];
    this._filters.push(FilterString.createNew("brand", data));
    this._filters.push(FilterString.createNew("type", data));
    this._filters.push(FilterString.createNew("color", data));
    this._filters.push(FilterPrice.createNew("price", data));
    Filters.parseFilters(searchParams, this._filters);
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
        throw new Error(`Filter for field "${fieldName}" is not valid.`);
      }

      fieldFilter.initialize(value);
    });
  }

  get(fieldName: string) : Filter|null {
    return this._filters.find((item) => item.fieldName === fieldName) || null;
  }

  match(item: any): boolean {
    let isMatch = true;
    this._filters.forEach((filter, i) => {
      if (filter.enabled) {
        isMatch = isMatch && filter.match(item);
      }
    });
    return isMatch;
  }

  setChecked(fieldName: string, fieldValue: string, checked: boolean) : void {
    const filter = this._filters.find((f) => f.fieldName === fieldName);
    if (!filter) {
      throw new Error(`No filter for field "${fieldName}".`);
    }
    filter.setValue({"fieldValue": fieldValue, "checked": checked});
  }

  getQueryParam():{[key: string] : string} {
    let returnObj:{[key: string] : string} = {};
    this._filters.forEach((item) => {
      let qp = item.getQueryParam();
      if (qp) {
        returnObj = {...returnObj, ...qp};
      }
    });
    return returnObj;
  }
}
