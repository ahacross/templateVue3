<template>
  <div class="row justify-center">
    <table style="width: 100%">
      <tr>
        <th style="width: 20%">임기년도</th>
        <td>
          <date-picker
            v-model:value="form.year"
            view="years"
            dateFormat="yyyy"
          />
        </td>
      </tr>
      <tr>
        <th>이름</th>
        <td class="row">
          <q-input
            v-model="name"
            clearable
            style="width: 100px; flex: 1"
            @keydown.enter="searchMember"
          />
          <q-btn round color="secondary" icon="search" @click="searchMember" />
          <q-select
            v-model="selectMember"
            style="flex: 1"
            :options="options"
            @update:model-value="onSelect"
            clearable
          />
        </td>
      </tr>
      <tr>
        <th>역할</th>
        <td>
          <q-select
            v-model="form.role"
            :options="roleOptions.slice(1)"
            clearable
          />
        </td>
      </tr>
      <tr>
        <th>임기 기간</th>
        <td><date-picker v-model:value="terms" :range="true" /></td>
      </tr>
      <tr>
        <th>etc</th>
        <td>
          <q-input v-model="form.etc" autogrow clearable />
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
    <q-btn
      v-if="year"
      rounded
      :size="'md'"
      class="btn-fixed-width"
      label="삭제"
      style="width: 50px"
      @click="onDeleteClose"
    />
  </q-card-actions>
</template>

<script>
import { POST_WORKERS, PUT_WORKERS, DELETE_WORKERS } from '@/api/etc'
import { GET_MEMBER_NAME } from '@/api/member'
import { partMap } from '@/plugins/constant'

export default {
  name: 'WorkerPopup',
  inject: ['modal'],
  props: {
    roleOptions: {
      type: Array,
    },
    mname: {
      type: String,
    },
    year: {
      type: Number,
    },
    s_date: {
      type: String,
    },
    e_date: {
      type: String,
    },
    member_id: {
      type: Number,
    },
    role: {
      type: String,
    },
    etc: {
      type: String,
    },
  },
  data() {
    let terms
    if (this.member_id) {
      terms = [
        this.$date.makeDate(this.s_date).format('YYYY-MM-DD'),
        this.$date.makeDate(this.e_date).format('YYYY-MM-DD'),
      ]
    }
    return {
      options: [],
      name: this.mname,
      terms,
      members: [],
      selectMember: '',
      form: {
        year: `${this.year}`,
        member_id: this.member_id,
        role: this.role,
        e_date: '',
        s_date: '',
        etc: this.etc,
      },
    }
  },
  methods: {
    async searchMember() {
      const name = this.name
      if (name) {
        const res = await GET_MEMBER_NAME(name)
        this.members = res
        this.options = res.map(
          ({ name, part }) => `${name}(${partMap.get(part)})`
        )
      }
    },
    onSelect(val) {
      const vName = val.split('(')[0]
      this.form.member_id = this.members.filter(
        ({ name }) => name === vName
      )[0].member_id
    },
    makeData() {
      const data = { ...this.form }
      const datePattern = 'YYYYMMDD'
      data.s_date = this.$date.makeDate(this.terms[0]).format(datePattern)
      data.e_date = this.$date.makeDate(this.terms[1]).format(datePattern)
      return data
    },
    async insertHistory() {
      const data = this.makeData()
      const res = await POST_WORKERS(data)
      if (res.cnt === 1) {
        await this.$alert({ message: '임원이 추가 되었습니다.' })
        this.modal.reload = true
      }
    },
    async updateHistory() {
      const data = this.makeData()
      const res = await PUT_WORKERS(data)
      if (res.cnt === 1) {
        await this.$alert({ message: '임원 정보가 수정 되었습니다.' })
        this.modal.reload = true
      }
    },
    async onClose() {
      if (this.year) {
        await this.updateHistory()
      } else {
        await this.insertHistory()
      }

      this.modal.open = false
    },
    async onDeleteClose() {
      const data = this.makeData()
      const res = await DELETE_WORKERS(data)

      if (res.cnt === 1) {
        await this.$alert({ message: '임원 정보가 삭제 되었습니다.' })
        this.modal.reload = true
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
