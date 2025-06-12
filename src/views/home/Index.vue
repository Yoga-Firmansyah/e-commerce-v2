<template>
  <div class="mx-auto p-4 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg shadow-inner">
    <div class="grid grid-cols-1 mb-4">
      <div class="col-span-1">
        <Slider />
      </div>
    </div>

    <div class="grid grid-cols-1 mb-4">
      <div class="col-span-1">
        <Category />
      </div>
    </div>

    <div class="mb-5 mt-4 p-2 bg-white rounded-lg shadow-md">
      <div class="grid grid-cols-1">
        <div class="col-span-12">
          <h4 class="font-bold text-lg md:text-2xl">
            <font-awesome-icon :icon="['fas', 'clipboard-list']" /> <span class="ml-2">PRODUK TERBARU</span>
          </h4>
          <hr class="border-t-4 border-gray-400 rounded-md mt-3" />
        </div>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 m-4">
        <div v-for="product in products" :key="(product as any).id"
          class="col-span-1 hover:scale-105 transition-all duration-300">
          <div class="bg-white rounded-md shadow-md h-full">
            <div class="relative">
              <img :src="(product as any).image" class="w-full h-32 md:h-56 object-cover rounded-t-md" />
            </div>
            <div class="p-4">
              <router-link :to="{ name: 'detail_product', params: { slug: (product as any).slug } }"
                class="font-bold text-lg md:text-2xl block mb-2 truncate">
                {{ (product as any).title }}
              </router-link>

              <div class="text-gray-500 mb-2 flex flex-wrap items-center text-base md:text-lg overflow-hidden text-ellipsis">
                <s>{{ moneyFormat((product as any).price) }}</s>
                <span
                  class="bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded-full ml-2 whitespace-normal">DISKON
                  {{ (product as any).discount }} %</span>
              </div>

              <div class="text-green-600 font-bold text-lg md:text-2xl mb-3 overflow-hidden text-ellipsis">{{ moneyFormat(calculateDiscount(product))
              }}
              </div>
              <router-link :to="{ name: 'detail_product', params: { slug: (product as any).slug } }"
                class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md w-full block text-center">LIHAT
                PRODUK</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useProductStore } from "../../stores/product";
import Category from "../../components/Category.vue";
import Slider from "../../components/Slider.vue";
import { useUtils } from "../../composables/useUtils";

const productStore = useProductStore();
const { moneyFormat, calculateDiscount } = useUtils();

onMounted(() => {
  productStore.getProducts();
});

const products = computed(() => {
  return productStore.products;
});
</script>
