<script setup>
import { ref, onMounted, computed } from 'vue'
import api from '@/api/api'
import ItemCard from '@/components/ItemCard.vue'

const items = ref([])
const loading = ref(true)

const fetchMyItems = async () => {
  try {
    loading.value = true
    const res = await api.get('/items/my')
    items.value = res.data
  } finally {
    loading.value = false
  }
}

// 簡單的統計數據
const totalItems = computed(() => items.value.length)

onMounted(fetchMyItems)
</script>

<template>
  <div class="my-items-container">
    <!-- 頁面頂部區域 -->
    <header class="page-header">
      <div class="header-content">
        <h1>我的拍賣</h1>
        <p class="subtitle">管理您刊登的所有商品</p>
      </div>
      <router-link to="/create" class="create-btn">
        <i class="fas fa-plus"></i> 刊登新商品
      </router-link>
    </header>

    <!-- 數據概覽卡片 -->
    <div class="stats-overview">
      <div class="stat-card">
        <span class="stat-label">商品總數</span>
        <span class="stat-value">{{ totalItems }}</span>
      </div>
      <!-- 這裡可以擴充其他統計，例如：已售出、審核中 -->
    </div>

    <!-- 商品列表區 -->
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

      <!-- 空狀態處理 -->
      <div v-else class="empty-state">
        <div class="empty-icon">📦</div>
        <h3>目前還沒有商品</h3>
        <p>把家裡用不到的寶物拿出來拍賣吧！</p>
        <router-link to="/create" class="empty-btn">立即去刊登</router-link>
      </div>
    </main>
  </div>
</template>

<style scoped>
.my-items-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

/* 頁頭樣式 */
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

/* 統計資訊 */
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

/* 網格系統 */
.item-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 25px;
}

/* 空狀態樣式 */
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

/* 手機版適應 */
@media (max-width: 600px) {
  .page-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
}
</style>