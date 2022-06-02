import { defineStore } from 'pinia'

export const useMemberStore = defineStore('member', {
  state: () => ({
    info: {},
    auth: {},
  }),
  getters: {
    getInfo: (state) => state.info,
    getAuth: (state) => state.auth,
  },
  actions: {
    setInfo(info) {
      this.info = info
    },
    getInfoOne(name) {
      return this.info[name]
    },
    setAuth(auth) {
      this.auth = auth
    },
  },
  persist: {
    enabled: true,
  },
})
