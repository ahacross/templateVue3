<template>
  <div ref="grid" style="width: 100%"></div>
</template>

<script>
import Grid from 'tui-grid'

export default {
  name: 'tuiGrid',
  props: {
    columns: {
      type: Array,
      default: () => [],
    },
    data: {
      type: Array,
      default: () => [],
    },
    bodyHeight: {
      type: Number,
      default: 300,
    },
  },
  mounted() {
    this.applyTheme()
    this.makeTable()
  },
  watch: {
    data() {
      const grid = this.grid
      grid.setBodyHeight(this.bodyHeight)
      grid.resetData(this.data)
    },
  },
  methods: {
    applyTheme() {
      Grid.applyTheme('striped', {
        grid: {
          text: '#333',
        },
      })
    },
    makeTable() {
      this.grid = new Grid({
        el: this.$refs.grid,
        scrollY: true,
        bodyHeight: this.bodyHeight,
        columns: this.columns,
        data: this.data,
        options: this.options,
      })
    },
  },
}
</script>

<style scoped>
@import 'tui-grid/dist/tui-grid.css';
</style>
