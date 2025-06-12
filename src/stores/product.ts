import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from '@/interceptors/axios'

export const useProductStore = defineStore('product', () => {
  const products = ref([])
  const product = ref({})

  async function getProducts() {
    try {
      const response = await axios.get('/products')
      products.value = response.data.products
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }

  async function getDetailProduct(slug: string) {
    try {
      const response = await axios.get(`/product/${slug}`)
      product.value = response.data.product
    } catch (error) {
      console.error('Error fetching product details:', error)
    }
  }

  const getProductsGetter = computed(() => products.value)
  const getProductGetter = computed(() => product.value)

  return {
    products,
    product,
    getProducts,
    getDetailProduct,
    getProductsGetter,
    getProductGetter,
  }
})
