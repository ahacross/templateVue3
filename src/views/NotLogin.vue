<template>
  <div></div>
</template>
<script>
import { GET_LOGIN } from '@/api/member'
import { mapActions } from 'pinia/dist/pinia'
import { useMemberStore } from '@/stores/member'

export default {
  name: 'NotLogin',
  data() {
    return {}
  },
  async mounted() {
    const res = await this.inputPhoneNumber()
    if (res) {
      await this.login(res)
    }
  },
  methods: {
    ...mapActions(useMemberStore, ['setInfo']),
    async inputPhoneNumber() {
      const res = await this.$prompt({
        message: '로그인은 위해 휴대폰 번호가 필요합니다.',
      })

      if (res) {
        if (/^[\d]{10,11}$/.test(res)) {
          return res.replace(/^(01[\d])-?([0-9]{3,4})-?([0-9]{4})$/, '$1-$2-$3')
        } else {
          return await this.inputPhoneNumber()
        }
      }
    },
    async login(phone) {
      const res = await GET_LOGIN(phone)
      const info = res.first()
      this.setInfo(info)
      this.$saveId(info.member_id)
      location.href = '/'
    },
  },
}
</script>
