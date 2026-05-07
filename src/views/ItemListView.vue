<script setup>
import { ref, onMounted } from 'vue'
import api from '@/api/api'
import ItemCard from '@/components/ItemCard.vue'

const items = ref([])

const fetchItems = async () => {

  const res = await api.get('/items')

  items.value = res.data
}

onMounted(fetchItems)
</script>

<template>

  <div>

    <h1>Items</h1>

    <ItemCard
      v-for="item in items"
      :key="item.id"
      :item="item"
    />

  </div>

</template>