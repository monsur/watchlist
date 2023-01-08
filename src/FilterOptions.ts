import { CountData, PageData } from "./Types";

export default class FilterOptions {
  brands: CountData[];
  types: CountData[];
  colors: CountData[];

  constructor(data: PageData) {
    this.brands = [];
    this.types = [];
    this.colors = [];

    let brandsObj: { [key: string]: number } = {};
    let typesObj: { [key: string]: number } = {};
    let colorsObj: { [key: string]: number } = {};
    data.watches.forEach((watch, i) => {
      if (brandsObj.hasOwnProperty(watch.brand)) {
        brandsObj[watch.brand]++;
      } else {
        brandsObj[watch.brand] = 1;
      }

      if (typesObj.hasOwnProperty(watch.type)) {
        typesObj[watch.type]++;
      } else {
        typesObj[watch.type] = 1;
      }

      if (watch.color) {
        watch.color.forEach((color, j) => {
          if (colorsObj.hasOwnProperty(color)) {
            colorsObj[color]++;
          } else {
            colorsObj[color] = 1;
          }
        });
      }
    });

    for (const [key, value] of Object.entries(brandsObj)) {
      this.brands.push({"fieldValue": key, "count": value, "checked": false});
    }
    for (const [key, value] of Object.entries(typesObj)) {
      this.types.push({"fieldValue": key, "count": value, "checked": false});
    }
    for (const [key, value] of Object.entries(colorsObj)) {
      this.colors.push({"fieldValue": key, "count": value, "checked": false});
    }
  }
}
