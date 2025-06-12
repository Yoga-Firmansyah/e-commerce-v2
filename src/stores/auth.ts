import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from '@/interceptors/axios'

import { useCartStore } from '@/stores/cart'

export const useAuthStore = defineStore('auth', () => {
  const cartStore = useCartStore()
  const token = ref(localStorage.getItem('token') || '')
  const user = ref(JSON.parse(localStorage.getItem('user') || '{}'))

  function authLogout() {
    token.value = ''
    user.value = {}
  }

  async function register(userPayload: any) {
    try {
      const response = await axios.post('/register', {
        name: userPayload.name,
        email: userPayload.email,
        password: userPayload.password,
        password_confirmation: userPayload.password_confirmation,
      })

      const newToken = response.data.token
      const newUser = response.data.user

      localStorage.setItem('token', newToken)
      localStorage.setItem('user', JSON.stringify(newUser))

      axios.defaults.headers.common['Authorization'] = 'Bearer ' + newToken

      token.value = newToken
      user.value = newUser

      return response
    } catch (error: any) {
      localStorage.removeItem('token')
      throw error.response.data
    }
  }

  async function getUser() {
    try {
      const currentToken = localStorage.getItem('token')
      if (currentToken) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + currentToken
        const response = await axios.get('/user')
        user.value = response.data.user
      }
    } catch (error) {
      console.error('Failed to fetch user:', error)
    }
  }

  async function logout() {
    authLogout()

    localStorage.removeItem('token')
    localStorage.removeItem('user')

    cartStore.clearCart()

    delete axios.defaults.headers.common['Authorization']
  }

  async function login(user: any) {
    try {
      const response = await axios.post('/login', {
        email: user.email,
        password: user.password,
      })
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data.user))
      token.value = response.data.token
      user.value = response.data.user
      console.log(response.data)
      cartStore.cartCount()
      cartStore.cartTotalAction()
      return response.data
    } catch (error) {
      throw error
    }
  }

  const currentUser = computed(() => user.value)
  const isLoggedIn = computed(() => token.value)

  return {
    token,
    user,
    authLogout,
    register,
    getUser,
    logout,
    login,
    currentUser,
    isLoggedIn,
  }
})
