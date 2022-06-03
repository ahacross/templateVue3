<template>
  <q-layout view="lHh lpR lfr">
    <q-header reveal elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          {{ title }}
        </q-toolbar-title>
        <span>로그인</span>
        <span>로그아웃</span>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" bordered>
      <Menu />
    </q-drawer>

    <q-page-container :class="{ dimmed: leftDrawerOpen }">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import Menu from './views/menu.vue'
import { GET_IS_MANAGER } from './api/member'
import { mapActions } from 'pinia'
import { useMemberStore } from '@/stores/member'
export default {
  components: { Menu },
  provide() {
    return {
      toggleLeftDrawer: this.toggleLeftDrawer,
    }
  },
  data: () => ({
    leftDrawerOpen: false,
    title: import.meta.env.VITE_TITLE,
  }),
  mounted() {
    this.userAuth()
  },
  methods: {
    ...mapActions(useMemberStore, ['setAuth']),
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen
    },
    async userAuth() {
      const res = await GET_IS_MANAGER()
      this.setAuth(res.role)
    },
  },
}
</script>
<style>
@import 'assets/base.css';
</style>
