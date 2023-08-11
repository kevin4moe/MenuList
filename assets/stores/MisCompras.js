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
    addProduct(product) {
      const pct = new Product(product);
      this.products.push(pct);
    },
    getProduct(id) {
      if (!id) return;
      return this.products.find((product) => product.id === id);
    },
    updateProduct(id, productNew) {
      if (!id) return;
      const index = this.products.findIndex((pct) => pct.id == id);
      const product = new Product(productNew);
      this.products.splice(index, 1, product);
    },
    removeProduct(id) {
      if (!id) return;
      const index = this.products.findIndex((pct) => pct.id == id);
      console.log(index);
      this.products.splice(index, 1);
    },
  },
  hydrate(state, initialState) {
    // in this case we can completely ignore the initial state since we
    // want to read the value from the browser
    state.products = useLocalStorage("products", []);
  },
});
