<template>
  <div ref="chart" />
</template>

<script>
import bb, { bar } from 'billboard.js'
export default {
  name: 'BarChart',
  props: {
    columns: {
      type: Array,
      default: () => [
        ['납부', 6],
        ['미납', 6],
      ],
    },
  },
  data() {
    return {
      chart: null,
    }
  },
  watch: {
    columns() {
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
          columns: this.columns,
          type: bar(),
        },
        bar: {
          width: {
            ratio: 5,
          },
        },
        axis: {
          y: {
            tick: {
              stepSize: 1,
            },
          },
        },
        bindto: this.$refs.chart,
      })
    },
  },
}
</script>
