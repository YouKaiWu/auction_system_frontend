<script setup>
import { ref } from 'vue'
import api from '@/api/api'

const form = ref({
  name: '',
  categoryId: 1,
  startingPrice: 0,
  startTime: '',
  endTime: ''
})

const createItem = async () => {

  await api.post('/items', form.value)

  alert('Create success')
}
</script>

<template>

  <div>

    <h1>Create Item</h1>

    <input v-model="form.name" placeholder="name">

    <input
      type="number"
      v-model="form.startingPrice"
      placeholder="price"
    >

    <input
      type="datetime-local"
      v-model="form.startTime"
    >

    <input
      type="datetime-local"
      v-model="form.endTime"
    >

    <button @click="createItem">
      Create
    </button>

  </div>

</template>