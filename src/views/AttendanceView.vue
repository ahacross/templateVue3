<template>
  <div class="fit row justify-between" style="padding: 10px">
    <q-tabs
      v-model="activeTab"
      inline-label
      class="text-grey"
      tab
      active-color="primary"
      indicator-color="primary"
      narrow-indicator
    >
      <q-tab
        v-for="({ name, label }, idx) in tabs"
        :key="idx"
        :name="name"
        :label="label"
      />
    </q-tabs>
  </div>
  <div ref="table">
    <tui-grid
      :columns="columns"
      :data="filteredMembers"
      :body-height="bodyHeight"
      :summary="makeSummary()"
      :on-click="gridClick"
    />
  </div>
  <modal-dialog
    v-model:open="modalShow"
    :title="`성가대원 ${modalTitle}`"
    full-width
    @reload="getMembers"
  >
    <PopupMember v-bind="memberInfo" />
  </modal-dialog>
</template>
<script>
import { GET_MEMBER_PART } from '@/api/member'
import { statusMap, tabs } from '@/plugins/constant'
import PopupMember from './popup/MemberPopup.vue'

export default {
  name: 'MembersView',
  components: { PopupMember },
  data() {
    const reverseStatus = {}
    Array.from(statusMap.entries()).forEach(([key, value]) => {
      reverseStatus[value] = key
    })
    return {
      activeTab: 's',
      tabs,
      columns: [
        {
          header: '이름',
          name: 'name',
          align: 'center',
        },
        {
          header: '상태',
          name: 'status',
          align: 'center',
          formatter({ value }) {
            return statusMap.get(value)
          },
        },
        {
          header: '마지막 출석일',
          name: 'last_attend',
          align: 'center',
          formatter: this.formatter,
        },
      ],
      members: [],
      bodyHeight: 0,
      state: ['활동중'],
      reverseStatus,
      statusOptions: Array.from(statusMap.values()),
      modalShow: false,
      modalTitle: '',
      memberInfo: null,
    }
  },
  computed: {
    filteredMembers() {
      const statuses = this.state.map((key) => this.reverseStatus[key])
      return this.members.filter(({ status }) => statuses.includes(status))
    },
  },
  watch: {
    activeTab() {
      this.getMembers()
    },
  },
  mounted() {
    this.bodyHeight = innerHeight - this.$refs.table.offsetTop - 42 - 25
    this.getMembers()
  },
  methods: {
    async getMembers() {
      const res = await GET_MEMBER_PART(this.activeTab)
      this.members = res
    },
    gridClick(e) {
      const { columnName, targetType, instance, rowKey } = e
      if (columnName === 'name' && targetType === 'cell') {
        const {
          birthday,
          name,
          email,
          part,
          phone,
          regi_date,
          status,
          member_id,
          comment,
        } = instance.getRow(rowKey)
        this.memberInfo = {
          birthday,
          name,
          email,
          part,
          phone,
          regi_date,
          status,
          member_id,
          comment,
        }
        this.openModalUpdate()
      }
    },
    formatter({ value }) {
      let result = ''
      if (value) {
        const lastDate = this.$date.makeDate(value).toDate()
        const weekCnt = lastDate.getWeekState()
        const colorClass =
          weekCnt < 4 ? 'green' : weekCnt < 12 ? 'orange' : 'red'
        result = `<div class="attendState ${colorClass}">${lastDate.format(
          'yyyy년 MM월 dd일'
        )}</div>`
      }
      return result
    },
    makeSummary() {
      return {
        height: 25,
        columnContent: {
          name: {
            template(valueMap) {
              return `재적수: ${valueMap.cnt}`
            },
          },
        },
      }
    },
    openModalInsert() {
      this.modalTitle = '추가'
      this.memberInfo = null
      this.modalShow = true
    },
    openModalUpdate() {
      this.modalTitle = '수정'
      this.modalShow = true
    },
  },
}
</script>
<style scoped>
.q-tab {
  padding: 0 3px;
  flex: initial;
}
</style>
