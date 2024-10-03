<template>
  <div>
    <Navbar />
    <b-container class="mt-5">
      <Nuxt />
    </b-container>
    <Footer />
  </div>
</template>

<script>
import Navbar from '~/components/Navbar.vue'
import Footer from '~/components/Footer.vue'

export default {
  components: {
    Navbar,
    Footer
  }
}
</script>

<style>
/* You can add global styles here */
body {
  margin: 0;
}
</style>
