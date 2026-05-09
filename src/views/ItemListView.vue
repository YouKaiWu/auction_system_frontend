<script setup>
import { ref, onMounted } from 'vue'
import api from '@/api/api'
import ItemCard from '@/components/ItemCard.vue'

const items = ref([])
const categories = ref([]) // 存放所有分類
const activeCategory = ref(null) // 追蹤目前選中的分類 ID

// 取得分類清單
const fetchCategories = async () => {
  const res = await api.get('/categories')
  categories.value = res.data
}

// 取得商品清單，傳入選定的 categoryId
const fetchItems = async (categoryId = null) => {
  activeCategory.value = categoryId
  
  // 依照你的要求，多傳一個 categoryId 參數
  const res = await api.get('/items', {
    params: { categoryId: categoryId }
  })
  items.value = res.data
}

onMounted(() => {
  fetchCategories()
  fetchItems()
})
</script>

<template>
  <div class="marketplace">
    <div class="header-section">
      
      
      <!-- 分類選擇器 -->
      <nav class="category-bar">
        <button 
          :class="{ active: activeCategory === null }" 
          @click="fetchItems(null)"
        >
          All
        </button>
        <button 
          v-for="cat in categories" 
          :key="cat.id"
          :class="{ active: activeCategory === cat.id }"
          @click="fetchItems(cat.id)"
        >
          {{ cat.name }}
        </button>
      </nav>
    </div>

    <!-- 商品網格 -->
    <div class="item-grid">
      <ItemCard
        v-for="item in items"
        :key="item.id"
        :item="item"
        class="custom-card"
      />
    </div>
  </div>
</template>

<style scoped>
.marketplace {
  background-color: #f7f7f7;
  padding: 30px 20px;
  min-height: 100vh;
  font-family: system-ui, -apple-system, sans-serif;
}

.header-section {
  max-width: 1200px;
  margin: 0 auto 30px;
}

.header-section h1 {
  font-size: 22px;
  margin-bottom: 20px;
  color: #333;
}

/* 分類導覽列樣式 */
.category-bar {
  display: flex;
  gap: 12px;
  overflow-x: auto; /* 手機版可橫向滑動 */
  padding-bottom: 10px;
}

.category-bar button {
  padding: 8px 18px;
  border-radius: 20px;
  border: 1px solid #ddd;
  background: white;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s;
  color: #555;
}

.category-bar button:hover {
  border-color: #ff4d4f;
  color: #ff4d4f;
}

.category-bar button.active {
  background-color: #ff4d4f;
  border-color: #ff4d4f;
  color: white;
  font-weight: bold;
}

/* 商品網格佈局 */
.item-grid {
  display: grid;
  max-width: 1200px;
  margin: 0 auto;
  /* 橫向排列核心：自動填滿，每格最小 220px */
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
}

.custom-card {
  background: #fff;
  border-radius: 8px;
  border: 1px solid #eee;
  transition: transform 0.2s, box-shadow 0.2s;
}

.custom-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 15px rgba(0,0,0,0.1);
}

/* 隱藏滾動條但保持功能 (可選) */
.category-bar::-webkit-scrollbar {
  display: none;
}

@media (max-width: 600px) {
  .item-grid {
    grid-template-columns: repeat(2, 1fr); /* 手機一排兩個 */
    gap: 12px;
  }
}
</style>