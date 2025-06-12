import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from '@/interceptors/axios'

export const useCartStore = defineStore('cart', () => {
  const cart = ref([])
  const cartTotal = ref(0)
  const cartWeight = ref(0)

  function clearCart() {
    cart.value = []
    cartTotal.value = 0
    cartWeight.value = 0
  }

  async function addToCart(product_id: string, price: number, quantity: number, weight: number) {
    const token = localStorage.getItem('token')
    const user = JSON.parse(localStorage.getItem('user') as string)

    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
    const a = await axios.post('/cart', {
      product_id: product_id,
      price: price,
      quantity: quantity,
      weight: weight,
      customer_id: user.id,
    })

    const cartResponse = await axios.get('/cart')
    cart.value = cartResponse.data.cart
    cartWeight.value = cartResponse.data.totalWeight

    const totalResponse = await axios.get('/cart/total')
    cartTotal.value = totalResponse.data.total
  }

  async function cartCount() {
    const token = localStorage.getItem('token')
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
    const response = await axios.get('/cart')
    cart.value = response.data.cart
  }

  async function cartTotalAction() {
    const token = localStorage.getItem('token')
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
    const response = await axios.get('/cart/total')
    cartTotal.value = response.data.total
  }

  async function cartWeightAction() {
    const token = localStorage.getItem('token')
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
    const response = await axios.get('/cart/totalWeight')
    cartWeight.value = response.data.total
  }

  async function removeCart(cart_id: any) {
    const token = localStorage.getItem('token')
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token

    await axios.post('/cart/remove', {
      cart_id: cart_id,
    })

    const cartResponse = await axios.get('/cart')
    cart.value = cartResponse.data.cart

    const totalResponse = await axios.get('/cart/total')
    cartTotal.value = totalResponse.data.total

    const weightResponse = await axios.get('/cart/totalWeight')
    cartWeight.value = weightResponse.data.total
  }

  async function checkout(data: any) {
    try {
      const response = await axios.post('/checkout', {
        courier: data.courier_type,
        service: data.courier_service,
        cost: data.courier_cost,
        weight: data.weight,
        name: data.name,
        phone: data.phone,
        province: data.province_id,
        city: data.city_id,
        address: data.address,
        grand_total: data.grandTotal,
      })
      await axios.post('/cart/removeAll')
      clearCart()
      return response.data
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  const getCart = computed(() => cart.value)
  const getCartCount = computed(() => cart.value.length)
  const getCartTotal = computed(() => cartTotal.value)

  async function fetchCartData() {
    const token = localStorage.getItem('token')
    if (!token) {
      // Handle case where token is not available, e.g., redirect to login or show error
      console.error('Authentication token not found.')
      return
    }
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token

    try {
      await Promise.all([
        axios.get('/cart').then((response) => (cart.value = response.data.cart)),
        axios.get('/cart/total').then((response) => (cartTotal.value = response.data.total)),
        axios.get('/cart/totalWeight').then((response) => (cartWeight.value = response.data.total)),
      ])
    } catch (error) {
      console.error('Failed to fetch cart data:', error)
      clearCart()
    }
  }

  return {
    cart,
    cartTotal,
    cartWeight,
    clearCart,
    addToCart,
    cartCount,
    cartTotalAction,
    cartWeightAction,
    removeCart,
    checkout,
    getCart,
    getCartCount,
    getCartTotal,
    fetchCartData,
  }
})
