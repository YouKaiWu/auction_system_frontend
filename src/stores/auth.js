import { defineStore } from 'pinia'
import api from '@/api/api'

export const useAuthStore = defineStore('auth', {

  state: () => ({
    token: localStorage.getItem('token')
  }),

  actions: {

    async login(data) {

      const res = await api.post('/auth/login', data)

      this.token = res.data.token

      localStorage.setItem('token', this.token)
    },

    logout() {

      this.token = null

      localStorage.removeItem('token')
    }
  }
})