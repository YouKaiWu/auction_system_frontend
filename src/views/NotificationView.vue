<script setup>
import { ref, onMounted } from 'vue'
import api from '@/api/api'

const notifications = ref([])

const fetchNotifications = async () => {

  const res = await api.get('/notifications')

  notifications.value = res.data
}

onMounted(fetchNotifications)
</script>

<template>

  <div>

    <h1>Notifications</h1>

    <div
      v-for="notification in notifications"
      :key="notification.id"
    >

      <h3>
        {{ notification.title }}
      </h3>

      <p>
        {{ notification.content }}
      </p>

    </div>

  </div>

</template>