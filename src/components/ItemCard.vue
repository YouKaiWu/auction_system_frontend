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
    :class="{ clickable }"
    @click="clickable && goDetail(item.id)"
  >
    <img :src="`${IMAGE_BASE }${item.imagePath}`" class="item-img">

    <h3>{{ item.name }}</h3>
    <p>Current Price: {{ item.currentPrice }}</p>
  </div>
</template>

<style>
.item-img {
  width: 200px;
  height: 200px;
  object-fit: cover; /* 重點 */
}
</style>