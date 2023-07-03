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
    this.ids = uuidv4();
    this.name = pd.name;
    this.category = pd.category;
    this.unit = pd.unit;
    this.quantity = pd.quantity;
    this.price = pd.price;
  }

  get total() {
    return this.price * this.quantity;
  }

  get id() {
    return this.ids;
  }
}

export { Product };
