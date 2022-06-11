<template>
  <div class="fit row justify-between" style="padding: 10px">
    <div class="row justify-start">
      <q-select
        filled
        v-model="year"
        :options="yearOptions"
        label="임기년도"
        style="width: 110px; margin-right: 10px"
      />
      <q-select
        v-model="role"
        :options="roleOptions"
        label="역할"
        style="flex: 1; min-width: 100px"
      />
    </div>
    <q-btn
      padding="xs"
      color="secondary"
      icon="add"
      style="width: 50px"
      @click="openModalInsert"
    />
  </div>
  <div ref="table">
    <tui-grid
      ref="grid"
      :columns="columns"
      :data="filteredWorkers"
      :body-height="bodyHeight"
    />
  </div>
  <modal-dialog
    v-model:open="modalShow"
    :title="`임원 ${modalTitle}`"
    full-width
    @reload="getWorkers"
  >
    <PopupWorker v-bind="workerInfo" />
  </modal-dialog>
</template>
<script>
import { GET_WORKERS } from '@/api/etc'
import { partMap } from '@/plugins/constant'
import PopupWorker from './popup/WorkerPopup.vue'

export default {
  name: 'WorkerView',
  components: { PopupWorker },
  data() {
    return {
      columns: [
        {
          header: '역할',
          name: 'role',
          align: 'center',
          formatter({ value, row }) {
            return `${value} ${
              value === '파트장' ? `(${partMap.get(row.part)})` : ''
            }`
          },
        },
        {
          header: '이름',
          name: 'name',
          align: 'center',
        },
        {
          header: '임기년도',
          name: 'year',
          align: 'center',
          width: 70,
          formatter({ value }) {
            return `${value} 년`
          },
        },
        {
          header: '임기 상태',
          name: 'status',
          align: 'center',
          formatter: function ({ value }) {
            return `임기 ${value === 'Y' ? '중' : '종료'}`
          },
        },
      ],
      workers: [],
      bodyHeight: 0,
      year: '',
      role: '전체',
      modalShow: false,
      workerInfo: null,
      modalTitle: '',
    }
  },
  computed: {
    roleOptions() {
      const roles = this.makeOptions('role')
      return ['전체', ...roles.filter((name) => name !== '임원(회계)')]
    },
    yearOptions() {
      return this.makeOptions('year')
    },
    filteredWorkers() {
      const sYear = this.year
      const sRole = this.role === '전체' ? '' : this.role
      const workers = this.workers.filter(({ year }) => sYear === year)

      if (sRole) {
        return workers.filter(({ role }) => sRole === role)
      }
      return workers
    },
  },
  watch: {
    yearOptions() {
      this.year = Math.max(...this.yearOptions)
    },
  },
  mounted() {
    this.bodyHeight = innerHeight - this.$refs.table.offsetTop - 42
    this.getWorkers()

    this.$refs.grid.grid.on('click', (e) => {
      const { columnName, targetType, instance, rowKey } = e
      if (columnName === 'name' && targetType === 'cell') {
        const { name, year, s_date, e_date, role, member_id, etc } =
          instance.getRow(rowKey)
        this.workerInfo = {
          mname: name,
          year,
          s_date,
          e_date,
          role,
          member_id,
          etc,
        }
        this.openModalUpdate()
      }
    })
  },
  methods: {
    async getWorkers() {
      const res = await GET_WORKERS()
      this.workers = res
    },
    openModalInsert() {
      this.modalTitle = '추가'
      this.workerInfo = { roleOptions: this.roleOptions }
      this.modalShow = true
    },
    openModalUpdate() {
      this.modalTitle = '수정'
      this.workerInfo = { ...this.workerInfo, roleOptions: this.roleOptions }
      this.modalShow = true
    },
    makeOptions(fieldName) {
      const set = new Set()
      for (const worker of this.workers) {
        set.add(worker[fieldName])
      }
      return Array.from(set)
    },
  },
}
</script>

<style></style>
