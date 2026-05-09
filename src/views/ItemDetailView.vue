<template>
  <div v-if="item" class="auction-container">
    <main class="content-grid">
      <section class="visual-pane">
        <div class="image-box">
          <img :src="`${IMAGE_BASE}${item.imagePath}`" :alt="item.name">
        </div>
      </section>

        <section class="action-pane">
          <div class="main-card">
            <header class="header-section">
              <div class="badge-row">
                <span class="status-badge">競投中</span>
              </div>
              <h1 class="title">{{ item.name }}</h1>
              <div class="seller-line">
                <div class="avatar-dot"></div>
                <span class="seller-name">賣家: {{ item.ownerId }}</span>
              </div>
            </header>

            <div class="price-block">
              <div class="price-label">目前最高出價</div>
              <div class="price-wrapper">
                <span class="currency">TWD</span>
                <span class="price">{{ Number(item.currentPrice).toLocaleString() }}</span>
              </div>
            </div>

            <div class="bid-section">
              <BidForm :itemId="item.id" />
            </div>
          </div>
        </section>
      </main>

      <button class="message-toggle" @click="isMessageOpen = true">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
        <span>賣家留言板</span>
      </button>

      <div :class="['overlay', { active: isMessageOpen }]" @click="isMessageOpen = false"></div>
      <aside :class="['message-aside', { open: isMessageOpen }]">
        <div class="aside-header">
          <h2>賣家留言板</h2>
          <button class="close-btn" @click="isMessageOpen = false">✕</button>
        </div>
        <div class="aside-body">
          <MessageBoard :userId="item.ownerId" />
        </div>
      </aside>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { IMAGE_BASE } from '@/api/api'
import api from '@/api/api'
import BidForm from '@/components/BidForm.vue'
import MessageBoard from '@/components/MessageBoard.vue'

const route = useRoute()
const item = ref(null)
const isMessageOpen = ref(false)

const fetchItem = async () => {
  try {
    const res = await api.get(`/items/${route.params.id}`)
    item.value = res.data
  } catch (e) {
    console.error(e)
  }
}
onMounted(fetchItem)
</script>

<style scoped>
.auction-container {
  min-height: 100vh;
  background-color: #f9fafb;
  color: #334155;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

.content-grid {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  max-width: 1100px;
  margin: 0 auto;
  gap: 40px;
  padding: 60px 24px;
}

.visual-pane {
  position: sticky;
  top: 40px;
  height: fit-content;
}

.image-box {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(8px);
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.8);
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.05);
}

.image-box img {
  width: 80%;
  height: 100%;
  object-fit: contain;
}
.main-card {
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

.header-section {
  padding: 32px;
  border-bottom: 1px solid #f1f5f9;
}

.badge-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
}

.status-badge {
  font-size: 11px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 4px;
  background: #f0fdf4;
  color: #16a34a;
  border: 1px solid #dcfce7;
}

.item-id {
  font-size: 11px;
  color: #94a3b8;
}

.title {
  font-size: 26px;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 16px 0;
  line-height: 1.4;
}

.seller-line {
  display: flex;
  align-items: center;
  gap: 8px;
}

.avatar-dot {
  width: 6px;
  height: 6px;
  background: #cbd5e1;
  border-radius: 50%;
}

.seller-name {
  font-size: 14px;
  color: #64748b;
}

.price-block {
  padding: 32px;
  background: #f8fafc;
}

.price-label {
  font-size: 13px;
  color: #64748b;
  margin-bottom: 4px;
}

.price-wrapper {
  display: flex;
  align-items: baseline;
  gap: 6px;
}

.currency {
  font-size: 14px;
  font-weight: 600;
  color: #475569;
}

.price {
  font-size: 36px;
  font-weight: 700;
  color: #0f172a;
}

.bid-section {
  padding: 32px;
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

@media (max-width: 1024px) {
  .content-grid {
    grid-template-columns: 1fr;
    padding: 30px 16px;
    gap: 24px;
  }
  .visual-pane {
    position: relative;
    top: 0;
  }
  .message-aside {
    width: 100%;
  }
}
</style>