<script setup>
import { ref } from 'vue'
import api from '@/api/api'

const props = defineProps({
  itemId: Number
})

const emit = defineEmits(['bid-success'])


const bidPrice = ref(null)
const isSubmitting = ref(false)

const submitBid = async () => {
  if (!bidPrice.value || bidPrice.value <= 0) {
    alert('請輸入有效的競標金額')
    return
  }

  isSubmitting.value = true
  try {
    await api.post('/bids', {
      itemId: props.itemId,
      bidPrice: bidPrice.value
    })
    alert('競標成功！')
    emit('bid-success')
    bidPrice.value = null // 清空輸入
  } catch (error) {
    alert('競標失敗，請稍後再試')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="bid-form-wrapper">
    <div class="input-container">
      <span class="currency-prefix">$</span>
      <input
        type="number"
        v-model="bidPrice"
        placeholder="輸入您的出價金額"
        class="bid-input"
        :disabled="isSubmitting"
      >
    </div>

    <button 
      @click="submitBid" 
      class="submit-button"
      :disabled="isSubmitting"
    >
      <span v-if="!isSubmitting">參與競拍</span>
      <span v-else class="loader"></span>
    </button>
    
  </div>
</template>

<style scoped>
.bid-form-wrapper {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.input-container {
  position: relative;
  display: flex;
  align-items: center;
}

.currency-prefix {
  position: absolute;
  left: 16px;
  color: #94a3b8;
  font-weight: 500;
  font-size: 14px;
}

.bid-input {
  width: 100%;
  padding: 14px 16px 14px 32px;
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 15px;
  color: #1e293b;
  outline: none;
  transition: all 0.2s ease;
}

.bid-input:focus {
  border-color: #0f172a;
  box-shadow: 0 0 0 2px rgba(15, 23, 42, 0.05);
}

/* 移除數字箭頭 */
.bid-input::-webkit-outer-spin-button,
.bid-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.submit-button {
  width: 100%;
  padding: 14px;
  background-color: #0f172a; /* 使用與「賣家留言板」一致的深色 */
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  justify-content: center;
  align-items: center;
}

.submit-button:hover:not(:disabled) {
  background-color: #1e293b;
  transform: translateY(-1px);
}

.submit-button:disabled {
  background-color: #cbd5e1;
  cursor: not-allowed;
}

.bid-hint {
  font-size: 12px;
  color: #94a3b8;
  text-align: center;
  margin: 4px 0 0 0;
}

.loader {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: #ffffff;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>