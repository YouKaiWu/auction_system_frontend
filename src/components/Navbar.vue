<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRoute } from 'vue-router'

const auth = useAuthStore()
const route = useRoute()

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
        <router-link to="/" class="logo">AUCTION</router-link>
      </div>

      <div class="nav-menu">
        <router-link to="/" class="nav-item" :class="{ active: route.path === '/' }">
          首頁
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
          <div class="user-chip">
            <div class="user-avatar">{{ auth.user.account.charAt(0).toUpperCase() }}</div>
            <span class="user-account">{{ auth.user.account }}</span>
          </div>
          <button @click="auth.logout()" class="logout-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            <span>登出</span>
          </button>
        </template>

        <router-link v-else to="/login" class="login-btn">
          登入 / 註冊
        </router-link>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid #f1f5f9;
  height: 72px;
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1000;
}

.nav-container {
  max-width: 1100px;
  margin: 0 auto;
  width: 100%;
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.25rem;
  font-weight: 800;
  color: #0f172a;
  text-decoration: none;
  letter-spacing: 2px;
}

.nav-menu {
  display: flex;
  gap: 32px;
}

.nav-item {
  text-decoration: none;
  color: #64748b;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.2s;
  padding: 8px 0;
}

.nav-item:hover, .nav-item.active {
  color: #0f172a;
}

.nav-item.active {
  box-shadow: 0 2px 0 #0f172a;
}

.nav-auth {
  display: flex;
  align-items: center;
  gap: 20px;
}

.user-chip {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #f8fafc;
  padding: 6px 12px 6px 6px;
  border-radius: 30px;
  border: 1px solid #f1f5f9;
}

.user-avatar {
  width: 28px;
  height: 28px;
  background: #0f172a;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
}

.user-account {
  font-size: 13px;
  font-weight: 600;
  color: #334155;
}

.logout-btn {
  background: transparent;
  color: #94a3b8;
  border: none;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s;
}

.logout-btn:hover {
  background: #fff1f2;
  color: #e11d48;
}

.login-btn {
  text-decoration: none;
  background: #0f172a;
  color: white;
  padding: 10px 20px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 600;
  transition: all 0.2s;
}

.login-btn:hover {
  background: #334155;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.15);
}

@media (max-width: 768px) {
  .nav-menu {
    display: none;
  }
}
</style>