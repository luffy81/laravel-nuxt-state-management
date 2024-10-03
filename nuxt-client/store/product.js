// store/product.js
export const state = () => ({
  products: [],
  product: null,
})

export const mutations = {
  SET_PRODUCTS(state, products) {
    state.products = products
  },
  SET_PRODUCT(state, product) {
    state.product = product
  }
}

export const actions = {
  async fetchProducts({ commit }) {
    const { data } = await this.$axios.get('/products')
    commit('SET_PRODUCTS', data)
  },
  async fetchProduct({ commit }, id) {
    const { data } = await this.$axios.get(`/products/${id}`)
    commit('SET_PRODUCT', data)
  },
  async fetchProductsByCategory({ commit }, categoryId) {
    // Send a GET request to the API with a query parameter for category ID
    const products = await this.$axios.$get(`products?category_id=${categoryId}`);
    commit('SET_PRODUCTS', products);
  },
  async createProduct({ dispatch }, formData) {
    await this.$axios.post('/products', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })
    dispatch('fetchProducts')
  },
  async updateProduct({ dispatch }, { id, formData }) {
    await this.$axios.put(`/products/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })
    dispatch('fetchProducts')
  },
  async deleteProduct({ dispatch }, id) {
    await this.$axios.delete(`/products/${id}`)
    dispatch('fetchProducts')
  }
}
