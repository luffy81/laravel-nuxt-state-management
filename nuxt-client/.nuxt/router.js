import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _8beacb9a = () => interopDefault(import('../pages/cart.vue' /* webpackChunkName: "pages/cart" */))
const _e373539c = () => interopDefault(import('../pages/categories/index.vue' /* webpackChunkName: "pages/categories/index" */))
const _fd59372e = () => interopDefault(import('../pages/product-filter.vue' /* webpackChunkName: "pages/product-filter" */))
const _3dc82a3a = () => interopDefault(import('../pages/products/index.vue' /* webpackChunkName: "pages/products/index" */))
const _4d14b54f = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/cart",
    component: _8beacb9a,
    name: "cart"
  }, {
    path: "/categories",
    component: _e373539c,
    name: "categories"
  }, {
    path: "/product-filter",
    component: _fd59372e,
    name: "product-filter"
  }, {
    path: "/products",
    component: _3dc82a3a,
    name: "products"
  }, {
    path: "/",
    component: _4d14b54f,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
