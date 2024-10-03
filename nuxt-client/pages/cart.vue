<template>
  <div class="container">
    <h1>Your Cart</h1>
    <div v-if="cartItems.length === 0">
      <p>Your cart is empty.</p>
    </div>
    <div v-else>
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in cartItems" :key="item.product_id">
              <td>{{ item.product.name }}</td>
              <td>
                <!-- Bind to localQuantity which is a computed property -->
                <input
                  type="number"
                  :value="item.localQuantity"
                  @input="updateLocalQuantity(item.product_id, $event.target.value)"
                  min="1"
                />
              </td>
              <td>${{ (item.product.price * item.quantity).toFixed(2) }}</td>
              <td>
                <button class="btn btn-danger" @click="removeFromCart(item.product_id)">Remove</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async fetch() {
    await this.$store.dispatch('cart/fetchCartItems');
  },
  computed: {
    cartItems() {
      // Create a computed property with local quantities to avoid direct state mutation
      return this.$store.state.cart.cartItems.map((item) => ({
        ...item,
        localQuantity: item.quantity, // Create a local copy of the quantity
      }));
    },
  },
  methods: {
    async removeFromCart(productId) {
      await this.$store.dispatch('cart/removeFromCart', productId);
    },
    // Update the local quantity and dispatch the update to Vuex
    updateLocalQuantity(productId, quantity) {
      if (quantity <= 0) {
        alert('Quantity must be at least 1.');
        return;
      }

      // Dispatch Vuex action to update the quantity in the backend and Vuex store
      this.$store.dispatch('cart/updateCartItem', { productId, quantity });
    },
  },
};
</script>

<style scoped>
.table th,
.table td {
  vertical-align: middle;
}
</style>
