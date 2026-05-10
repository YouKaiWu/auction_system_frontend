<script setup>
import { ref, onMounted } from 'vue'
import api from '@/api/api'

const notifications = ref([])

const fetchNotifications = async () => {
  try {
    const res = await api.get('/notifications')
    notifications.value = res.data
  } catch (error) {
    console.error('無法取得通知:', error)
  }
}

onMounted(fetchNotifications)
</script>

<template>
  <div class="notifications-page">
    <header class="notifications-header">
      <div class="header-content">
        <p class="subtitle">查看您的帳號動態與最新消息</p>
      </div>
    </header>

    <main class="content-container">
      <div v-if="notifications.length" class="notification-list">
        <div
          v-for="notification in notifications"
          :key="notification.id"
          class="notification-item"
        >
          <div class="notification-icon">
            <div class="dot" :class="{ unread: !notification.isRead }"></div>
          </div>
          <div class="notification-content">
            <h3 class="notif-title">{{ notification.title }}</h3>
            <p class="notif-text">{{ notification.content }}</p>
            <span class="notif-time">{{ notification.sentAt}}</span>
          </div>
        </div>
      </div>

      <!-- 沒通知時的狀態，與 Marketplace 一致 -->
      <div v-else class="empty-state">
        <div class="empty-icon">🔔</div>
        <p>目前沒有任何通知</p>
      </div>
    </main>
  </div>
</template>

<style scoped>
.notifications-page {
  background-color: #f8fafc;
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

.notifications-header {
  background: white;
  border-bottom: 1px solid #f1f5f9;
  padding: 40px 0 20px;
}

.header-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 24px;
}

.page-title {
  font-size: 24px;
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 12px;
}

.subtitle {
  color: #64748b;
  font-size: 14px;
}

.content-container {
  max-width: 800px;
  margin: 32px auto;
  padding: 0 24px;
}

.notification-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.notification-item {
  background: white;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid #f1f5f9;
  display: flex;
  gap: 16px;
  transition: all 0.2s ease;
  cursor: pointer;
}

.notification-item:hover {
  border-color: #e2e8f0;
  transform: translateX(4px);
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.03);
}

.notification-icon {
  padding-top: 4px;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #e2e8f0;
}

.dot.unread {
  background-color: #0f172a; /* 使用主色調標示未讀 */
  box-shadow: 0 0 0 4px rgba(15, 23, 42, 0.1);
}

.notification-content {
  flex: 1;
}

.notif-title {
  font-size: 16px;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 4px;
}

.notif-text {
  font-size: 14px;
  color: #64748b;
  line-height: 1.5;
  margin-bottom: 8px;
}

.notif-time {
  font-size: 12px;
  color: #94a3b8;
}

.empty-state {
  text-align: center;
  padding: 100px 0;
  color: #94a3b8;
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

@media (max-width: 640px) {
  .content-container {
    margin: 16px auto;
  }
  
  .notification-item {
    padding: 16px;
  }
}
</style>