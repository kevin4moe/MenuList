import { useStorage, useLocalStorage } from "@vueuse/core";
import { Product } from "../models/product.js";

export const useProductsStore = defineStore("misCompras", {
  state: () => ({
    products: process.client ? useLocalStorage("products", []) : [],
  }),
  getters: {
    total: (state) =>
      state.products.reduce((acc, product) => acc + product.total, 0),
    getProducts: (state) => state.products,
    countProducts: (state) => state.products.length,
  },
  actions: {
    addProduct(product, id = null) {
      if (id) {
        product = this.getProduct(id);
      }

      const pct = new Product(product);
      this.products.push(pct);
    },
    getProduct(id) {
      if (!id) return;
      return this.products.find((product) => product.id === id);
    },
    updateProduct(id, productNew) {
      if (!id) return;
      console.log(id, productNew);
      const index = this.findProduct(id);
      const product = this.getProduct(id);
      product.name = productNew.name;
      product.category = productNew.category;
      product.unit = productNew.unit;
      product.quantity = productNew.quantity;
      product.price = productNew.price;
      product.total = product.price * product.quantity;
      this.products.splice(index, 1, product);
    },
    removeProduct(id) {
      if (!id) return;
      const index = this.findProduct(id);
      console.log(index);
      this.products.splice(index, 1);
    },
    findProduct(id) {
      if (!id) return;
      return this.products.findIndex((pct) => pct.id == id);
    },
  },
  hydrate(state, initialState) {
    // in this case we can completely ignore the initial state since we
    // want to read the value from the browser
    state.products = useLocalStorage("products", []);
  },
});
