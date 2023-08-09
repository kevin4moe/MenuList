import { useStorage, useLocalStorage } from "@vueuse/core";
import { Product } from "../models/product.js";

export const useProductsStore = defineStore("misCompras", {
  state: () => ({
    products: useLocalStorage("products", []),
  }),
  getters: {
    total: (state) =>
      state.products.reduce((acc, product) => acc + product.total, 0),
    getProducts: (state) => state.products,
  },
  actions: {
    addProduct(product) {
      const pct = new Product(product);
      this.products.push(pct);
    },
    getProduct(id) {
      return this.products.find((product) => product.id === id);
    },
    updateProduct(id, productNew) {
      console.log(id, productNew);
      const index = this.products.findIndex((pct) => pct.id == id);
      const product = new Product(productNew);
      this.products.splice(index, 1, product);
    },
    removeProduct(id) {
      const index = this.products.findIndex((pct) => pct.id == id);
      this.products.splice(index, 1);
    },
  },
  hydrate(state, initialState) {
    // in this case we can completely ignore the initial state since we
    // want to read the value from the browser
    state.products = useLocalStorage("products", []);
  },
});
