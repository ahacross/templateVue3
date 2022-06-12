<template>
  <div class="row justify-center">
    <table style="width: 100%">
      <tr>
        <th style="width: 20%">이름</th>
        <td>
          <q-input v-model="form.name" clearable />
        </td>
      </tr>
      <tr>
        <th>파트</th>
        <td>
          <q-select
            filled
            v-model="form.part"
            :options="parts"
            emit-value
            map-options
            clearable
            label="파트 선택"
          />
        </td>
      </tr>
      <tr>
        <th>폰 번호</th>
        <td>
          <q-input
            v-model="form.phone"
            type="tel"
            mask="###-####-####"
            placeholder="010-1111-2222"
            clearable
          />
        </td>
      </tr>
      <tr>
        <th>생일</th>
        <td>
          <date-picker v-model:value="form.birthday" />
        </td>
      </tr>
      <tr>
        <th>e-mail</th>
        <td>
          <q-input
            v-model="form.email"
            placeholder="aaa@naver.com"
            type="email"
            clearable
          />
        </td>
      </tr>
      <tr>
        <th>상태</th>
        <td>
          <q-select
            filled
            v-model="form.status"
            :options="statusOptions"
            emit-value
            map-options
            clearable
            label="상태 선택"
          />
        </td>
      </tr>
      <tr>
        <th>성가대<br />등록일</th>
        <td>
          <date-picker v-model:value="form.regi_date" />
        </td>
      </tr>
      <tr>
        <th>비고</th>
        <td>
          <q-input v-model="form.comment" autogrow clearable />
        </td>
      </tr>
    </table>
  </div>

  <q-card-actions class="bg-white text-teal justify-center">
    <q-btn
      rounded
      :size="'md'"
      class="btn-fixed-width"
      color="secondary"
      label="저장"
      style="width: 200px"
      @click="onClose"
    />
  </q-card-actions>
</template>

<script>
import { POST_MEMBER_INSERT, PUT_MEMBER_UPDATE } from '@/api/member'
import { statusMap, parts } from '@/plugins/constant'
export default {
  name: 'MemberPopup',
  inject: ['modal'],
  props: {
    member_id: {
      type: Number,
      default: null,
    },
    birthday: {
      type: String,
      default: '',
    },
    phone: {
      type: String,
      default: '',
    },
    regi_date: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      default: 'Y',
    },
    name: {
      type: String,
      default: '',
    },
    part: {
      type: String,
      default: '',
    },
    email: {
      type: String,
      default: '',
    },
    comment: {
      type: String,
      default: '',
    },
  },
  data() {
    const statusOptions = []
    Array.from(statusMap.entries()).forEach(([key, value]) => {
      statusOptions.push({ label: value, value: key })
    })
    return {
      parts,
      statusOptions,
      form: {
        name: this.name,
        part: this.part,
        phone: this.phone,
        birthday: this.$date.makeDate(this.birthday).format('YYYY-MM-DD'),
        email: this.email,
        regi_date: this.$date.makeDate(this.regi_date).format('YYYY-MM-DD'),
        status: this.status,
        comment: this.comment,
      },
    }
  },
  methods: {
    makeData() {
      const data = { ...this.form }
      data.birthday = this.$date.makeDate(data.birthday).format('YYYYMMDD')
      data.regi_date = this.$date.makeDate(data.regi_date).format('YYYYMMDD')
      return data
    },
    async insertMember() {
      const res = await POST_MEMBER_INSERT(this.makeData())
      if (res.cnt === 1) {
        await this.$alert({ message: '대원이 추가되었습니다.' })
        this.modal.reload = true
      }
    },
    async updateMember() {
      const data = this.makeData()
      data.member_id = this.member_id
      const res = await PUT_MEMBER_UPDATE(data)
      if (res.cnt === 1) {
        await this.$alert({ message: '대원 정보가 수정되었습니다.' })
        this.modal.reload = true
      }
    },
    async onClose() {
      if (this.member_id) {
        await this.updateMember()
      } else {
        await this.insertMember()
      }

      this.modal.open = false
    },
  },
}
</script>

<style scoped>
:deep(.q-card__actions) {
  > .q-btn {
    flex: 1;
    font-size: 30px;
  }
}
</style>
