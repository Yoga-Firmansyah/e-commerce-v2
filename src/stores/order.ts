import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from '@/interceptors/axios'

export const useOrderStore = defineStore('order', () => {
  const orders = ref([])
  const detailOrder = ref({})
  const productInOrder = ref([])

  async function getOrder() {
    const token = localStorage.getItem('token')
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
    try {
      const response = await axios.get('/order')
      orders.value = response.data.data
    } catch (error) {
      console.error('Error fetching orders:', error)
    }
  }

  async function detailOrderAction(snap_token: string) {
    const token = localStorage.getItem('token')
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
    try {
      const response = await axios.get(`order/${snap_token}`)
      detailOrder.value = response.data.data
      productInOrder.value = response.data.product
    } catch (error) {
      console.error('Error fetching order details:', error)
    }
  }

  const getOrders = computed(() => orders.value)
  const getDetailOrder = computed(() => detailOrder.value)
  const getProductInOrder = computed(() => productInOrder.value)

  return {
    orders,
    detailOrder,
    productInOrder,
    getOrder,
    detailOrderAction,
    getOrders,
    getDetailOrder,
    getProductInOrder,
  }
})
