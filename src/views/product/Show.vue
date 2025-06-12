<template>
  <div class="mx-auto px-4 py-8 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg shadow-inner">
    <div class="flex flex-wrap -mx-4">
      <div class="w-full md:w-1/3 px-4 mb-4">
        <div class="bg-white rounded-lg shadow-lg overflow-hidden">
          <div class="p-4">
            <img :src="(product as any).image" class="w-full h-auto object-cover rounded-lg" />
          </div>
        </div>
      </div>
      <div class="w-full md:w-2/3 px-4 mb-4">
        <div class="bg-white rounded-lg shadow-lg p-6">
          <h1 class="font-bold text-3xl mb-4 text-gray-800">
            {{ (product as any).title }}
          </h1>
          <hr class="my-4 border-gray-300" />
          <div class="text-4xl font-extrabold mb-6 flex items-baseline">
            <span class="text-green-600 mr-4">{{ moneyFormat(calculateDiscount(product)) }}</span>
            <s class="text-red-500 text-2xl">{{ moneyFormat((product as any).price) }}</s>
          </div>
          <table class="w-full mb-6 text-lg">
            <tbody>
              <tr>
                <td class="font-semibold py-2 pr-4 text-gray-700">DISKON</td>
                <td class="py-2 pr-4 text-gray-700">:</td>
                <td class="py-2">
                  <span class="inline-block bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full shadow-md">
                    DISKON {{ (product as any).discount }} %
                  </span>
                </td>
              </tr>
              <tr>
                <td class="font-semibold py-2 pr-4 text-gray-700">BERAT</td>
                <td class="py-2 pr-4 text-gray-700">:</td>
                <td class="py-2">
                  <span class="inline-block bg-green-500 text-white text-sm font-bold px-3 py-1 rounded-md shadow-md">
                    {{ (product as any).weight }} gram
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
          <button @click.prevent="
            addToCart(
              (product as any).id,
              calculateDiscount(product),
              1,
              (product as any).weight,
            )
            "
            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg shadow-xl transition duration-300 ease-in-out transform hover:scale-105">
            <font-awesome-icon :icon="['fas', 'cart-shopping']" /> <span class="ml-2">TAMBAH KE KERANJANG</span>
          </button>
        </div>
      </div>
    </div>
    <div class="flex flex-wrap -mx-4 mt-8">
      <div class="w-full px-4">
        <div class="bg-white rounded-lg shadow-lg p-6">
          <h2 class="font-bold text-2xl mb-4 text-gray-800">KETERANGAN</h2>
          <hr class="my-4 border-gray-300" />
          <div v-html="(product as any).content" class="prose max-w-none text-gray-700 leading-relaxed"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useProductStore } from '@/stores/product';
import { useCartStore } from '@/stores/cart';
import { useAuthStore } from '@/stores/auth';
import { useUtils } from '@/composables/useUtils';

const route = useRoute();
const router = useRouter();
const productStore = useProductStore();
const cartStore = useCartStore();
const authStore = useAuthStore();
const { moneyFormat, calculateDiscount } = useUtils();

onMounted(() => {
  productStore.getDetailProduct(route.params.slug as string);
});

const product = computed(() => {
  return productStore.product;
});

function addToCart(product_id: string, price: number, quantity: number, weight: number) {
  const token = authStore.token;

  if (!token) {
    return router.push({ name: "login" });
  }

  cartStore.addToCart(product_id, price, quantity, weight);
}
</script>

<style scoped>
/* No more scoped styles, all handled by Tailwind */
</style>
