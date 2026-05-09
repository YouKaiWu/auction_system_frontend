<script setup>
import { ref, onMounted } from 'vue'
import api from '@/api/api'
import { useRouter } from 'vue-router'

const router = useRouter()
const categories = ref([])
const imageFile = ref(null)    
const imagePreview = ref(null) 

const form = ref({
  name: '',
  categoryId: '',
  startingPrice: 0,
  startTime: '',
  endTime: ''
})

const handleFileChange = (e) => {
  const file = e.target.files[0]
  if (file) {
    imageFile.value = file
    imagePreview.value = URL.createObjectURL(file)
  }
}

const createItem = async () => {
  const formData = new FormData()
  const item = {
    name: form.value.name,
    categoryId: form.value.categoryId,
    startingPrice: form.value.startingPrice,
    startTime: form.value.startTime,
    endTime: form.value.endTime
  }

  formData.append(
    'item',
    new Blob([JSON.stringify(item)], { type: 'application/json' })
  )

  if (imageFile.value) {
    formData.append('image', imageFile.value)
  }

  try {
    await api.post('/items', formData)
    alert('刊登成功！')
    router.push('/my-items')
  } catch (error) {
    console.error(error)
    alert('刊登失敗')
  }
}

onMounted(async () => {
  const res = await api.get('/categories')
  categories.value = res.data
})
</script>

<template>
  <div class="create-container">
    <div class="form-card">
      <h1 class="form-title">刊登新商品</h1>
      <p class="form-subtitle">填寫下方資訊，開啟您的拍賣活動</p>

      <div class="form-body">
        <div class="form-group">
          <label class="input-label">商品圖片</label>
          <div class="image-upload-wrapper">
            <input type="file" id="imageInput" accept="image/*" @change="handleFileChange" hidden>
            <label for="imageInput" class="upload-area">
              <img v-if="imagePreview" :src="imagePreview" class="preview-img" />
              <div v-else class="upload-placeholder">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <circle cx="8.5" cy="8.5" r="1.5"></circle>
                  <polyline points="21 15 16 10 5 21"></polyline>
                </svg>
                <span>點擊上傳商品圖片</span>
              </div>
            </label>
          </div>
        </div>

        <div class="form-group">
          <label class="input-label">商品名稱</label>
          <input v-model="form.name" class="styled-input" placeholder="請輸入完整的商品標題">
        </div>

        <div class="form-group">
          <label class="input-label">商品分類</label>
          <select v-model="form.categoryId" class="styled-select">
            <option value="" disabled>選擇合適的分類</option>
            <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
          </select>
        </div>

        <div class="form-group">
          <label class="input-label">起標價格 (TWD)</label>
          <input type="number" v-model="form.startingPrice" class="styled-input" min="0">
        </div>

        <div class="form-row">
          <div class="form-group">
            <label class="input-label">開始時間</label>
            <input type="datetime-local" v-model="form.startTime" class="styled-input">
          </div>
          <div class="form-group">
            <label class="input-label">結束時間</label>
            <input type="datetime-local" v-model="form.endTime" class="styled-input">
          </div>
        </div>

        <button class="submit-btn" @click="createItem">
          確認刊登商品
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.create-container {
  background-color: #f8fafc;
  min-height: calc(100vh - 72px);
  padding: 60px 24px;
  display: flex;
  justify-content: center;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

.form-card {
  background: white;
  width: 100%;
  max-width: 550px;
  padding: 48px;
  border-radius: 16px;
  border: 1px solid #f1f5f9;
  box-shadow: 0 10px 25px rgba(15, 23, 42, 0.05);
}

.form-title {
  font-size: 26px;
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 8px;
  text-align: center;
}

.form-subtitle {
  color: #64748b;
  text-align: center;
  margin-bottom: 40px;
  font-size: 14px;
}

.form-body {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.input-label {
  font-size: 13px;
  font-weight: 700;
  color: #334155;
  text-transform: uppercase;
  letter-spacing: 0.02em;
}

.styled-input,
.styled-select {
  padding: 12px 16px;
  border: 1.5px solid #e2e8f0;
  border-radius: 10px;
  font-size: 15px;
  color: #1e293b;
  transition: all 0.2s;
  background-color: #ffffff;
}

.styled-input:focus,
.styled-select:focus {
  outline: none;
  border-color: #0f172a;
  box-shadow: 0 0 0 4px rgba(15, 23, 42, 0.05);
}

.image-upload-wrapper {
  width: 100%;
}

.upload-area {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 200px;
  background: #f8fafc;
  border: 2px dashed #e2e8f0;
  border-radius: 12px;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s;
}

.upload-area:hover {
  border-color: #0f172a;
  background: #f1f5f9;
}

.upload-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  color: #94a3b8;
}

.upload-placeholder span {
  font-size: 14px;
  font-weight: 500;
}

.preview-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  background: white;
}

.submit-btn {
  margin-top: 16px;
  padding: 16px;
  background-color: #0f172a;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.submit-btn:hover {
  background-color: #334155;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.15);
}

@media (max-width: 600px) {
  .form-card {
    padding: 30px 20px;
  }
  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>