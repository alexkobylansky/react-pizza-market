declare interface Pizza {
  id: number;
  category: number;
  imageUrl: string;
  price: number;
  rating: number;
  sizes: number[];
  name: string;
  types: number[];
}

declare interface SortProperty {
  name: string;
  sortProperty: string;
}