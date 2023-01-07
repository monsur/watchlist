import { PageData } from "./Types";

export default class FilterOptions {
  brands: { [key: string]: number };
  types: { [key: string]: number };
  colors: { [key: string]: number };

  constructor(data: PageData) {
    this.brands = {};
    this.types = {};
    this.colors = {};

    data.watches.forEach((watch, i) => {
      if (this.brands.hasOwnProperty(watch.brand)) {
        this.brands[watch.brand]++;
      } else {
        this.brands[watch.brand] = 1;
      }

      if (this.types.hasOwnProperty(watch.type)) {
        this.types[watch.type]++;
      } else {
        this.types[watch.type] = 1;
      }

      if (watch.color) {
        watch.color.forEach((color, j) => {
          if (this.colors.hasOwnProperty(color)) {
            this.colors[color]++;
          } else {
            this.colors[color] = 1;
          }
        });
      }
    });
  }
}
