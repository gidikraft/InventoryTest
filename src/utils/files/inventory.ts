import { GestureResponderEvent } from "react-native/types";

export interface StoreItemType {
  id?: string;
  name: string;
  units: string;
  price: string;
  description: string;
  itemPress?: (event: GestureResponderEvent) => void;
  deleteItem?: (event: GestureResponderEvent) => void;
}

export const myArray: StoreItemType[] = [
  {
    id: "11111a",
    name: "Samsung",
    units: "1",
    price: "N2,000",
    description: "64gb and 4gb RAM",
  },
  {
    id: "11112b",
    name: "Motorola",
    units: "12",
    price: "N2,000",
    description: "64gb and 4gb RAM",
  },
  {
    id: "11113c",
    name: "OPPO",
    units: "21",
    price: "N2,000",
    description: "64gb and 4gb RAM",
  },
  {
    id: "1114d",
    name: "Pixel",
    units: "101",
    price: "N2,000",
    description: "64gb and 4gb RAM",
  },
];
