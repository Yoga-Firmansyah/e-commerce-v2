<template>
  <div class="mx-auto px-4 mb-5 mt-4">
    <h5 class="font-bold text-2xl mb-4">
      <font-awesome-icon :icon="['fas', 'bag-shopping']" /> <span class="ml-2">{{ (products as any).message }}</span>
    </h5>
    <hr class="my-4" />
    <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 m-4">
      <div v-for="product in (products as any).product" :key="product.id"
        class="col-span-1 hover:scale-105 transition-all duration-300">
        <div class="bg-white h-full border border-gray-200 shadow-md rounded-md overflow-hidden">
          <div class="relative">
            <img :src="(product as any).image" class="w-full h-32 md:h-56 object-cover rounded-t-md" />
          </div>
          <div class="p-4">
            <router-link :to="{ name: 'detail_product', params: { slug: product.slug } }"
              class="font-bold text-lg md:text-2xl block mb-2">
              {{ product.title }}
            </router-link>

            <div class="text-gray-500 mb-2 flex flex-wrap items-center text-base md:text-lg">
              <s>{{ moneyFormat(product.price) }}</s>
              <span
                class="bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded-full ml-2 whitespace-normal">DISKON
                {{
                  product.discount }} %</span>
            </div>

            <div class="text-green-600 font-bold text-lg md:text-2xl mb-3">
              {{ moneyFormat(calculateDiscount(product)) }}
            </div>
            <router-link :to="{ name: 'detail_product', params: { slug: product.slug } }"
              class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md w-full block text-center">LIHAT
              PRODUK</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useCategoryStore } from '@/stores/category';
import { useUtils } from '@/composables/useUtils';

const categoryStore = useCategoryStore();
const route = useRoute();
const { moneyFormat, calculateDiscount } = useUtils();

onMounted(() => {
  categoryStore.getProductInCategory(route.params.slug as string);
});

const products = computed(() => {
  return categoryStore.productInCategory;
});
</script>
