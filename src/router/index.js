import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import ItemListView from '@/views/ItemListView.vue'
import ItemDetailView from '@/views/ItemDetailView.vue'
import CreateItemView from '@/views/CreateItemView.vue'
import MyItemsView from '@/views/MyItemsView.vue'
import NotificationView from '@/views/NotificationView.vue'

const routes = [
  {
    path: '/',
    component: ItemListView
  },
  {
    path: '/login',
    component: LoginView
  },
  {
    path: '/register',
    component: RegisterView
  },
  {
    path: '/items/:id',
    component: ItemDetailView
  },
  {
    path: '/create',
    component: CreateItemView
  },
  {
    path: '/my-items',
    component: MyItemsView
  },
  {
    path: '/notifications',
    component: NotificationView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router