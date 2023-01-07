import { Filter } from "./Types";

export default class FilterPrice implements Filter {
  fieldName: string;
  low: number;
  high: number;

  static createNew(fieldName: string, newVal: string) {
    return new FilterPrice(fieldName, newVal);
  }

  constructor(fieldName: string, input: string) {
    this.fieldName = fieldName;
    let inputArr = input.split("-");

    let low = parseFloat(inputArr[0]);
    if (isNaN(low)) {
      throw new Error(`Price "${inputArr[0]}" is not a number`);
    }
    this.low = low;

    if (inputArr.length === 1) {
      this.high = 1000000;
      return;
    }

    let high = parseFloat(inputArr[1]);
    if (isNaN(high)) {
      throw new Error(`Price "${inputArr[1]}" is not a number`);
    }
    if (high < low) {
      throw new Error(`Price "${high}" is less than "${low}"`);
    }
    this.high = high;
  }

  match(item: any) {
    return item.price >= this.low && item.price <= this.high;
  }
}