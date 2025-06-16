export const fakeAPI = {
  products: [],
  addProduct(product) {
    this.products.push(product);
    return Promise.resolve(product);
  },
  getProducts() {
    return Promise.resolve(this.products);
  },
};
