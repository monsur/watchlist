export default class Sorter {
  field: string;
  lessThan: number;
  greaterThan: number;

  constructor(input: string) {
    let inputArr = input.split("|");
    this.field = inputArr[0];
    this.lessThan = -1;
    this.greaterThan = 1;
    if (inputArr.length > 1 && inputArr[1] == "desc") {
      this.lessThan = 1;
      this.greaterThan = -1;
    }
  }

  sort(a: any, b: any): number {
    return this.sortByField(this.field, a, b);
  }

  private sortByField(key: string, a: any, b: any): number {
    let aHasKey = a.hasOwnProperty(key);
    let bHasKey = b.hasOwnProperty(key);
    if (aHasKey && !bHasKey) {
      return this.lessThan;
    } else if (!aHasKey && bHasKey) {
      return this.greaterThan;
    } else if (!aHasKey && !bHasKey) {
      return 0;
    } else {
      return a[key] > b[key]
        ? this.greaterThan
        : a[key] < b[key]
        ? this.lessThan
        : 0;
    }
  }
}
