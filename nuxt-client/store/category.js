// store/category.js
export const state = () => ({
  categories: [],
  category: null,
})

export const mutations = {
  SET_CATEGORIES(state, categories) {
    state.categories = categories
  },
  SET_CATEGORY(state, category) {
    state.category = category
  }
}

export const actions = {
  async fetchCategories({ commit }) {
    const { data } = await this.$axios.get('/categories')
    commit('SET_CATEGORIES', data)
  },
  async fetchCategory({ commit }, id) {
    const { data } = await this.$axios.get(`/categories/${id}`)
    commit('SET_CATEGORY', data)
  },
  async createCategory({ dispatch }, category) {
    await this.$axios.post('/categories', category)
    dispatch('fetchCategories')
  },
  async updateCategory({ dispatch }, { id, category }) {
    await this.$axios.put(`/categories/${id}`, category)
    dispatch('fetchCategories')
  },
  async deleteCategory({ dispatch }, id) {
    await this.$axios.delete(`/categories/${id}`)
    dispatch('fetchCategories')
  }
}
