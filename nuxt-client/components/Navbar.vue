<template>
  <b-navbar toggleable="lg" type="dark" variant="primary">
    <div class="container">
    <b-navbar-brand href="/">My Website</b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item href="/">Home</b-nav-item>
        <b-nav-item href="/categories">Categories</b-nav-item>
        <b-nav-item href="/products">Products</b-nav-item>
        <b-nav-item href="/product-filter">Shop</b-nav-item>
        <b-nav-item href="/cart">Cart</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </div>
  </b-navbar>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>

<style scoped>
/* Add any custom styling for your navbar here */
</style>
