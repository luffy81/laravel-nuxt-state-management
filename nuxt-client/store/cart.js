export const state = () => ({
  cartItems: [],
});

export const mutations = {
  SET_CART_ITEMS(state, items) {
    state.cartItems = items;
  },
  ADD_TO_CART(state, item) {
    const existingItem = state.cartItems.find((i) => i.productId === item.productId);
    if (existingItem) {
      existingItem.quantity += item.quantity; // Increment quantity if item already in cart
    } else {
      state.cartItems.push(item); // Add new item to cart
    }
  },
  REMOVE_FROM_CART(state, productId) {
    state.cartItems = state.cartItems.filter((item) => item.productId !== productId);
  },
  UPDATE_CART_ITEM(state, { productId, quantity }) {
    const item = state.cartItems.find((i) => i.productId === productId);
    if (item) {
      item.quantity = quantity;
    }
  },
};

export const actions = {
  async addToCart({ commit }, { productId, quantity }) {
    // Send request to the backend to save the cart item
    await this.$axios.post(`/carts`, { productId, quantity });
    commit('ADD_TO_CART', { productId, quantity });
  },
  async fetchCartItems({ commit }) {
    const {data} = await this.$axios.get(`/carts`);
    commit('SET_CART_ITEMS', data);
  },
  async removeFromCart({ dispatch }, productId) {
    await this.$axios.delete(`/carts/${productId}`);
    dispatch('fetchCartItems')
  },
  async updateCartItem({ dispatch }, { productId, quantity }) {
    await this.$axios.put(`/carts/${productId}`, { quantity });
    dispatch('fetchCartItems')
  },
};
