<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const auth = useAuthStore()

const form = ref({
  account: '',
  passwd: ''
})

const login = async () => {

  await auth.login(form.value)

  router.push('/')
}
</script>

<template>
  <div class="login-container">
    <!-- 1. 改成 form 並加上 submit 監聽 -->
    <form class="login-card" @submit.prevent="login">
      <div class="login-header">
        <h2>歡迎回來</h2>
        <p>請登入您的帳號以繼續</p>
      </div>

      <div class="form-group">
        <label>帳號</label>
        <input v-model="form.account" placeholder="請輸入帳號" />
      </div>

      <div class="form-group">
        <label>密碼</label>
        <input type="password" v-model="form.passwd" placeholder="請輸入密碼" />
      </div>

      <!-- 2. 確認按鈕是 type="submit" -->
      <button type="submit" class="login-btn">登入</button>
      
      <div class="login-footer">
        <span>還沒有帳號？ <a href="/register">立即註冊</a></span>
      </div>
    </form>
  </div>
</template>

<style scoped>
.login-container {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
}

.login-card {
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0,0,0,0.1);
  width: 100%;
  max-width: 400px;
}

.login-header {
  text-align: center;
  margin-bottom: 30px;
}

.login-header h2 {
  color: #ee4d2d; /* 橘紅色主題 */
  margin-bottom: 10px;
}

.form-group {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-size: 14px;
  color: #666;
}

input {
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  outline: none;
}

input:focus {
  border-color: #ee4d2d;
}

.login-btn {
  width: 100%;
  padding: 12px;
  background-color: #ee4d2d;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 10px;
}

.login-btn:hover {
  background-color: #d73211;
}

.login-footer {
  margin-top: 20px;
  text-align: center;
  font-size: 14px;
  color: #888;
}

.login-footer a {
  color: #ee4d2d;
  text-decoration: none;
}
</style>