<template>
  <div class="container">
    <div class="row w-100">
      <div class="col-md-6 mx-auto">
        <h1 class="text-center mb-4">Products</h1>

        <form @submit.prevent="submitForm" class="mb-4">
          <div class="form-group">
            <label for="productName">Nama Produk</label>
            <input
              id="productName"
              type="text"
              class="form-control"
              v-model="form.name"
              placeholder="Masukkan Nama Produk"
              required
            />
          </div>

          <div class="form-group">
            <label for="productPrice">Harga Produk</label>
            <input
              id="productPrice"
              type="number"
              class="form-control"
              v-model="form.price"
              placeholder="Masukkan Harga Produk"
              required
            />
          </div>

          <div class="form-group">
            <label for="productCategory">Kategori Produk</label>
            <select
              id="productCategory"
              class="form-control"
              v-model="form.category_id"
              required
            >
              <option disabled value="">Pilih Kategori</option>
              <option v-for="category in categories" :key="category.id" :value="category.id">
                {{ category.name }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label for="productDescription">Deskripsi Produk</label>
            <textarea
              id="productDescription"
              class="form-control"
              v-model="form.description"
              placeholder="Masukkan Deskripsi Produk"
              rows="3"
              required
            ></textarea>
          </div>

          <!-- Image Upload -->
          <div class="form-group">
            <label for="productImage">Upload Gambar Produk</label>
            <input
              id="productImage"
              type="file"
              class="form-control"
              @change="handleImageUpload"
              accept="image/*"
              required
            />
          </div>

          <button type="submit" class="btn btn-primary btn-block">
            {{ editMode ? 'Update' : 'Tambah' }}
          </button>
        </form>

        <ul class="list-group">
          <li v-for="product in products" :key="product.id" class="list-group-item d-flex justify-content-between align-items-center">
            {{ product.name }} - {{ product.price | currency }}
            <div>
              <button @click="editProduct(product)" class="btn btn-warning btn-sm mr-2">Edit</button>
              <button @click="deleteProduct(product.id)" class="btn btn-danger btn-sm">Delete</button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        price: '',
        category_id: '',
        description: '',
        image: null,
      },
      editMode: false,
      editId: null
    }
  },
  computed: {
    products() {
      return this.$store.state.product.products
    },
    categories() {
      return this.$store.state.category.categories // Ensure categories are being fetched from the store
    }
  },
  methods: {
    // Handle image upload
    handleImageUpload(event) {
      this.form.image = event.target.files[0]; // Store the file in form.image
    },

    async submitForm() {
      const formData = new FormData();
      formData.append('name', this.form.name);
      formData.append('price', this.form.price);
      formData.append('category_id', this.form.category_id);
      formData.append('description', this.form.description);

      if (this.form.image) {
        formData.append('image', this.form.image); // Append the image file to FormData
      }

      if (this.editMode) {
        await this.$store.dispatch('product/updateProduct', { id: this.editId, product: formData });
      } else {
        await this.$store.dispatch('product/createProduct', formData);
      }

      this.resetForm();
    },

    editProduct(product) {
      this.form.name = product.name
      this.form.price = product.price
      this.form.category_id = product.category_id
      this.form.description = product.description
      this.editId = product.id
      this.editMode = true
    },
    async deleteProduct(id) {
      await this.$store.dispatch('product/deleteProduct', id)
    },
    resetForm() {
      this.form.name = ''
      this.form.price = ''
      this.form.category_id = ''
      this.form.description = ''
      this.form.image = null
      this.editMode = false
      this.editId = null
    }
  },
  async fetch() {
    await this.$store.dispatch('product/fetchProducts')
    await this.$store.dispatch('category/fetchCategories') // Ensure categories are fetched on load
  }
}
</script>

<style scoped>
/* Add any custom styles for your products page here */
</style>
