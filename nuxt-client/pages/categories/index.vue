<template>
  <div class="container mt-5">
    <h1 class="text-center mb-4">Categories</h1>

    <div class="row justify-content-center">
      <div class="col-md-6">
        <form @submit.prevent="submitForm" class="mb-4">
          <div class="form-group">
            <label for="categoryName">Nama Kategori</label>
            <input
              id="categoryName"
              type="text"
              class="form-control"
              v-model="form.name"
              placeholder="Masukkan Nama Kategori"
            />
          </div>
          <button type="submit" class="btn btn-primary btn-block">
            {{ editMode ? 'Update' : 'Tambah' }}
          </button>
        </form>
      </div>
    </div>

    <div class="row justify-content-center">
      <div class="col-md-6">
        <ul class="list-group">
          <li v-for="category in categories" :key="category.id" class="list-group-item d-flex justify-content-between align-items-center">
            {{ category.name }}
            <div>
              <button @click="editCategory(category)" class="btn btn-warning btn-sm mr-2">Edit</button>
              <button @click="deleteCategory(category.id)" class="btn btn-danger btn-sm">Delete</button>
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
        name: ''
      },
      editMode: false,
      editId: null
    }
  },
  computed: {
    categories() {
      return this.$store.state.category.categories
    }
  },
  methods: {
    async submitForm() {
      if (this.editMode) {
        await this.$store.dispatch('category/updateCategory', { id: this.editId, category: this.form })
      } else {
        await this.$store.dispatch('category/createCategory', this.form)
      }
      this.resetForm()
    },
    editCategory(category) {
      this.form.name = category.name
      this.editId = category.id
      this.editMode = true
    },
    async deleteCategory(id) {
      await this.$store.dispatch('category/deleteCategory', id)
    },
    resetForm() {
      this.form.name = ''
      this.editMode = false
      this.editId = null
    }
  },
  async fetch() {
    await this.$store.dispatch('category/fetchCategories')
  }
}
</script>

<style scoped>
/* You can add any custom styles for your categories page here */
</style>
