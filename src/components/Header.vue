<template>
  <header class="bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg">
    <div class="mx-auto px-4 py-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <router-link to="/" class="text-white text-2xl font-bold no-underline flex items-center">
            <font-awesome-icon :icon="['fas', 'cart-shopping']" /> <span class="ml-2">E-COMMERCE</span>
          </router-link>
        </div>
        <div class="flex items-center space-x-4">
          <router-link :to="{ name: 'cart' }"
            class="hidden md:flex bg-orange-700 text-white px-4 py-2 rounded-md hover:bg-orange-800 transition-colors duration-300 items-center">
            <font-awesome-icon :icon="['fas', 'cart-shopping']" /> <span class="ml-2">{{ cartCount }} | {{
              moneyFormat(cartTotal) }}</span>
          </router-link>

          <router-link :to="{ name: 'login' }" v-if="!isLoggedIn"
            class="hidden md:flex bg-orange-700 text-white px-4 py-2 rounded-md hover:bg-orange-800 transition-colors duration-300 items-center">
            <font-awesome-icon :icon="['far', 'circle-user']" /> <span class="ml-2">ACCOUNT</span>
          </router-link>
          <router-link :to="{ name: 'dashboard' }" v-else
            class="hidden md:flex bg-orange-700 text-white px-4 py-2 rounded-md hover:bg-orange-800 transition-colors duration-300 items-center">
            <font-awesome-icon :icon="['fas', 'gauge']" /> <span class="ml-2">DASHBOARD</span>
          </router-link>

          <!-- Mobile Cart and Account/Dashboard Buttons -->
          <router-link :to="{ name: 'cart' }"
            class="md:hidden bg-orange-700 text-white px-3 py-2 rounded-md hover:bg-orange-800 transition-colors duration-300 flex items-center text-sm">
            <font-awesome-icon :icon="['fas', 'cart-shopping']" />
          </router-link>

          <router-link :to="{ name: 'login' }" v-if="!isLoggedIn"
            class="md:hidden bg-orange-700 text-white px-3 py-2 rounded-md hover:bg-orange-800 transition-colors duration-300 flex items-center text-sm">
            <font-awesome-icon :icon="['far', 'circle-user']" />
          </router-link>
          <router-link :to="{ name: 'dashboard' }" v-else
            class="md:hidden bg-orange-700 text-white px-3 py-2 rounded-md hover:bg-orange-800 transition-colors duration-300 flex items-center text-sm">
            <font-awesome-icon :icon="['fas', 'gauge']" />
          </router-link>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useAuthStore } from '@/stores/auth';
import { useCartStore } from '@/stores/cart';
import { useUtils } from '@/composables/useUtils';

const authStore = useAuthStore();
const cartStore = useCartStore();

const { moneyFormat } = useUtils();

const isLoggedIn = computed(() => {
  return authStore.isLoggedIn;
});

const cartCount = computed(() => {
  return cartStore.getCartCount;
});

const cartTotal = computed(() => {
  return cartStore.cartTotal;
});

onMounted(() => {
  const token = authStore.token;

  if (!token) {
    return;
  }

  cartStore.cartCount()
  cartStore.cartTotalAction()
});
</script>
