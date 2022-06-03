<template>
  <div ref="chart" />
</template>

<script>
import bb, { gauge } from 'billboard.js'
export default {
  name: 'GaugeChart',
  props: {
    title: {
      type: String,
      default: '12주간 출석률',
    },
    rate: {
      type: String,
      default: '15%',
    },
  },
  data() {
    return {
      chart: null,
    }
  },
  watch: {
    rate() {
      this.chart.destroy()
      this.$nextTick(this.init)
    },
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.chart = bb.generate({
        data: {
          columns: [[this.title, Number(this.rate.replace(/[^\d]/g, ''))]],
          type: gauge(),
        },
        color: {
          pattern: ['#FF0000', '#F97600', '#F6C600', '#60B044'],
          threshold: {
            values: [25, 50, 75, 100],
          },
        },
        bindto: this.$refs.chart,
      })
    },
  },
}
</script>
<style scoped>
.bb :deep(text) {
  font-size: 16px;
}
</style>
