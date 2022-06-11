<template>
  <div class="row justify-center">
    <table style="width: 100%">
      <tr>
        <th style="width: 20%">부른 날</th>
        <td>
          <date-picker v-model:value="form.singed_date" />
        </td>
      </tr>
      <tr>
        <th>곡 제목</th>
        <td>
          <q-input v-model="form.title" clearable />
        </td>
      </tr>
      <tr>
        <th>부른 영상</th>
        <td>
          <q-input v-model="form.link" clearable />
        </td>
      </tr>
      <tr>
        <th>출처</th>
        <td>
          <q-input v-model="form.source" clearable />
        </td>
      </tr>
      <tr>
        <th>악보자료</th>
        <td>
          <q-input v-model="form.scanning" clearable />
        </td>
      </tr>
      <tr>
        <th>연습</th>
        <td>
          <q-input v-model="form.practice" clearable />
        </td>
      </tr>
      <tr>
        <th>절기</th>
        <td>
          <q-input v-model="form.etc" clearable />
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
import { POST_HISTORY, PUT_HISTORY } from '@/api/etc'
export default {
  name: 'HistoryPopup',
  inject: ['modal'],
  props: {
    singed_date: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      default: '',
    },
    link: {
      type: String,
      default: '',
    },
    source: {
      type: String,
      default: '',
    },
    scanning: {
      type: String,
      default: '',
    },
    practice: {
      type: String,
      default: '',
    },
    etc: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      form: {
        singed_date: this.singed_date
          ? this.$date.makeDate(this.singed_date).toDate()
          : new Date(),
        title: this.title,
        link: this.link,
        source: this.source,
        scanning: this.scanning,
        practice: this.practice,
        etc: this.etc,
      },
    }
  },
  methods: {
    makeData() {
      const data = { ...this.form }
      data.singed_date = this.$date
        .makeDate(data.singed_date)
        .format('YYYY-MM-DD')
      return data
    },
    async insertHistory() {
      const data = this.makeData()
      const res = await POST_HISTORY(data)
      if (res.cnt === 1) {
        await this.$alert({ message: '추가하였습니다.' })
        this.modal.reload = true
      }
    },
    async updateHistory() {
      const data = this.makeData()
      const res = await PUT_HISTORY(data)
      if (res.cnt === 1) {
        await this.$alert({ message: '수정하였습니다.' })
        this.modal.reload = true
      }
    },
    async onClose() {
      if (this.title) {
        await this.updateHistory()
      } else {
        await this.insertHistory()
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
