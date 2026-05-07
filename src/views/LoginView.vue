<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const auth = useAuthStore()

const form = ref({
  account: '',
  passwd: ''
})

const login = async () => {

  await auth.login(form.value)

  router.push('/')
}
</script>

<template>

  <div>

    <h1>Login</h1>

    <input
      v-model="form.account"
      placeholder="account"
    >

    <input
      type="password"
      v-model="form.passwd"
      placeholder="password"
    >

    <button @click="login">
      Login
    </button>

  </div>

</template>