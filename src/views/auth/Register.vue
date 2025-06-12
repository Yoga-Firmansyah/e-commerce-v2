<template>
  <div class="mx-auto my-8 px-4">
    <div class="flex justify-center">
      <div class="w-full md:w-1/2">
        <div class="bg-white shadow-md rounded-lg p-6">
          <h4 class="text-2xl font-semibold mb-4">REGISTER</h4>
          <hr class="mb-4" />
          <form @submit.prevent="register">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label for="name" class="block text-gray-700 text-sm font-bold mb-2">Full Name</label>
                <input type="text" id="name" v-model="user.name"
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Full Name" />
                <div v-if="validation.name" class="mt-2 text-red-500 text-xs italic">
                  {{ validation.name[0] }}
                </div>
              </div>
              <div>
                <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Email address</label>
                <input type="email" id="email" v-model="user.email"
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Email Address" />
                <div v-if="validation.email" class="mt-2 text-red-500 text-xs italic">
                  {{ validation.email[0] }}
                </div>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label for="password" class="block text-gray-700 text-sm font-bold mb-2">Password</label>
                <input type="password" id="password" v-model="user.password"
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Password" />
                <div v-if="validation.password" class="mt-2 text-red-500 text-xs italic">
                  {{ validation.password[0] }}
                </div>
              </div>
              <div>
                <label for="password_confirmation" class="block text-gray-700 text-sm font-bold mb-2">Konfirmasi
                  Password</label>
                <input type="password" id="password_confirmation" v-model="user.password_confirmation"
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Konfirmasi Password" />
              </div>
            </div>
            <button type="submit"
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
              REGISTER
            </button>
          </form>
        </div>
        <div class="text-center mt-4">
          <p class="text-gray-600">
            Sudah punya akun ?
            <router-link :to="{ name: 'login' }" class="text-blue-500 hover:text-blue-800">Login Disini !</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

interface User {
  name: string;
  email: string;
  password?: string;
  password_confirmation?: string;
}

interface Validation {
  name?: string[];
  email?: string[];
  password?: string[];
}

const user = reactive({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
});

const validation = ref<Validation>({});

const authStore = useAuthStore();

const router = useRouter();

async function register() {
  try {
    await authStore.register(user as User);
    router.push({ name: "dashboard" });
  } catch (error: any) {
    validation.value = error.response.data.errors;
  }
}
</script>
