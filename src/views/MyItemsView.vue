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
        <p class="subtitle">管理與追蹤您刊登的所有商品狀態</p>
      </div>
      <router-link to="/create" class="create-btn">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
        <span>刊登新商品</span>
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
        <div class="spinner"></div>
        <span>正在讀取清單...</span>
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
        <p>把您用不到的寶物拿出來拍賣，給它下一個家！</p>
        <router-link to="/create" class="empty-btn">立即去刊登</router-link>
      </div>
    </main>

    <!-- 留言板按鈕 (沿用之前美化過的樣式) -->
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
        <!-- 傳遞 userId 並禁止在此處發言（身為賣家僅觀看或回覆） -->
        <MessageBoard v-if="auth.user" :userId="auth.user.id" />
      </div>
    </aside>
  </div>
</template>

<style scoped>
.my-items-container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 60px 24px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  padding-bottom: 30px;
  border-bottom: 1px solid #f1f5f9;
}

.page-header h1 {
  font-size: 26px;
  font-weight: 800;
  color: #0f172a;
  margin: 0;
}

.subtitle {
  color: #64748b;
  margin-top: 6px;
  font-size: 15px;
}

.create-btn {
  background-color: #0f172a;
  color: white;
  text-decoration: none;
  padding: 12px 24px;
  border-radius: 10px;
  font-weight: 700;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
}

.create-btn:hover {
  background-color: #334155;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.15);
}

.stats-overview {
  margin-bottom: 40px;
}

.stat-card {
  background: white;
  padding: 20px 30px;
  border-radius: 16px;
  border: 1px solid #f1f5f9;
  box-shadow: 0 4px 15px rgba(0,0,0,0.02);
  display: inline-flex;
  flex-direction: column;
  border-left: 4px solid #0f172a; /* 質感裝飾線 */
}

.stat-label {
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #94a3b8;
  margin-bottom: 4px;
}

.stat-value {
  font-size: 28px;
  font-weight: 800;
  color: #0f172a;
}

.item-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 32px;
}

.loading-state {
  text-align: center;
  padding: 100px 0;
  color: #64748b;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.spinner {
  width: 32px;
  height: 32px;
  border: 3px solid #f1f5f9;
  border-top: 3px solid #0f172a;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.empty-state {
  text-align: center;
  padding: 80px 40px;
  background: #f8fafc;
  border-radius: 20px;
  border: 2px dashed #e2e8f0;
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 20px;
}

.empty-state h3 {
  color: #0f172a;
  margin-bottom: 12px;
}

.empty-state p {
  color: #64748b;
  margin-bottom: 24px;
}

.empty-btn {
  display: inline-block;
  background: #ffffff;
  color: #0f172a;
  text-decoration: none;
  font-weight: 700;
  border: 1.5px solid #0f172a;
  padding: 10px 32px;
  border-radius: 10px;
  transition: all 0.2s;
}

.empty-btn:hover {
  background: #0f172a;
  color: #ffffff;
}

/* 側邊留言板樣式 (與之前保持一致) */
.message-toggle {
  position: fixed;
  bottom: 30px;
  right: 30px;
  background: #0f172a;
  color: #ffffff;
  border: none;
  padding: 14px 24px;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  z-index: 100;
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

.overlay.active { opacity: 1; pointer-events: auto; }

.message-aside {
  position: fixed;
  top: 0;
  right: 0;
  width: 400px;
  height: 100%;
  background: #fff;
  transform: translateX(100%);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1000;
  display: flex;
  flex-direction: column;
}

.message-aside.open { transform: translateX(0); }

.aside-header {
  padding: 24px;
  border-bottom: 1px solid #f1f5f9;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.aside-body { flex: 1; overflow-y: auto; padding: 24px; }

@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }
  .message-aside { width: 100%; }
  .item-grid { grid-template-columns: repeat(2, 1fr); gap: 16px; }
}
</style>