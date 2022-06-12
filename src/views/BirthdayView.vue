<template>
  <div>
    <h1>This is an Menu2 page</h1>
    <GaugeChart :rate="rate" />
  </div>
</template>
<script>
import GaugeChart from './components/chart/GaugeChart.vue'
export default {
  components: { GaugeChart },
  data() {
    return {
      rate: '16%',
    }
  },
  methods: {
    newRate(txt) {
      this.rate = txt
    },
  },
}
</script>
