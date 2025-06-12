<template>
  <div class="mx-auto mb-5 mt-4 p-4 bg-gradient-to-b from-gray-100 to-gray-200">
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      <div v-for="category in categories" :key="(category as any).id" class="col-span-1">
        <router-link :to="{ name: 'detail_category', params: { slug: (category as any).slug } }">
          <div class="bg-white rounded-lg shadow-md h-full flex flex-col justify-center items-center p-4">
            <img :src="(category as any).image" class="w-24 h-24 object-contain mb-2" />
            <hr class="w-full border-t border-gray-300 my-2" />
            <label class="font-bold text-center text-sm">{{ (category as any).name }}</label>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useCategoryStore } from "../../stores/category";

const categoryStore = useCategoryStore();

onMounted(() => {
  categoryStore.getCategories();
});

const categories = computed(() => {
  return categoryStore.categories;
});
</script>
