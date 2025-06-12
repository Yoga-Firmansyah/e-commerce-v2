<template>
  <div class="mx-auto px-4 mb-5 mt-4">
    <div class="flex justify-center">
      <div class="w-full md:w-1/2 lg:w-1/3">
        <div v-if="validation.message" class="mt-2 p-3 bg-red-100 text-red-700 rounded">
          {{ validation.message }}
        </div>
        <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h4 class="text-2xl font-bold mb-4">LOGIN</h4>
          <hr class="mb-4" />
          <form @submit.prevent="login">
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="email">Email Address</label>
              <input type="email" v-model="user.email"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email" placeholder="Email Address" />
            </div>
            <div v-if="validation.email" class="mt-2 p-3 bg-red-100 text-red-700 rounded">
              {{ validation.email[0] }}
            </div>
            <div class="mb-6">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Password</label>
              <input type="password" v-model="user.password"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password" placeholder="Password" />
            </div>
            <div v-if="validation.password" class="mt-2 p-3 bg-red-100 text-red-700 rounded">
              {{ validation.password[0] }}
            </div>
            <div class="mb-6 flex items-center">
              <input type="checkbox" class="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                id="rememberMe" />
              <label class="ml-2 block text-gray-900 text-sm" for="rememberMe">Ingatkan Saya</label>
            </div>
            <div class="flex items-center justify-between">
              <button type="submit"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
                LOGIN
              </button>
            </div>
          </form>
        </div>
        <div class="text-center mt-4">
          <p class="text-gray-600">
            Belum punya akun ?
            <router-link :to="{ name: 'register' }" class="text-blue-500 hover:text-blue-800">Daftar Sekarang
              !</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useCartStore } from '@/stores/cart'
import { useRouter } from 'vue-router'

interface User {
  email: string;
  password: string;
}

const user: User = reactive({
  email: "",
  password: "",
});

interface Validation {
  message?: string;
  email?: string[];
  password?: string[];
}

const validation = ref<Validation>({});

const authStore = useAuthStore();
const cartStore = useCartStore();
const router = useRouter();

async function login() {
  try {
    await authStore.login(user);
    router.push({ name: "dashboard" });
  } catch (error: any) {
    validation.value = error.response.data.errors;
  }
}
</script>
