import { createRouter, createWebHistory } from 'vue-router'

import { useMemberStore } from '../stores/member'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: { requiresAuth: true },
      component: () => import('../views/AttendanceRateView.vue'),
    },
    {
      path: '/edit',
      name: 'edit',
      meta: { requiresAuth: true },
      component: () => import('../views/UserInfoView.vue'),
    },
    {
      path: '/history',
      name: 'history',
      meta: { requiresAuth: true },
      component: () => import('../views/HistoryView.vue'),
    },
    {
      path: '/etc',
      name: 'etc',
      meta: { requiresAuth: true },
      component: () => import('../views/EtcView.vue'),
    },
    {
      path: '/menu1',
      name: 'menu1',
      meta: { requiresAuth: true },
      component: () => import('../views/Menu1View.vue'),
    },
    {
      path: '/menu2',
      name: 'menu2',
      meta: { requiresAuth: true },
      component: () => import('../views/Menu2View.vue'),
    },
    {
      path: '/menu3',
      name: 'menu3',
      meta: { requiresAuth: true },
      component: () => import('../views/Menu3View.vue'),
    },
    {
      path: '/notLogin',
      name: 'notLogin',
      meta: {},
      component: () => import('../views/NotLogin.vue'),
    },
  ],
})

router.beforeEach((to, from, next) => {
  const store = useMemberStore()
  if (to.meta.requiresAuth && !store.isLogin) {
    next('/notLogin')
  } else {
    next()
  }
})

export default router
