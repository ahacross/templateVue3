<template>
  <div class="row justify-center">
    <table>
      <tr>
        <th>이름</th>
        <td>
          <q-input v-model="form.name" maxlength="10" clearable />
        </td>
      </tr>
      <tr>
        <th>폰 번호</th>
        <td>
          <q-input v-model="form.phone" mask="###-####-####" clearable />
        </td>
      </tr>
      <tr>
        <th>e-mail</th>
        <td>
          <q-input v-model="form.email" type="email" clearable />
        </td>
      </tr>
      <tr>
        <th>생일</th>
        <td>
          <date-picker v-model:value="form.birthday" />
        </td>
      </tr>
    </table>
  </div>
  <div class="q-pa-md q-gutter-sm" style="text-align: center">
    <q-btn
      :ripple="{ center: true }"
      color="secondary"
      no-caps
      label="수정"
      @click="onSubmit"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useMemberStore } from '@/stores/member'
import { GET_MEMBER_INFO, PUT_MEMBER_UPDATE } from '@/api/member'

export default {
  data: () => ({
    form: {
      name: '',
      phone: '',
      email: '',
      birthday: null,
    },
  }),
  computed: {
    ...mapState(useMemberStore, ['getInfo']),
  },
  mounted() {
    this.initData()
  },
  methods: {
    ...mapActions(useMemberStore, ['setInfo']),
    initData() {
      const { name, phone, email, birthday } = this.getInfo
      this.form.name = name
      this.form.phone = phone
      this.form.email = email
      this.form.birthday = this.$date.makeDate(birthday).format('YYYY-MM-DD')
    },
    async onSubmit() {
      const { member_id } = this.getInfo
      const data = { ...this.form, member_id }
      data.birthday = this.$date.makeDate(data.birthday).format('YYYYMMDD')
      const res = await PUT_MEMBER_UPDATE(data)
      if (res.cnt === 1) {
        await this.updateInfo()
        await this.$alert({ message: '수정되었습니다.' })
      }
    },
    async updateInfo() {
      this.setInfo(await GET_MEMBER_INFO())
    },
  },
}
</script>
<style scoped lang="scss">
table {
  width: 90%;
  margin-bottom: 20px;
}
</style>
