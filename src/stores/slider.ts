import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from '@/interceptors/axios'

export const useSliderStore = defineStore('slider', () => {
  const sliders = ref([])

  async function getSliders() {
    try {
      const response = await axios.get('/sliders')
      sliders.value = response.data.sliders
    } catch (error) {
      console.error('Error fetching sliders:', error)
    }
  }

  const getSlidersGetter = computed(() => sliders.value)

  return {
    sliders,
    getSliders,
    getSlidersGetter,
  }
})
