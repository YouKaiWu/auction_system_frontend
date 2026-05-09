<script setup>
import { ref, onMounted } from 'vue'
import api from '@/api/api'

const props = defineProps({
  userId: {
    type: Number,
    required: true
  },
  canPost: {
    type: Boolean,
    default: true
  }
})

const messages = ref([])
const content = ref('')
const rating = ref(5)
const hoverRating = ref(0)

const loadMessages = async () => {
  const res = await api.get(`/users/${props.userId}/messages`)
  messages.value = res.data
}

const setRating = (val) => {
  rating.value = val
}

const submitMessage = async () => {
  if (!props.canPost) return
  if (!content.value.trim()) return

  await api.post(`/users/${props.userId}/messages`, {
    content: content.value,
    rating: rating.value
  })

  content.value = ''
  rating.value = 5
  await loadMessages()
}

onMounted(loadMessages)
</script>

<template>
  <div class="board-wrapper">

    <div v-if="canPost" class="input-card focus-within">
      <textarea
        v-model="content"
        placeholder="對商品有任何疑問？歡迎留言給賣家"
        rows="3"
        class="custom-textarea"
      ></textarea>

      <div class="input-footer">
        <div class="rating-container">
          <span class="label">評分</span>
          <div class="star-picker">
            <span 
              v-for="n in 5" 
              :key="n"
              class="star-icon"
              :class="{ 'is-active': (hoverRating || rating) >= n }"
              @mouseenter="hoverRating = n"
              @mouseleave="hoverRating = 0"
              @click="setRating(n)"
            >
              ★
            </span>
          </div>
        </div>

        <button 
          @click="submitMessage" 
          class="send-btn" 
          :disabled="!content.trim()"
        >
          發送留言
        </button>
      </div>
    </div>

  

    <!-- 留言列表 -->
    <div class="message-feed">
      <div v-if="messages.length">
        <div v-for="msg in messages" :key="msg.id" class="message-bubble">
          <div class="bubble-header">
            <span class="user-tag">User #{{ msg.senderId }}</span>
            <div class="display-stars">
              <span v-for="s in 5" :key="s" :class="{ 'filled': msg.rating >= s }">★</span>
            </div>
          </div>
          <p class="text-content">{{ msg.content }}</p>
          <time class="timestamp">{{ msg.createdAt }}</time>
        </div>
      </div>

      <div v-else class="empty-state">
        <p>目前尚無留言</p>
      </div>
    </div>

  </div>
</template>

<style scoped>
.board-wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.input-card {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 16px;
  transition: all 0.2s ease;
}

.input-card:focus-within {
  background: #fff;
  border-color: #0f172a;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.custom-textarea {
  width: 100%;
  background: transparent;
  border: none;
  resize: none;
  font-size: 14px;
  color: #1e293b;
  outline: none;
}

.input-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #e2e8f0;
}

.star-picker {
  display: flex;
  gap: 2px;
}

.star-icon {
  font-size: 20px;
  color: #e2e8f0;
  cursor: pointer;
}

.star-icon.is-active {
  color: #f59e0b;
}

.send-btn {
  background: #0f172a;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
}

.send-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.message-bubble {
  background: #fff;
  border: 1px solid #f1f5f9;
  padding: 16px;
  border-radius: 12px;
  margin-bottom: 12px;
}

.user-tag {
  font-size: 13px;
  font-weight: 600;
  color: #475569;
}

.text-content {
  font-size: 14px;
  color: #334155;
  line-height: 1.6;
}

.timestamp {
  font-size: 11px;
  color: #94a3b8;
  text-align: right;
  display: block;
  margin-top: 8px;
}

</style>