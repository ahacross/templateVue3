<template>
  <div class="fit row justify-start" style="padding: 10px">
    <div class="attendance-label">출석 일자</div>
    <div class="attendance-date">
      <date-picker
        v-model:value="attendance_date"
        date-format="yyyy-MM-dd"
        :on-render-cell="onRenderCell"
      />
    </div>
  </div>
  <div class="fit row justify-between">
    <q-tabs
      v-model="activeTab"
      inline-label
      class="text-grey"
      tab
      active-color="primary"
      indicator-color="primary"
      narrow-indicator
    >
      <q-tab
        v-for="({ name, label }, idx) in tabs"
        :key="idx"
        :name="name"
        :label="label"
      />
    </q-tabs>
  </div>
  <table class="mt10" style="width: 100%">
    <tr>
      <th>이름</th>
      <th>생일</th>
      <th>예배 전</th>
      <th>예배 후</th>
    </tr>
    <tr v-for="(item, idx) in members" :key="idx">
      <td>{{ item.name }}</td>
      <td>
        {{ formatter(item.birthday) }}
      </td>
      <td>
        <q-toggle
          :false-value="'N'"
          :true-value="'Y'"
          color="green"
          v-model="item.before_check"
          @update:model-value="
            (value) => saveAttendance(value, item, 'before_check')
          "
        />
      </td>
      <td>
        <q-toggle
          :false-value="'N'"
          :true-value="'Y'"
          color="green"
          v-model="item.after_check"
          @update:model-value="
            (value) => saveAttendance(value, item, 'after_check')
          "
        />
      </td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <th>
        {{ members.filter(({ before_check: c }) => c === 'Y').length + '명' }}
      </th>
      <th>
        {{ members.filter(({ after_check: c }) => c === 'Y').length + '명' }}
      </th>
    </tr>
  </table>

  <div></div>
</template>
<script>
import { GET_ATTENDANCE_PART, PUT_ATTENDANCE, GET_ENROLL } from '@/api/etc'
import { statusMap, tabs } from '@/plugins/constant'

export default {
  name: 'AttendanceView',
  data() {
    const customTabs = tabs.slice(1)
    return {
      attendance_date: '',
      activeTab: 's',
      tabs: customTabs,
      statusMap,
      members: [],
      enroll: {
        before: 0,
        after: 0,
      },
    }
  },
  computed: {
    filteredMembers() {
      return this.members
    },
  },
  watch: {
    activeTab() {
      this.getMembers()
    },
  },
  mounted() {
    this.attendance_date = this.$date
      .minus(new Date().getDay(), 'd')
      .format('YYYY-MM-DD')
    this.getMembers()
  },
  methods: {
    async getMembers() {
      const res = await GET_ATTENDANCE_PART({
        part: this.activeTab,
        attendance_date: this.attendance_date.split('-').join(''),
      })

      this.members = res.map((row) => {
        row.before_check = row.before_check ? row.before_check : 'N'
        row.after_check = row.after_check ? row.after_check : 'N'
        return row
      })
      await this.getEnroll()
    },
    formatter(value) {
      return value ? this.$date.makeDate(value).format('YYYY-MM-DD') : ''
    },
    onRenderCell({ date, cellType }) {
      if (cellType === 'day') {
        if (date.getDay()) {
          return {
            disabled: true,
          }
        }
      }
    },

    async saveAttendance(value, { member_id }, field) {
      const res = await PUT_ATTENDANCE({
        attendance_date: this.attendance_date.split('-').join(''),
        part: this.activeTab,
        [field]: value,
        member_id,
      })
      console.error(res)
    },
    async getEnroll() {
      const res = await GET_ENROLL({
        attend_date: this.attendance_date.split('-').join(''),
        part: this.activeTab,
      })

      res && console.error(res)
      const length = this.members.length
      this.enroll.before = res ? res.before_count : length
      this.enroll.after = res ? res.after_count : length
    },
  },
}
</script>
<style lang="scss" scoped>
.q-tab {
  padding: 0 3px;
  flex: initial;
}

.attendance-label {
  height: 30px;
  display: flex;
  align-items: center;
}

.attendance-date {
  input {
    height: 30px;
    border: 1px solid #bbb;
    margin-left: 10px;
  }
}

td {
  text-align: center;
}
th {
  background-color: #e8f2fe;
}
</style>
