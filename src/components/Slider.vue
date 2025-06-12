<template>
  <div class="relative w-full overflow-hidden rounded-lg">
    <div class="flex transition-transform duration-500 ease-in-out"
      :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
      <div v-for="(slider, index) in sliders" :key="index" class="w-full flex-shrink-0">
        <img :src="(slider as any).image" class="w-full object-cover rounded-lg" style="height: 75vh;" />
      </div>
    </div>

    <button @click="prevSlide"
      class="absolute top-1/2 left-4 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full focus:outline-none">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
      </svg>
    </button>
    <button @click="nextSlide"
      class="absolute top-1/2 right-4 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full focus:outline-none">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
      </svg>
    </button>

    <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
      <span v-for="(_, index) in sliders" :key="index" @click="goToSlide(index)"
        :class="['block w-3 h-3 rounded-full cursor-pointer', currentIndex === index ? 'bg-white' : 'bg-gray-400']"></span>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import { useSliderStore } from "../stores/slider";

const sliderStore = useSliderStore();
const currentIndex = ref(0);

onMounted(() => {
  sliderStore.getSliders();
});

const sliders = computed(() => {
  return sliderStore.sliders;
});

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % sliders.value.length;
};

const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + sliders.value.length) % sliders.value.length;
};

const goToSlide = (index: number) => {
  currentIndex.value = index;
};
</script>
<style scoped></style>
