<script setup>
import { ref, onMounted, computed } from 'vue'
import api from '@/api/api'
import ItemCard from '@/components/ItemCard.vue'
import MessageBoard from '@/components/MessageBoard.vue'
import { useAuthStore } from '@/stores/auth'

const items = ref([])
const loading = ref(true)
const isMessageOpen = ref(false)
const winnerMap = ref({})

const auth = useAuthStore()

const fetchAuctionResult = async (itemId) => {
  try {
    const res = await api.get(`/auctions/${itemId}/result`)
    return res.data?.winnerUserId ?? null
  } catch (e) {
    return null
  }
}

const fetchMyItems = async () => {
  try {
    loading.value = true
    const res = await api.get('/items/my')
    items.value = res.data

    const results = await Promise.all(
      items.value.map(async (item) => {
        if (item.status === 'ENDED') {
          const winnerUserId = await fetchAuctionResult(item.id)
          return [item.id, winnerUserId]
        }
        return [item.id, null]
      })
    )

    winnerMap.value = Object.fromEntries(results)
  } finally {
    loading.value = false
  }
}

const totalItems = computed(() => items.value.length)
const activeItems = computed(() => items.value.filter(i => i.status !== 'ENDED'))
const endedItems = computed(() => items.value.filter(i => i.status === 'ENDED'))

onMounted(fetchMyItems)
</script>

<template>
  <div class="my-items-container">
    <!-- Header -->
    <header class="page-header">
      <div>
        <h1 class="page-title">拍賣管理</h1>
        <p class="subtitle">管理您的刊登商品</p>
      </div>

      <router-link to="/create" class="create-btn">
        + 刊登商品
      </router-link>
    </header>

    <!-- Stats -->
    <div class="stat-card">
      <span class="stat-label">商品總數</span>
      <span class="stat-value">{{ totalItems }}</span>
    </div>

    <main>
      <!-- 進行中 -->
      <section class="section-block">
        <div class="section-header">
          <span class="status-dot online"></span>
          <h2>正在拍賣 ({{ activeItems.length }})</h2>
        </div>

        <div v-if="loading">載入中...</div>

        <div v-else class="item-grid">
          <ItemCard v-for="item in activeItems" :key="item.id" :item="item" :clickable="false" />
        </div>
      </section>

      <!-- 已結束 -->
      <section class="section-block">
        <div class="section-header">
          <span class="status-dot offline"></span>
          <h2>已結束 ({{ endedItems.length }})</h2>
        </div>

        <div class="item-grid">
          <div v-for="item in endedItems" :key="item.id" class="card-inner">
            <ItemCard :item="item" :clickable="false" class="grayscale-card" />

            <div class="winner-tag" :class="winnerMap[item.id] ? 'has-winner' : 'no-bid'">
              <div class="tag-label">
                <!-- 加入小圖示增加辨識度 -->
                <span v-if="winnerMap[item.id]" class="icon">🏆</span>
                <span v-else class="icon">💨</span>
                {{ winnerMap[item.id] ? '成交得標' : '拍賣流標' }}
              </div>

              <div class="tag-info">
                <template v-if="winnerMap[item.id]">
                  <span class="user-badge">User #{{ winnerMap[item.id] }}</span>
                </template>
                <template v-else>
                  <span class="none-text">此商品無人投標</span>
                </template>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- 側邊留言板觸發按鈕 -->
    <button class="message-toggle" @click="isMessageOpen = true">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>
      <span>我的留言板</span>
    </button>

    <!-- 側邊欄 Overlay -->
    <div :class="['overlay', { active: isMessageOpen }]" @click="isMessageOpen = false"></div>

    <!-- 側邊欄 Drawer -->
    <aside :class="['message-aside', { open: isMessageOpen }]">
      <div class="aside-header">
        <h2>我的留言板</h2>
        <button class="close-btn" @click="isMessageOpen = false">✕</button>
      </div>
      <div class="aside-body">
        <MessageBoard v-if="auth.user" :userId="auth.user.id" :canPost="false" />
      </div>
    </aside>

  </div>
</template>

<style scoped>
/* 基礎佈局保持不變 */
.my-items-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 30px 20px;
  background: #f8fafc;
  min-height: 100vh;
  font-size: 14px;
}

/* Header & Stats */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.page-title {
  font-size: 22px;
  font-weight: 800;
}

.subtitle {
  font-size: 13px;
  color: #64748b;
}

.create-btn {
  background: #0f172a;
  color: white;
  padding: 8px 14px;
  border-radius: 8px;
  font-size: 13px;
  text-decoration: none;
}

.stat-card {
  background: white;
  padding: 14px;
  border-radius: 12px;
  margin-bottom: 20px;
  border: 1px solid #e2e8f0;
}

.stat-label {
  font-size: 11px;
  color: #94a3b8;
  display: block;
}

.stat-value {
  font-size: 22px;
  font-weight: 800;
}

/* Grid & Cards */
.section-block {
  margin-bottom: 30px;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.online {
  background: #10b981;
}

.offline {
  background: #94a3b8;
}

.item-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
  gap: 20px;
}

.card-inner {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #e2e8f0;
}

.grayscale-card {
  filter: grayscale(0.3);
  opacity: 0.9;
}
/* Winner Tag 外層容器 */
.winner-tag {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-top: 1px solid #f1f5f9; /* 增加一條細線隔開卡片內容 */
}

/* 狀態標題 (得標/流標) */
.tag-label {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.tag-label .icon {
  font-size: 14px;
}

/* 具體資訊 (User ID / 無人投標文字) */
.tag-info {
  margin-top: 2px;
}

/* 得標狀態下的美化樣式 */
.has-winner {
  background: linear-gradient(to bottom, #ffffff, #f0fdf4); /* 微漸變感 */
}

.has-winner .tag-label {
  color: #166534;
}

/* 得標者 ID 的藥丸標籤 (Pill) */
.user-badge {
  display: inline-block;
  background: #22c55e;
  color: white;
  padding: 2px 10px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 800;
  box-shadow: 0 2px 4px rgba(34, 197, 94, 0.2);
}

/* 流標狀態下的美化樣式 */
.no-bid {
  background: linear-gradient(to bottom, #ffffff, #f8fafc);
}

.no-bid .tag-label {
  color: #64748b;
}

.none-text {
  font-size: 12px;
  color: #94a3b8;
  font-style: italic;
}

/* 額外小細節：讓卡片在有得標者時邊框稍微亮一點 */
.card-inner:has(.has-winner) {
  border-color: #dcfce7;
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
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
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
  box-shadow: -4px 0 15px rgba(0, 0, 0, 0.05);
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
  margin: 0;
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

/* 行動裝置適應 */
@media (max-width: 480px) {
  .message-aside {
    width: 100%;
  }

  .message-toggle {
    bottom: 20px;
    right: 20px;
    padding: 12px 18px;
  }
}
</style>