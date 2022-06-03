<template>
  <!-- drawer content -->
  <div v-if="member.name" class="user-name">
    <q-icon name="far fa-smile" style="font-size: 1.5em; margin-right: 5px" />
    {{ member.name }} 님 입장
  </div>
  <div v-else class="user-name">로그인 부탁드려요.</div>
  <q-separator />
  <q-separator />
  <template v-for="(menus, idx) in filteredMenu" :key="idx">
    <q-list class="menu-size">
      <q-item
        clickable
        v-ripple
        :active="activeMenu === menu.pathName"
        v-for="menu in menus"
        :key="menu.title"
        @click="menuClick(menu.pathName)"
      >
        <q-item-section avatar>
          <q-icon :name="menu.icon" color="blue-grey-6" text-color="white" />
        </q-item-section>
        <q-item-section>{{ menu.title }}</q-item-section>
      </q-item>
    </q-list>
    <q-separator />
  </template>
  <q-separator />
</template>

<script>
import { mapState } from 'pinia'
import { useMemberStore } from '@/stores/member'
export default {
  name: 'MenuNavi',
  inject: ['toggleLeftDrawer'],
  data: () => ({
    userMenu: [
      {
        title: '출석현황',
        pathName: '/',
        icon: 'assessment',
      },
      {
        title: '개인정보 수정',
        pathName: 'edit',
        icon: 'account_circle',
      },
      {
        title: '부른 찬양',
        pathName: 'menu3',
        icon: 'library_books',
      },
      {
        title: '기타 정보',
        pathName: 'about',
        icon: 'content_paste',
      },
    ],
    manageMenu: [
      {
        title: '임원 명단',
        pathName: 'menu3',
        icon: 'thumb_up',
      },
      {
        title: '성가대원 관리',
        pathName: 'menu3',
        icon: 'manage_accounts',
      },
      {
        title: '출석 관리',
        pathName: 'menu3',
        icon: 'how_to_reg',
      },
      {
        title: '생일자 관리(월별) ',
        pathName: 'menu3',
        icon: 'cake',
      },
      {
        title: '회비 관리',
        pathName: 'menu3',
        icon: 'attach_money',
      },
    ],
    filteredMenu: [],
    activeMenu: '',
  }),
  computed: {
    ...mapState(useMemberStore, {
      member: 'getInfo',
      roleGroup: 'getRoleGroup',
    }),
  },
  watch: {
    roleGroup() {
      this.setMenu()
    },
  },
  mounted() {
    this.setMenu()
  },
  methods: {
    setMenu() {
      let menu = [this.userMenu]
      if (['SuperAdmin', 'Admin'].includes(this.roleGroup)) {
        menu = [this.userMenu, this.manageMenu]
      }
      this.filteredMenu = menu
    },
    menuClick(path) {
      this.toggleLeftDrawer()
      this.$move(path)
      this.activeMenu = path
    },
  },
}
</script>
<style scoped lang="scss">
.user-name {
  font-size: 20px;
  padding: 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.menu-size {
  font-size: 16px;
  & :deep(.q-item) > .q-item__section--thumbnail:first-child {
    margin-left: 20px;
  }
}
</style>
