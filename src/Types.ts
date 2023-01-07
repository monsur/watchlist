export interface WatchData {
  id: string;
  rank: number;
  brand: string;
  collection: string;
  detail: string;
  type: string;
  image: string;
  link: string;
  price: number;
  ref: string;
  movement: string;
  frequency: number;
  diameter: number;
  thickness: number;
  water_resistance: number;
  crystal: string;
  strap: string;
  color: string[];
}

export interface PageData {
  title: string;
  watches: WatchData[];
}

export interface Filter {
  match(item: any): boolean;
}

export interface CountData {
  key: string;
  count: number;
}