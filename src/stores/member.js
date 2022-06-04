import { defineStore } from 'pinia'

export const useMemberStore = defineStore('member', {
  state: () => ({
    info: {},
    auth: '',
  }),
  getters: {
    getInfo: (state) => state.info,
    getRoleGroup(state) {
      const auth = state.auth?.split('(').first()
      let roleGroup

      if (['서버관리자', '임원'].includes(auth)) {
        roleGroup = 'SuperAdmin'
      } else if (['파트장'].includes(auth)) {
        roleGroup = 'Admin'
      }
      return roleGroup
    },
    isLogin: (state) => state.info?.member_id,
  },
  actions: {
    setInfo(info) {
      this.info = info
    },
    getInfoOne(name) {
      return this?.info[name]
    },
    setAuth(auth) {
      this.auth = auth
    },
  },
  persist: {
    enabled: true,
  },
})
