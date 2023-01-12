import { Filter, PageData } from "./Types";

export default class FilterPrice implements Filter {
  fieldName: string;
  min: number;
  max: number;
  low: number;
  high: number;
  enabled: boolean;

  static createNew(fieldName: string, data: PageData) {
    let max = 0;
    data.watches.forEach((item) => {
      if (item.price > max) {
        max = item.price;
      }
    });
    return new FilterPrice(fieldName, max);
  }

  constructor(fieldName: string, max: number) {
    this.enabled = false;
    this.fieldName = fieldName;
    this.min = this.low = 0;
    this.max = this.high = max;
  }

  initialize(vals: string): void {
    let valsArr = vals.split("-");

    let low = parseFloat(valsArr[0]);
    if (isNaN(low)) {
      throw new Error(`Price "${valsArr[0]}" is not a number`);
    }
    this.low = low;

    this.enabled = true;
    if (valsArr.length === 1) {
      return;
    }

    let high = parseFloat(valsArr[1]);
    if (isNaN(high)) {
      throw new Error(`Price "${valsArr[1]}" is not a number`);
    }
    if (high < low) {
      throw new Error(`Price "${high}" is less than "${low}"`);
    }
    this.high = high;
  }

  match(item: any) {
    return item.price >= this.low && item.price <= this.high;
  }

  setChecked(fieldValue: string, checked: boolean): void {
    throw new Error("setChecked not implemented");
  }

  getQueryParam(): { [key: string]: string } | null {
    if (this.low === this.min && this.high === this.max) {
      return null;
    }
    let val = this.low.toString();
    if (this.high !== this.max) {
      val += "," + this.high.toString();
    }

    const returnObj: { [key: string]: string } = {};
    returnObj[this.fieldName] = val;
    return returnObj;
}
}
