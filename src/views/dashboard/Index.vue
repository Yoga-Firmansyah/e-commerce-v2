<template>
  <div class="mx-auto px-4 py-5">
    <div class="flex flex-wrap -mx-4">
      <div class="w-full md:w-1/4 px-4 mb-4">
        <CustomerMenu />
      </div>
      <div class="w-full md:w-3/4 px-4 mb-4">
        <div class="bg-white rounded-lg shadow-md p-6">
          <h5 class="font-bold text-lg mb-3">
            <font-awesome-icon :icon="['fas', 'gauge']" /> <span class="ml-2">DASHBOARD</span>
          </h5>
          <hr class="my-4" />
          <p class="text-gray-700">Selamat Datang <strong class="font-semibold">{{ user.name }}</strong></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CustomerMenu from "@/components/CustomerMenu.vue";
import { onMounted, computed } from "vue";
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();

onMounted(() => {
  authStore.getUser();
});

const user = computed(() => {
  return authStore.currentUser;
});
</script>
