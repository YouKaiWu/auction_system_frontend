<script setup>
import { ref, onMounted, computed } from 'vue'
import api from '@/api/api'
import ItemCard from '@/components/ItemCard.vue'
import MessageBoard from '@/components/MessageBoard.vue'
import { useAuthStore } from '@/stores/auth'

const items = ref([])
const loading = ref(true)
const isMessageOpen = ref(false)

const auth = useAuthStore()

const fetchMyItems = async () => {
  try {
    loading.value = true
    const res = await api.get('/items/my')
    items.value = res.data
  } finally {
    loading.value = false
  }
}

const totalItems = computed(() => items.value.length)

onMounted(fetchMyItems)
</script>

<template>
  <div class="my-items-container">
    <header class="page-header">
      <div class="header-content">
        <h1>我的拍賣</h1>
        <p class="subtitle">管理您刊登的所有商品</p>
      </div>
      <router-link to="/create" class="create-btn">
        刊登新商品
      </router-link>
    </header>

    <div class="stats-overview">
      <div class="stat-card">
        <span class="stat-label">商品總數</span>
        <span class="stat-value">{{ totalItems }}</span>
      </div>
    </div>

    <main class="content-section">
      <div v-if="loading" class="loading-state">
        載入中...
      </div>

      <div v-else-if="items.length > 0" class="item-grid">
        <ItemCard
          v-for="item in items"
          :key="item.id"
          :item="item"
          :clickable="false"
          class="my-item-card"
        />
      </div>

      <div v-else class="empty-state">
        <div class="empty-icon">📦</div>
        <h3>目前還沒有商品</h3>
        <p>把家裡用不到的寶物拿出來拍賣吧！</p>
        <router-link to="/create" class="empty-btn">立即去刊登</router-link>
      </div>
    </main>

    <button class="message-toggle" @click="isMessageOpen = true">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>
      <span>我的留言板</span>
    </button>

    <div :class="['overlay', { active: isMessageOpen }]" @click="isMessageOpen = false"></div>

    <aside :class="['message-aside', { open: isMessageOpen }]">
      <div class="aside-header">
        <h2>我的留言板</h2>
        <button class="close-btn" @click="isMessageOpen = false">✕</button>
      </div>
      <div class="aside-body">
        <MessageBoard :userId="auth.user.id":canPost="false" />
      </div>
    </aside>
  </div>
</template>

<style scoped>
.my-items-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 30px;
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 20px;
}

.page-header h1 {
  font-size: 1.8rem;
  color: #333;
  margin: 0;
}

.subtitle {
  color: #888;
  margin-top: 5px;
}

.create-btn {
  background-color: #ee4d2d;
  color: white;
  text-decoration: none;
  padding: 10px 20px;
  border-radius: 6px;
  font-weight: bold;
  transition: background 0.3s;
}

.create-btn:hover {
  background-color: #d73211;
}

.stats-overview {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  background: white;
  padding: 15px 25px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
}

.stat-label {
  font-size: 0.85rem;
  color: #666;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: bold;
  color: #ee4d2d;
}

.item-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 25px;
}

.empty-state {
  text-align: center;
  padding: 80px 20px;
  background: white;
  border-radius: 12px;
  border: 2px dashed #ddd;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 20px;
}

.empty-btn {
  display: inline-block;
  margin-top: 20px;
  color: #ee4d2d;
  text-decoration: none;
  font-weight: bold;
  border: 1px solid #ee4d2d;
  padding: 8px 24px;
  border-radius: 4px;
}

.message-toggle {
  position: fixed;
  bottom: 30px;
  right: 30px;
  background: #0f172a;
  color: #ffffff;
  border: none;
  padding: 14px 24px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  transition: 0.2s;
  z-index: 100;
}

.message-toggle:hover {
  background: #1e293b;
  transform: translateY(-2px);
}

.overlay {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.2);
  backdrop-filter: blur(2px);
  opacity: 0;
  pointer-events: none;
  transition: 0.3s;
  z-index: 999;
}

.overlay.active {
  opacity: 1;
  pointer-events: auto;
}

.message-aside {
  position: fixed;
  top: 0;
  right: 0;
  width: 400px;
  height: 100%;
  background: #fff;
  transform: translateX(100%);
  transition: transform 0.3s ease;
  z-index: 1000;
  display: flex;
  flex-direction: column;
}

.message-aside.open {
  transform: translateX(0);
}

.aside-header {
  padding: 24px;
  border-bottom: 1px solid #f1f5f9;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.aside-header h2 {
  font-size: 16px;
  font-weight: 600;
}

.close-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  color: #94a3b8;
}

.aside-body {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
}

@media (max-width: 600px) {
  .page-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }

  .message-aside {
    width: 100%;
  }
}
</style>