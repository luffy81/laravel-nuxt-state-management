<template>
  <div class="container">
    <!-- Bootstrap Nav Tabs for Category Filtering -->
    <ul class="nav nav-tabs mt-4">
      <li class="nav-item" v-for="category in categories" :key="category.id">
        <a
          class="nav-link"
          :class="{ active: selectedCategory === category.id }"
          @click="selectCategory(category.id)"
        >
          {{ category.name }}
        </a>
      </li>
    </ul>

    <!-- Product Cards -->
    <div class="row mt-4">
      <div class="col-md-4 mb-4" v-for="product in products" :key="product.id">
        <div class="card">
          <img
            :src="product.image ? `${baseImageUrl}/${product.image}` : 'https://via.placeholder.com/150'"
            class="card-img-top"
            alt="Product Image"
          />
          <div class="card-body">
            <h5 class="card-title">{{ product.name }}</h5>
            <p class="card-text">{{ product.description }}</p>
            <p class="card-text"><strong>Price:</strong> ${{ product.price }}</p>
            <!-- Add to Cart Button -->
            <button
              class="btn btn-primary"
              @click="addToCart(product)"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { BASE_IMAGE_URL } from '~/constants';

export default {
  data() {
    return {
      selectedCategory: null, // Keeps track of the selected category
      baseImageUrl: BASE_IMAGE_URL,
    };
  },
  computed: {
    categories() {
      return this.$store.state.category.categories; // Get categories from Vuex store
    },
    products() {
      return this.$store.state.product.products; // Get products from Vuex store
    },
  },
  methods: {
    async selectCategory(categoryId) {
      this.selectedCategory = categoryId; // Set the selected category
      // Fetch products based on the selected category
      await this.$store.dispatch('product/fetchProductsByCategory', categoryId);
    },
    async addToCart(productId) {
      try {
        await this.$store.dispatch('cart/addToCart', { productId, quantity: 1 });
        alert('Product added to cart!');
      } catch (error) {
        console.error('Failed to add to cart:', error);
        alert('Failed to add product to cart.');
      }
    },
  },
  async fetch() {
    // Fetch categories from Vuex store when the page is loaded
    await this.$store.dispatch('category/fetchCategories');

    // Set the first category as the default selected category
    if (this.categories.length > 0) {
      this.selectedCategory = this.categories[0].id;
      // Fetch products based on the default selected category
      await this.$store.dispatch('product/fetchProductsByCategory', this.selectedCategory);
    } else {
      // Optionally handle the case when there are no categories
      this.selectedCategory = null;
    }
  },
};
</script>

<style scoped>
/* Optional: Add some custom styling for your product cards */
.card {
  height: 100%;
}

.card-img-top {
  height: 200px;
  object-fit: cover;
}

.nav-tabs .nav-link {
  cursor: pointer;
}
</style>
