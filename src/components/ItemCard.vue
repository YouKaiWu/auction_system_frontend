<script setup>
import { useRouter } from 'vue-router'
import { IMAGE_BASE } from '@/api/api'

defineProps({
  item: Object,
  clickable: {
    type: Boolean,
    default: true
  }
})

const router = useRouter()

const goDetail = (id) => {
  router.push(`/items/${id}`)
}
</script>

<template>
  <div
    class="item-card"
    :class="{ 'is-clickable': clickable }"
    @click="clickable && goDetail(item.id)"
  >
    <div class="image-container">
      <img :src="`${IMAGE_BASE}${item.imagePath}`" :alt="item.name" class="item-img">
      <div v-if="clickable" class="image-overlay">
        <span>查看詳情</span>
      </div>
    </div>

    <div class="card-info">
      <h3 class="item-name">{{ item.name }}</h3>
      <div class="price-row">
        <span class="price-label">目前出價</span>
        <div class="price-value">
          <span class="currency">$</span>
          <span class="amount">{{ Number(item.currentPrice).toLocaleString() }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.item-card {
  background: #ffffff;
  border-radius: 16px;
  border: 1px solid #f1f5f9;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
}

.is-clickable {
  cursor: pointer;
}

.is-clickable:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(15, 23, 42, 0.08);
  border-color: #e2e8f0;
}

.image-container {
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  background: #f8fafc;
  overflow: hidden;
}

.item-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 20px;
  transition: transform 0.5s ease;
}

.is-clickable:hover .item-img {
  transform: scale(1.05);
}

.image-overlay {
  position: absolute;
  inset: 0;
  background: rgba(15, 23, 42, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.image-overlay span {
  color: white;
  font-weight: 600;
  font-size: 14px;
  padding: 8px 16px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  backdrop-filter: blur(4px);
}

.is-clickable:hover .image-overlay {
  opacity: 1;
}

.card-info {
  padding: 16px;
}

.item-name {
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 12px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.price-row {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.price-label {
  font-size: 12px;
  color: #94a3b8;
}

.price-value {
  display: flex;
  align-items: baseline;
  gap: 4px;
}

.currency {
  font-size: 12px;
  font-weight: 600;
  color: #64748b;
}

.amount {
  font-size: 20px;
  font-weight: 700;
  color: #0f172a;
}
</style>