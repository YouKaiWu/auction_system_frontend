<script setup>
import { onMounted } from 'vue' // 引入生命週期
import { useAuthStore } from '@/stores/auth'
import { useRoute } from 'vue-router'

const auth = useAuthStore()
const route = useRoute()

// 頁面載入時，如果沒資料但有 token，就去抓一次使用者資料
onMounted(() => {
  if (!auth.user && auth.token) {
    auth.fetchUser()
  }
})
</script>

<template>
  <nav class="navbar">
    <div class="nav-container">
      <div class="nav-brand">
        <router-link to="/" class="logo">拍賣商城</router-link>
      </div>

      <div class="nav-menu">
        <router-link to="/" class="nav-item" :class="{ active: route.path === '/' }">
          <i class="fas fa-home"></i> 首頁
        </router-link>
       
        <router-link to="/my-items" class="nav-item" :class="{ active: route.path === '/my-items' }">
          我的拍賣
        </router-link>
        <router-link to="/notifications" class="nav-item" :class="{ active: route.path === '/notifications' }">
          通知
        </router-link>
      </div>

      <div class="nav-auth">
        <template v-if="auth.user">
          <div class="user-info">
            <span class="user-account">使用者: {{ auth.user.account }}</span>
          </div>
          <button @click="auth.logout()" class="logout-btn">
            登出
          </button>
        </template>

        <router-link v-else to="/login" class="login-link">
          登入 / 註冊
        </router-link>
      </div>
    </div>
  </nav>
</template>

<style scoped>
/* 全域導覽列容器 */
.navbar {
  background-color: #ffffff;
  border-bottom: 1px solid #e0e0e0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  padding: 0 20px;
  height: 70px;
  display: flex;
  align-items: center;
  position: sticky;
  /* 固定在頂部 */
  top: 0;
  z-index: 1000;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Logo 樣式 */
.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: #ee4d2d;
  /* 拍賣主題橘紅色 */
  text-decoration: none;
  letter-spacing: 1px;
}

/* 選單連結群組 */
.nav-menu {
  display: flex;
  gap: 30px;
}

.nav-item {
  text-decoration: none;
  color: #555;
  font-size: 1rem;
  font-weight: 500;
  transition: color 0.3s ease;
  position: relative;
  padding: 10px 0;
}

.nav-item:hover {
  color: #ee4d2d;
}

/* 當前頁面底線效果 */
.nav-item.active {
  color: #ee4d2d;
}

.nav-item.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background-color: #ee4d2d;
  border-radius: 2px;
}

/* 會員區與按鈕 */
.nav-auth {
  display: flex;
  align-items: center;
  gap: 15px;
}

.user-name {
  font-size: 0.9rem;
  color: #888;
}

.login-link {
  text-decoration: none;
  color: #ee4d2d;
  border: 1px solid #ee4d2d;
  padding: 6px 16px;
  border-radius: 4px;
  transition: all 0.3s;
}

.login-link:hover {
  background-color: #ee4d2d;
  color: white;
}

.logout-btn {
  background-color: #f5f5f5;
  color: #666;
  border: 1px solid #ddd;
  padding: 6px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s;
}

.logout-btn:hover {
  background-color: #eeeeee;
  border-color: #bbb;
}

/* 手機版適應 (簡單處理) */
@media (max-width: 768px) {
  .nav-menu {
    display: none;
    /* 手機版通常會收進漢堡選單，這裡先隱藏 */
  }
}
</style>