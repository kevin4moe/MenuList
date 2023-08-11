import { v4 as uuidv4 } from "uuid";

class Product {
  ids;
  constructor(
    pd = {
      name: "NA",
      category: "NA",
      unit: "und",
      quantity: 1,
      price: 0,
    }
  ) {
    this.id = uuidv4();
    this.name = pd.name || "NA";
    this.category = pd.category;
    this.unit = pd.unit;
    this.quantity = pd.quantity;
    this.price = pd.price || 0;
    this.total = this.price * this.quantity;
  }

  // get total() {
  //   return this.price * this.quantity;
  // }

  // get id() {
  //   return this.ids;
  // }
}

export { Product };
