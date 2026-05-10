import { defineStore } from 'pinia'
import api from '@/api/api'
import router from '@/router'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token'),
    // 1. 新增 user 狀態，預設為 null
    user: null 
  }),

  actions: {
    // 2. 獲取當前登入者資訊
    async fetchUser() {
      if (!this.token) return
      
      try {
        const res = await api.get('/auth/me')
        this.user = res.data // 假設後端回傳 { name: '...', account: '...' }
      } catch (error) {
        console.error('獲取使用者資訊失敗', error)
        this.logout() // 如果 token 失效，順便清除狀態
      }
    },

    async login(data) {
      const res = await api.post('/auth/login', data)
      this.token = res.data.token
      localStorage.setItem('token', this.token)
      
      // 3. 登入成功後，立刻抓取使用者詳細資料
      await this.fetchUser()
    },

    logout() {
      this.token = null
      this.user = null // 4. 登出時也要清空 user
      localStorage.removeItem('token')

      router.push('/login') 
    }
  }
})