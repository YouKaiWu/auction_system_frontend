<script setup>
import { ref, onMounted } from 'vue'
import api from '@/api/api'

const items = ref([])

const fetchMyItems = async () => {

  const res = await api.get('/items/my')

  items.value = res.data
}

onMounted(fetchMyItems)
</script>

<template>

  <div>

    <h1>My Items</h1>

    <div
      v-for="item in items"
      :key="item.id"
    >
      {{ item.name }}
    </div>

  </div>

</template>