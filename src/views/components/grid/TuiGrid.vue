<template>
  <div ref="grid"></div>
</template>

<script>
import Grid from 'tui-grid'

export default {
  name: 'tuiGrid',
  props: {
    columns: {
      type: Array,
      default: () => [
        {
          header: 'ID',
          name: 'id',
        },
        {
          header: 'CITY',
          name: 'city',
          editor: 'text',
        },
        {
          header: 'COUNTRY',
          name: 'country',
        },
      ],
    },
    data: {
      type: Array,
      default: () => [
        {
          id: '10012',
          city: 'Seoul',
          country: 'South Korea',
        },
        {
          id: '10013',
          city: 'Tokyo',
          country: 'Japan',
        },
        {
          id: '10014',
          city: 'London',
          country: 'England',
        },
        {
          id: '10015',
          city: 'Ljubljana',
          country: 'Slovenia',
        },
        {
          id: '10016',
          city: 'Reykjavik',
          country: 'Iceland',
        },
      ],
    },
  },
  mounted() {
    this.makeTable()
  },
  methods: {
    makeTable() {
      this.grid = new Grid({
        el: this.$refs.grid,
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
