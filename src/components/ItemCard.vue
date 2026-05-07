<script setup>
defineProps({
  item: Object
})
</script>

<template>

  <router-link :to="`/items/${item.id}`">

    <div>

      <img
        :src="item.imagePath"
        width="200"
      >

      <h3>
        {{ item.name }}
      </h3>

      <p>
        Current Price:
        {{ item.currentPrice }}
      </p>

    </div>

  </router-link>

</template>