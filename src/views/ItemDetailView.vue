<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

import api from '@/api/api'
import BidForm from '@/components/BidForm.vue'
import MessageBoard from '@/components/MessageBoard.vue'

const route = useRoute()

const item = ref(null)

const fetchItem = async () => {

  const res = await api.get(`/items/${route.params.id}`)

  item.value = res.data
}

onMounted(fetchItem)
</script>

<template>

  <div v-if="item">

    <img
      :src="item.imagePath"
      width="300"
    >

    <h1>
      {{ item.name }}
    </h1>

    <p>
      Current Price:
      {{ item.currentPrice }}
    </p>

    <p>
      Seller:
      {{ item.ownerName }}
    </p>

    <BidForm :itemId="item.id" />

    <MessageBoard />

  </div>

</template>