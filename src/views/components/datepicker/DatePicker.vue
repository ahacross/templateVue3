<template>
  <input ref="picker" v-model="date" readonly />
</template>

<script>
import AirDatepicker from 'air-datepicker'
// import localeKo from './localeKo'
import localeEn from 'air-datepicker/locale/en'
import 'air-datepicker/air-datepicker.css'

export default {
  name: 'DatePicker',
  props: {
    view: {
      type: String,
      default: 'days',
      validator: (n) => ['days', 'months', 'years'].includes(n),
    },
    dateFormat: {
      type: String,
      default: 'yyyy-MM-dd',
    },
    range: {
      type: Boolean,
      default: false,
    },
    value: {
      type: [String, Array],
    },
    onRenderCell: {
      type: Function,
      default: null,
    },
  },
  data() {
    return {
      picker: null,
      date: '',
    }
  },
  watch: {
    value() {
      this.picker.selectDate(this.value)
    },
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const options = {
        locale: localeEn,
        autoClose: true,
        dateFormat: this.dateFormat,
        navTitles: {
          days: '<i>yyyy</i> <i>MMMM</i>',
          months: '<i>yyyy</i>',
        },
        onSelect: ({ formattedDate }) => {
          this.date = formattedDate
          this.$emit('update:value', formattedDate)
        },
      }
      if (this.view !== 'days') {
        options.view = this.view
        options.minView = this.view
      }

      this.range && (options.range = this.range)

      if (this.value) {
        if (Array.isArray(this.value)) {
          options.selectedDates = [...this.value]
        } else {
          options.selectedDates = [this.value]
        }
      }

      if (this.onRenderCell) {
        options.onRenderCell = this.onRenderCell
      }

      this.picker = new AirDatepicker(this.$refs.picker, options)
    },
  },
}
</script>
<style lang="scss">
.air-datepicker-global-container {
  z-index: 10000;
}
</style>
<style scoped>
input {
  border: none;
  border-bottom: 1px solid #c2c2c2;
  height: 45px;
  width: 100%;
}
</style>
