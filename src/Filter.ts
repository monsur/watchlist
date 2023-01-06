export default class Filter {
  key: string;
  vals: string[];

  constructor(newKey: string, newVals: string[]) {
    this.key = newKey;
    this.vals = newVals;
  }

  match(item: any): boolean {
    if (!item[this.key]) {
      return false;
    }

    let isMatch = false;
    let itemVal = item[this.key].toString();
    this.vals.forEach((val, i) => {
      if (itemVal.toString().toLowerCase() === val.toString().toLowerCase()) {
        isMatch = true;
      }
    });

    return isMatch;
  }
}
