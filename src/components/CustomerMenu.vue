<template>
  <div class="bg-white rounded-lg shadow-md p-4">
    <h5 class="font-bold text-lg mb-3">MAIN MENU</h5>
    <hr class="my-4" />
    <ul class="space-y-2">
      <li>
        <router-link :to="{ name: 'dashboard' }"
          class="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md uppercase">
          <font-awesome-icon :icon="['fas', 'gauge']" /> <span>My Dashboard</span>
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'order' }"
          class="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md uppercase">
          <font-awesome-icon :icon="['fas', 'cart-shopping']" /> <span>My Order</span>
        </router-link>
      </li>
      <li>
        <a @click="logout" class="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md uppercase cursor-pointer">
          <font-awesome-icon :icon="['fas', 'arrow-right-from-bracket']" /> <span>Logout</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
const router = useRouter();

async function logout() {
  await authStore.logout();
  router.push({ name: "login" });
}
</script>
