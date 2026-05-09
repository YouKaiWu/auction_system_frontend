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

// 處理圖片選取與預覽
const handleFileChange = (e) => {
  const file = e.target.files[0]
  if (file) {
    imageFile.value = file
    // 產生預覽 URL 給前端顯示
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
    new Blob([JSON.stringify(item)], {
      type: 'application/json'
    })
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

      <div class="form-body">
        <!-- 商品圖片上傳區 -->
        <div class="form-group">
          <label>商品圖片</label>
          <div class="image-upload-wrapper">
            <!-- 隱藏原始 input，用 label 或按鈕觸發 -->
            <input type="file" id="imageInput" accept="image/*" @change="handleFileChange" hidden>
            <label for="imageInput" class="upload-area">
              <img v-if="imagePreview" :src="imagePreview" class="preview-img" />
              <div v-else class="upload-placeholder">
                <span>+ 點擊上傳圖片</span>
              </div>
            </label>
          </div>
        </div>

        <!-- 原有的表單欄位 -->
        <div class="form-group">
          <label>商品名稱</label>
          <input v-model="form.name" placeholder="商品名稱">
        </div>

        <div class="form-group">
          <label>商品分類</label>
          <select v-model="form.categoryId">
            <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
          </select>
        </div>

        <div class="form-group">
          <label>起標價格</label>
          <input type="number" v-model="form.startingPrice">
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>開始時間</label>
            <input type="datetime-local" v-model="form.startTime">
          </div>
          <div class="form-group">
            <label>結束時間</label>
            <input type="datetime-local" v-model="form.endTime">
          </div>
        </div>

        <button class="submit-btn" @click="createItem">立即刊登</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.create-container {
  background-color: #f8f9fa;
  min-height: calc(100vh - 70px);
  /* 扣除導覽列高度 */
  padding: 40px 20px;
  display: flex;
  justify-content: center;
}

.form-card {
  background: white;
  width: 100%;
  max-width: 600px;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.form-title {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
  text-align: center;
}

.form-subtitle {
  color: #888;
  text-align: center;
  margin-bottom: 30px;
  font-size: 14px;
}

/* 表單群組佈局 */
.form-body {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

label {
  font-size: 14px;
  font-weight: 600;
  color: #444;
}

/* 輸入框美化 */
input,
select {
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 15px;
  transition: all 0.3s;
  background-color: #fff;
}

input:focus,
select:focus {
  outline: none;
  border-color: #ee4d2d;
  box-shadow: 0 0 0 3px rgba(238, 77, 45, 0.1);
}

/* 按鈕美化 */
.submit-btn {
  margin-top: 10px;
  padding: 14px;
  background-color: #ee4d2d;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s;
}

.submit-btn:hover {
  background-color: #d73211;
}

/* 手機版適應 */
@media (max-width: 480px) {
  .form-card {
    padding: 20px;
  }

  .form-row {
    grid-template-columns: 1fr;
  }
}

.image-upload-wrapper {
  width: 100%;
  margin-bottom: 10px;
}

.upload-area {
  display: block;
  width: 150px;
  height: 150px;
  border: 2px dashed #ddd;
  border-radius: 8px;
  cursor: pointer;
  overflow: hidden;
  transition: border-color 0.3s;
}

.upload-area:hover {
  border-color: #ee4d2d;
}

.upload-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #999;
  font-size: 14px;
}

.preview-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* 確保圖片不變形地填滿格子 */
}
</style>