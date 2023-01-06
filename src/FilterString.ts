import { Filter } from "./Types";

export default class FilterString implements Filter {
  key: string;
  vals: string[];

  constructor(newKey: string, newVals: string[]) {
    this.key = newKey;
    this.vals = newVals;
  }

  private compare(a: any, b: any) {
    return a.toString().toLowerCase() === b.toString().toLowerCase();
  }

  match(item: any): boolean {
    if (!item[this.key]) {
      return false;
    }

    let isMatch = false;
    let itemVal = item[this.key];
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
