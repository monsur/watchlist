import { Filter } from "./Types";

export default class FilterString implements Filter {
  fieldName: string;
  vals: string[];

  static createNew(fieldName: string, newVal: string) {
    return new FilterString(fieldName, newVal);
  }

  constructor(fieldName: string, newVal: string) {
    this.fieldName = fieldName;
    this.vals = newVal.split(",");
  }

  private compare(a: any, b: any) {
    return a.toString().toLowerCase() === b.toString().toLowerCase();
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
