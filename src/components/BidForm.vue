<script setup>
import { ref } from 'vue'
import api from '@/api/api'

const props = defineProps({
  itemId: Number
})

const bidPrice = ref(0)

const submitBid = async () => {

  await api.post('/bids', {
    itemId: props.itemId,
    bidPrice: bidPrice.value
  })

  alert('Bid success')
}
</script>

<template>

  <div>

    <input
      type="number"
      v-model="bidPrice"
    >

    <button @click="submitBid">
      Bid
    </button>

  </div>

</template>