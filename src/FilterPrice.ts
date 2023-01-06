export default class Filter {
  low: number;
  high: number;

  constructor(input: string) {
    let inputArr = input.split("-");
    this.low = parseFloat(inputArr[0]);
    this.high = inputArr.length > 1 ? parseFloat(inputArr[1]) : 1000000;
  }

  match(item: any) {
    return item.price >= this.low && item.price <= this.high;
  }
}