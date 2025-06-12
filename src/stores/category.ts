import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from '@/interceptors/axios'

export const useCategoryStore = defineStore('category', () => {
  const categories = ref([])
  const productInCategory = ref([])

  async function getCategories() {
    try {
      const response = await axios.get('/categories')
      categories.value = response.data.categories
    } catch (error) {
      console.log(error)
    }
  }

  async function getProductInCategory(slug: any) {
    try {
      const response = await axios.get(`/category/${slug}`)
      productInCategory.value = response.data
    } catch (error) {
      console.log(error)
    }
  }

  const getCategoryList = computed(() => categories.value)
  const getProductListInCategory = computed(() => productInCategory.value)

  return {
    categories,
    productInCategory,
    getCategories,
    getProductInCategory,
    getCategoryList,
    getProductListInCategory,
  }
})
