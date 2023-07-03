import { reactive } from "vue";
import { Product } from "./product.js";

class ProductList {
  #productList;
  constructor(products = []) {
    this.#productList = reactive([...products]);
  }

  get total() {
    return this.#productList.reduce((acc, product) => acc + product.total, 0);
  }

  addProduct(product) {
    const pct = new Product(product);
    this.#productList.push(pct);
  }
  getProduct(id) {
    return this.#productList.find((product) => product.id === id);
  }
  removeProduct(id) {
    const index = this.#productList.findIndex((pct) => pct.id == id);
    this.#productList.splice(index, 1);
  }
  get getProducts() {
    return this.#productList;
  }
}

export { ProductList };
