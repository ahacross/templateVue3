<template>
  <q-layout view="lHh lpR lfr">
    <q-header reveal elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          {{ title }}
        </q-toolbar-title>
        <q-input
          v-model="text"
          color="white"
          outlined
          dense
          clearable
          placeholder="Search"
        >
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" bordered>
      <!-- drawer content -->
      <q-list separator>
        <q-item
            clickable
            v-for="menu in menus"
            :key="menu.title"
            @click="menuClick(menu.pathName)"
        >
          <q-item-section>
            <q-item-label>{{ menu.title }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container :class="{ dimmed: leftDrawerOpen }">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from 'vue'
export default {
  setup() {
    return {
      leftDrawerOpen: ref(false),
      title: '놀이터',
      menus: [
        {
          title: 'Single line item',
          pathName: 'menu1',
        },
        {
          title: 'Item with caption',
          pathName: 'menu2',
        },
        {
          title: 'OVERLINE',
          pathName: 'menu3',
        },
      ],
      text: ref(''),
    }
  },
  methods: {
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen
    },
    menuClick(path) {
      this.toggleLeftDrawer()
      this.$move(path)
    },
  },
}
</script>
<style scoped>
@import 'assets/base.css';
</style>
