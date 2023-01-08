import { CountData, Filter, PageData } from "./Types";

export default class FilterString implements Filter {
  fieldName: string;
  filterItems: CountData[];
  vals: string[];

  static createNew(fieldName: string, newVal: string): FilterString {
    return new FilterString(fieldName, newVal);
  }

  static createNew2(fieldName: string, data: PageData) {
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

    let filterItems: CountData[] = []
    for (const [fieldName, count] of Object.entries(counter)) {
      filterItems.push({"fieldValue": fieldName, "count": count, checked: false});
    }

    return new FilterString(fieldName, "", filterItems);
  }

  constructor(fieldName: string, newVal: string, fieldValues?: CountData[]) {
    this.fieldName = fieldName;
    this.vals = newVal.split(",");
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
    const valsArr = vals.split(",");
    valsArr.forEach((fieldValue, i) => {
      let filterItem = this.filterItems.find((item) => this.compare(item.fieldValue, fieldValue));
      if (filterItem) {
        filterItem.checked = true;
      }
    });
  }

  match(item: any): boolean {
    if (!item[this.fieldName]) {
      return false;
    }

    let isMatch = false;
    let itemVal = item[this.fieldName];
    this.vals.forEach((val, i) => {
      if (Array.isArray(itemVal)) {
        itemVal.forEach((v, i) => {
          if (this.compare(v, val)) {
            isMatch = true;
          }
        });
      } else if (this.compare(itemVal, val)) {
        isMatch = true;
      }
    });

    return isMatch;
  }
}
