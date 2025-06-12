import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import Login from '../views/auth/Login.vue'
import Register from '@/views/auth/Register.vue'
import Home from '@/views/home/Index.vue'
import Dashboard from '@/views/dashboard/Index.vue'
import DetailProduct from '../views/product/Show.vue'
import Categories from '../views/category/Index.vue'
import DetailCategory from '../views/category/Show.vue'
import Cart from '@/views/cart/Index.vue'
import Order from '../views/order/Index.vue'
import DetailOrder from '../views/order/Show.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/product/:slug',
      name: 'detail_product',
      component: DetailProduct,
    },
    {
      path: '/categories',
      name: 'categories',
      component: Categories,
    },
    {
      path: '/category/:slug',
      name: 'detail_category',
      component: DetailCategory,
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart,
    },
    {
      path: '/customer/order',
      name: 'order',
      component: Order,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/customer/order/:snap_token',
      name: 'detail_order',
      component: DetailOrder,
      meta: {
        requiresAuth: true,
      },
    },
  ],
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
