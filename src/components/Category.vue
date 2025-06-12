<template>
  <div class="bg-white rounded-lg shadow-md p-2">
    <h5 class="font-bold text-lg md:text-2xl mb-3">
      <font-awesome-icon :icon="['fas', 'tags']" /> <span class="ml-2">KATEGORI</span>
    </h5>
    <hr class="my-4" />
    <div class="flex flex-wrap">
      <router-link v-for="category in categories" :key="(category as any).id"
        :to="{ name: 'detail_category', params: { slug: (category as any).slug } }"
        class="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 px-2 mb-4 block text-center font-bold text-gray-800 no-underline">
        <div
          class="bg-gray-300 rounded-lg shadow-sm py-2 flex items-center justify-center h-full hover:shadow-lg hover:scale-105 hover:bg-gray-200 transition-all duration-300 text-sm sm:text-base md:text-lg">
          <img :src="(category as any).image" class="w-auto h-6 sm:h-8 md:h-10 object-contain mr-1" />{{ (category as
            any).name }}
        </div>
      </router-link>

      <router-link :to="{ name: 'categories' }"
        class="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 px-2 mb-4 block text-center font-bold text-gray-800 no-underline">
        <div
          class="bg-blue-500 text-white rounded-lg shadow-sm p-1 flex items-center justify-center h-full hover:bg-blue-600 hover:scale-105 transition-all duration-300 text-sm sm:text-base md:text-lg">
          <span class="mr-1">KATEGORI LAINNYA</span>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useCategoryStore } from '@/stores/category';

const categoryStore = useCategoryStore();

onMounted(() => {
  categoryStore.getCategories();
});

const categories = computed(() => {
  return categoryStore.categories.slice(0, 4);
});
</script>
