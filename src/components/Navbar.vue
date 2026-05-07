<script setup>
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
</script>

<template>

  <nav>

    <router-link to="/">
      Home
    </router-link>

    <router-link to="/create">
      Create
    </router-link>

    <router-link to="/my-items">
      My Items
    </router-link>

    <router-link to="/notifications">
      Notifications
    </router-link>

    <router-link to="/login">
      Login
    </router-link>

    <button @click="auth.logout()">
      Logout
    </button>

  </nav>

</template>