import { createRouter, createWebHistory } from 'vue-router'

import { useMemberStore } from '../stores/member'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: { requiresAuth: true, title: '내 출석 현황' },
      component: () => import('../views/AttendanceRateView.vue'),
    },
    {
      path: '/edit',
      name: 'edit',
      meta: { requiresAuth: true, title: '개인정보 수정' },
      component: () => import('../views/UserInfoView.vue'),
    },
    {
      path: '/history',
      name: 'history',
      meta: { requiresAuth: true, title: '부른 찬양' },
      component: () => import('../views/HistoryView.vue'),
    },
    {
      path: '/etc',
      name: 'etc',
      meta: { requiresAuth: true, title: '기타 정보들' },
      component: () => import('../views/EtcView.vue'),
    },
    {
      path: '/worker',
      name: 'worker',
      meta: { requiresAuth: true },
      component: () => import('../views/WorkerView.vue'),
    },
    {
      path: '/members',
      name: 'members',
      meta: { requiresAuth: true, title: '대원관리' },
      component: () => import('../views/MembersView.vue'),
    },
    {
      path: '/attendance',
      name: 'attendance',
      meta: { requiresAuth: true, title: '출석관리' },
      component: () => import('../views/AttendanceView.vue'),
    },
    {
      path: '/birthday',
      name: 'birthday',
      meta: { requiresAuth: true, title: '생일자(월별)' },
      component: () => import('../views/BirthdayView.vue'),
    },
    {
      path: '/dues',
      name: 'dues',
      meta: { requiresAuth: true, title: '회비관리' },
      component: () => import('../views/DuesView.vue'),
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
