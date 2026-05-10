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
  <div class="login-page">
    <div class="login-container">
      <form class="login-card" @submit.prevent="login">
        <div class="login-header">
          <h2 class="page-title">歡迎回來</h2>
          <p class="subtitle">請登入您的帳號以繼續</p>
        </div>

        <div class="form-group">
          <label>帳號</label>
          <input 
            v-model="form.account" 
            type="text" 
            placeholder="請輸入帳號" 
            required
          />
        </div>

        <div class="form-group">
          <label>密碼</label>
          <input 
            v-model="form.passwd" 
            type="password" 
            placeholder="請輸入密碼" 
            required
          />
        </div>

        <button type="submit" class="login-btn">登入</button>
        
        <div class="login-footer">
          <span>還沒有帳號？ <a href="/register">立即註冊</a></span>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  background-color: #f8fafc; /* 與 Marketplace 背景一致 */
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

.login-container {
  width: 100%;
  max-width: 440px;
  padding: 24px;
}

.login-card {
  background: white;
  padding: 48px 40px;
  border-radius: 16px;
  border: 1px solid #f1f5f9;
  box-shadow: 0 10px 25px -5px rgba(15, 23, 42, 0.05), 0 8px 10px -6px rgba(15, 23, 42, 0.05);
}

.login-header {
  text-align: center;
  margin-bottom: 32px;
}

.page-title {
  font-size: 24px;
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 12px;
}

.subtitle {
  color: #64748b;
  font-size: 14px;
}

.form-group {
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-size: 14px;
  font-weight: 600;
  color: #0f172a;
  padding-left: 4px;
}

input {
  padding: 12px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  outline: none;
  font-size: 15px;
  transition: all 0.2s ease;
  background-color: #fff;
}

input:focus {
  border-color: #0f172a;
  box-shadow: 0 0 0 3px rgba(15, 23, 42, 0.05);
}

input::placeholder {
  color: #94a3b8;
}

.login-btn {
  width: 100%;
  padding: 14px;
  background-color: #0f172a; /* 深色主題按鈕 */
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  margin-top: 8px;
}

.login-btn:hover {
  background-color: #1e293b;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.15);
}

.login-btn:active {
  transform: translateY(0);
}

.login-footer {
  margin-top: 24px;
  text-align: center;
  font-size: 14px;
  color: #64748b;
}

.login-footer a {
  color: #0f172a;
  font-weight: 600;
  text-decoration: none;
  margin-left: 4px;
}

.login-footer a:hover {
  text-decoration: underline;
}

/* 針對行動裝置微調 */
@media (max-width: 480px) {
  .login-card {
    padding: 32px 24px;
  }
}
</style>