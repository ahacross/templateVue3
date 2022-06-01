import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/menu1',
      name: 'menu1',
      component: () => import('../views/Menu1View.vue'),
    },
    {
      path: '/menu2',
      name: 'menu2',
      component: () => import('../views/Menu2View.vue'),
    },
    {
      path: '/menu3',
      name: 'menu3',
      component: () => import('../views/Menu3View.vue'),
    },
  ],
})

export default router
