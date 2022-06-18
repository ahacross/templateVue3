<template>
  <div ref="grid" />
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
    summary: {
      type: Object,
      default: null,
    },
    onClick: {
      type: Function,
      default: null,
    },
  },
  mounted() {
    this.applyTheme()
    this.makeTable()
  },
  watch: {
    data() {
      const grid = this.grid
      grid.destroy()
      this.makeTable()
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
      const options = {
        el: this.$refs.grid,
        scrollY: true,
        bodyHeight: this.bodyHeight,
        columns: this.columns,
        data: this.data,
      }
      if (this.summary) {
        options.summary = this.summary
      }

      this.grid = new Grid(options)

      if (this.onClick) {
        this.grid.on('click', this.onClick)
      }
    },
  },
}
</script>

<style scoped>
@import 'tui-grid/dist/tui-grid.css';
</style>
