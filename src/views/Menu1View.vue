<template>
  <div>
    <h1>This is an Menu1 page</h1>
    <bar-chart style="width: 150px" />
    <i class="far fa-chart-bar"></i>
  </div>
</template>
<script>
import BarChart from './components/chart/BarChart.vue'
import { GET_MEMBER_INFO } from '@/api/member'
import { mapActions, mapState } from 'pinia'
import { useMemberStore } from '@/stores/member'

export default {
  components: { BarChart },
  computed: {
    ...mapState(useMemberStore, ['getInfo']),
  },
  methods: {
    ...mapActions(useMemberStore, ['setInfo', 'getInfoOne']),
    async memberInfo() {
      const res = await GET_MEMBER_INFO(52)
      console.log(res)
      this.setInfo(res)
    },
  },
}
</script>
