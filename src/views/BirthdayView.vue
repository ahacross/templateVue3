<template>
  <q-select
    filled
    v-model="month"
    :options="monthOptions"
    stack-label
    label="월 선택"
    @update:model-value="getBirthday"
  />
  <q-select
    filled
    v-model="state"
    multiple
    :options="statusOptions"
    use-chips
    stack-label
    label="상태"
  />
  <div class="q-pa-md">
    <q-list bordered separator>
      <q-item
        v-for="(item, idx) in filteredMembers"
        :key="idx"
        clickable
        v-ripple
      >
        <q-item-section class="birthday-list">
          <span>{{ `${item.name} (${partMap.get(item.part)})` }}</span>
          <span>{{
            `${$date.makeDate(item.birthday).format('YYYY년 M월 D일')}`
          }}</span>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>
<script>
import { partMap, statusMap } from '@/plugins/constant'
import { GET_BIRTHDAY } from '@/api/etc'
export default {
  data() {
    const reverseStatus = {}
    Array.from(statusMap.entries()).forEach(([key, value]) => {
      reverseStatus[value] = key
    })
    return {
      partMap,
      month: `${this.$date.makeDate().format('M')} 월`,
      monthOptions: [...Array(12)].map((_, i) => `${i + 1} 월`),
      state: ['활동중'],
      reverseStatus,
      statusOptions: Array.from(statusMap.values()),
      members: [],
    }
  },
  computed: {
    filteredMembers() {
      const statuses = this.state.map((key) => this.reverseStatus[key])
      return this.members.filter(({ status }) => statuses.includes(status))
    },
  },
  mounted() {
    this.getBirthday()
  },
  methods: {
    async getBirthday() {
      const res = await GET_BIRTHDAY({
        birthday: String(this.month.split(' ')[0]).padStart(2, '0'),
      })
      console.log(res)
      this.members = res.sort(this.sortBirthday('birthday'))
    },

    sortBirthday(property, desc) {
      const sortOrder = desc ? 1 : -1

      return function (a, b) {
        let tempAa = Number(a[property].substring(4))
        let tempBb = Number(b[property].substring(4))
        let returnValue = 0

        if (tempAa > tempBb) {
          returnValue = -1
        } else if (tempAa < tempBb) {
          returnValue = 1
        } else {
          const tempProperty = 'name'
          tempAa = a[tempProperty]
          tempBb = b[tempProperty]
          returnValue = tempAa > tempBb ? -1 : tempAa < tempBb ? 1 : 0
        }

        return returnValue * sortOrder
      }
    },
  },
}
</script>
<style scoped lang="scss">
.label {
  height: 30px;
  display: flex;
  align-items: center;
}
input {
  width: 50px;
  text-align: right;
  height: 30px;
  border: 1px solid #bbb;
  margin-left: 10px;
}

.birthday-list {
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
</style>
