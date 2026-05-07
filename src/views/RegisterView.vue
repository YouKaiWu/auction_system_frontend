<script setup>
import { ref } from 'vue'
import api from '@/api/api'

const form = ref({
  account: '',
  passwd: '',
  email: '',
  phoneNum: '',
  idNum: ''
})

const register = async () => {

  await api.post('/auth/register', form.value)

  alert('Register success')
}
</script>

<template>

  <div>

    <h1>Register</h1>

    <input v-model="form.account" placeholder="account">

    <input type="password" v-model="form.passwd" placeholder="password">

    <input v-model="form.email" placeholder="email">

    <input v-model="form.phoneNum" placeholder="phone">

    <input v-model="form.idNum" placeholder="id number">

    <button @click="register">
      Register
    </button>

  </div>

</template>