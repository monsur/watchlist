import { CountData, Filter, PageData } from "./Types";

export default class FilterString implements Filter {
  fieldName: string;
  filterItems: CountData[];
  enabled: boolean;

  static createNew(fieldName: string, data: PageData) {
    let counter: { [key: string]: number } = {};

    data.watches.forEach((watch, index) => {
      if (watch.hasOwnProperty(fieldName)) {
        const fieldValue = (watch as any)[fieldName];
        if (counter.hasOwnProperty(fieldValue)) {
          counter[fieldValue]++;
        } else {
          counter[fieldValue] = 1;
        }
      }
    });

    let filterItems: CountData[] = [];
    for (const [fieldName, count] of Object.entries(counter)) {
      filterItems.push({ fieldValue: fieldName, count: count, checked: false });
    }

    return new FilterString(fieldName, filterItems);
  }

  constructor(fieldName: string, fieldValues?: CountData[]) {
    this.fieldName = fieldName;
    this.enabled = false;
    this.filterItems = [];
    if (fieldValues) {
      this.filterItems = fieldValues;
    }
  }

  private compare(a: any, b: any) {
    return a.toString().toLowerCase() === b.toString().toLowerCase();
  }

  initialize(vals: string) {
    if (this.filterItems.length === 0) {
      return;
    }

    this.enabled = false;
    const valsArr = vals.split(",");
    valsArr.forEach((fieldValue, i) => {
      let filterItem = this.filterItems.find((item) =>
        this.compare(item.fieldValue, fieldValue)
      );
      if (filterItem) {
        filterItem.checked = true;
        this.enabled = true;
      }
    });
    if (!this.enabled) {
      // Need to decide what to do with invalid values.
      // Throwing an error for now so that it's seen.
      throw new Error(`Value "${vals}" is invalid for field "${this.fieldName}".`)
    }
  }

  match(item: any): boolean {
    if (!item[this.fieldName]) {
      return false;
    }
    let sourceValue = item[this.fieldName];

    const checkedFilterItems = this.filterItems.filter((item) => item.checked);
    if (checkedFilterItems.length === 0) {
      return false;
    }

    let isMatch = false;
    checkedFilterItems.forEach((item, i) => {
      if (Array.isArray(sourceValue)) {
        sourceValue.forEach((v, i) => {
          if (this.compare(v, item)) {
            isMatch = true;
          }
        });
      } else if (this.compare(sourceValue, item.fieldValue)) {
        isMatch = true;
      }
    });

    return isMatch;
  }
}
