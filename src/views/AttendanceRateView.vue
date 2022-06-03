<template>
  <h1 class="center">성가대 출석 현황</h1>
  <div class="row justify-center">
    <div class="flex1 borderRight">
      <div class="center h4 mb20">예배 전</div>
      <GaugeChart title="4주" :rate="before.rate4" class="mb20" />
      <GaugeChart title="12주" :rate="before.rate12" class="mb20" />
      <GaugeChart title="올해" :rate="before.rate1y" class="mb20" />
    </div>
    <div class="flex1">
      <div class="center h4 mb20">예배 후</div>
      <GaugeChart title="4주" :rate="after.rate4" class="mb20" />
      <GaugeChart title="12주" :rate="after.rate12" class="mb20" />
      <GaugeChart title="올해" :rate="after.rate1y" class="mb20" />
    </div>
  </div>

  <h4 class="center">성가대 회비 납부</h4>
  <div class="row justify-center">
    <BarChart :columns="dues" style="width: 150px" />
  </div>
</template>
<script>
import GaugeChart from './components/chart/GaugeChart.vue'
import BarChart from './components/chart/BarChart.vue'
import { mapActions, mapState } from 'pinia'
import { useMemberStore } from '@/stores/member'
import { GET_MEMBER_INFO } from '@/api/member'
import { GET_ATTENDANCE_RATES, GET_DUES_YEAR } from '../api/member'

export default {
  name: 'AttendanceRateView',
  components: { GaugeChart, BarChart },
  data: () => ({
    before: {
      rate4: '',
      rate12: '',
      rate1y: '',
    },
    after: {
      rate4: '',
      rate12: '',
      rate1y: '',
    },
    dues: [],
  }),
  computed: {
    ...mapState(useMemberStore, ['getInfo']),
  },
  mounted() {
    this.setRatesAttendance()
    this.setDuesYear()
  },
  methods: {
    ...mapActions(useMemberStore, ['setInfo', 'getInfoOne']),
    async memberInfo() {
      const res = await GET_MEMBER_INFO(52)
      this.setInfo(res)
    },
    async setRatesAttendance() {
      let res = await GET_ATTENDANCE_RATES()
      const keys = Object.keys(this.before)
      for (const [
        index,
        { before_rate: beforeRate, after_rate: afterRate },
      ] of res.flat().entries()) {
        this.before[keys[index]] = beforeRate
        this.after[keys[index]] = afterRate
      }
    },
    async setDuesYear() {
      const res = await GET_DUES_YEAR()
      const { dues_cnt: dues = 0 } = res || {}
      this.dues = [
        ['납부', dues],
        ['미납', 12 - dues],
      ]
    },
  },
}
</script>

<style scoped>
.borderRight {
  border-right: 1px solid;
}

.h4 {
  font-size: 1.5rem;
  font-weight: 400;
}
</style>
