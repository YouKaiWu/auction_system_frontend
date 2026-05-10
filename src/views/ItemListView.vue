<script setup>
import { ref, onMounted } from 'vue'
import api from '@/api/api'
import ItemCard from '@/components/ItemCard.vue'
import {useAuthStore} from '@/stores/auth'

const items = ref([])
const categories = ref([])
const activeCategory = ref(null)
const auth = useAuthStore()

const fetchCategories = async () => {
  const res = await api.get('/categories')
  categories.value = res.data
}

const fetchItems = async (categoryId = null) => {
  activeCategory.value = categoryId

  const res = await api.get('/items', {
    params: { categoryId }
  })

  const userId = auth.user?.id

  items.value = res.data.filter(item => item.ownerId !== userId)
}

onMounted(() => {
  fetchCategories()
  fetchItems()
})
</script>

<template>
  <div class="marketplace">
    <header class="marketplace-header">
      <div class="header-content">
        <p class="subtitle">查看新上架的商品</p>
        <nav class="category-nav">
          <button 
            :class="{ active: activeCategory === null }" 
            @click="fetchItems(null)"
            class="cat-btn"
          >
            全部商品
          </button>
          <button 
            v-for="cat in categories" 
            :key="cat.id"
            :class="{ active: activeCategory === cat.id }"
            @click="fetchItems(cat.id)"
            class="cat-btn"
          >
            {{ cat.name }}
          </button>
        </nav>
      </div>
    </header>

    <main class="content-container">
      <div v-if="items.length" class="item-grid">
        <ItemCard
          v-for="item in items"
          :key="item.id"
          :item="item"
        />
      </div>
      
      <div v-else class="empty-state">
        <div class="empty-icon">📦</div>
        <p>目前此分類下沒有商品</p>
      </div>
    </main>
  </div>
</template>

<style scoped>
.marketplace {
  background-color: #f8fafc; /* 與整體背景色一致 */
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

.marketplace-header {
  background: white;
  border-bottom: 1px solid #f1f5f9;
  padding: 40px 0 20px;
}

.header-content {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 24px;
}

.page-title {
  font-size: 24px;
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 24px;
}

/* 分類按鈕列樣式 */
.category-nav {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding-bottom: 4px;
  scrollbar-width: none; /* Firefox */
}

.category-nav::-webkit-scrollbar {
  display: none; /* Chrome/Safari */
}

.cat-btn {
  padding: 10px 20px;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
  background: white;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  color: #64748b;
  font-size: 14px;
  font-weight: 600;
}

.cat-btn:hover {
  border-color: #0f172a;
  color: #0f172a;
  background: #f8fafc;
}

.cat-btn.active {
  background-color: #0f172a;
  border-color: #0f172a;
  color: white;
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.15);
}

/* 內容容器佈局 */
.content-container {
  max-width: 1100px;
  margin: 40px auto;
  padding: 0 24px;
}

.item-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 32px; /* 增加間距，讓卡片更有呼吸感 */
}

.empty-state {
  text-align: center;
  padding: 100px 0;
  color: #94a3b8;
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

@media (max-width: 768px) {
  .marketplace-header {
    padding: 24px 0 16px;
  }
  
  .content-container {
    margin: 24px auto;
  }

  .item-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
  
  .page-title {
    font-size: 20px;
    margin-bottom: 16px;
  }
}
.subtitle {
  color: #64748b;
  text-align: left;
  margin-bottom: 40px;
  font-size: 14px;
}
</style>