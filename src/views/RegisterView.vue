<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/api/api'

const router = useRouter()
const form = ref({
  account: '',
  passwd: '',
  email: '',
  phoneNum: '',
  idNum: ''
})

const register = async () => {
  try {
    await api.post('/auth/register', form.value)
    alert('註冊成功！')
    router.push('/login')
  } catch (error) {
    alert('註冊失敗，請檢查欄位是否正確')
  }
}
</script>

<template>
  <div class="register-page">
    <div class="register-container">
      <form class="register-card" @submit.prevent="register">
        <div class="register-header">
          <h2 class="page-title">建立新帳號</h2>
          <p class="subtitle">加入我們的社群，開始探索商品</p>
        </div>

        <div class="form-grid">
          <div class="form-group">
            <label>帳號</label>
            <input v-model="form.account" placeholder="請輸入帳號" required />
          </div>

          <div class="form-group">
            <label>密碼</label>
            <input type="password" v-model="form.passwd" placeholder="請設定密碼" required />
          </div>

          <div class="form-group">
            <label>電子郵件</label>
            <input type="email" v-model="form.email" placeholder="example@mail.com" required />
          </div>

          <div class="form-group">
            <label>電話號碼</label>
            <input v-model="form.phoneNum" placeholder="0912345678" required />
          </div>

          <div class="form-group">
            <label>身分證字號</label>
            <input v-model="form.idNum" placeholder="請輸入身分證字號" required />
          </div>
        </div>

        <button type="submit" class="register-btn">註冊帳號</button>
        
        <div class="register-footer">
          <span>已經有帳號了？ <a href="/login">直接登入</a></span>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.register-page {
  background-color: #f8fafc;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  padding: 40px 20px;
}

.register-container {
  width: 100%;
  max-width: 500px;
}

.register-card {
  background: white;
  padding: 48px 40px;
  border-radius: 16px;
  border: 1px solid #f1f5f9;
  box-shadow: 0 10px 25px -5px rgba(15, 23, 42, 0.05);
}

.register-header {
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

.form-grid {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 32px;
}

.form-group {
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
}

input:focus {
  border-color: #0f172a;
  box-shadow: 0 0 0 3px rgba(15, 23, 42, 0.05);
}

.register-btn {
  width: 100%;
  padding: 14px;
  background-color: #0f172a;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.register-btn:hover {
  background-color: #1e293b;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.15);
}

.register-footer {
  margin-top: 24px;
  text-align: center;
  font-size: 14px;
  color: #64748b;
}

.register-footer a {
  color: #0f172a;
  font-weight: 600;
  text-decoration: none;
  margin-left: 4px;
}

.register-footer a:hover {
  text-decoration: underline;
}

@media (max-width: 480px) {
  .register-card {
    padding: 32px 20px;
  }
}
</style>