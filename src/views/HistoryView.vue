<template>
  <div class="fit row justify-between" style="padding: 10px">
    <q-input filled v-model="search" placeholder="검색" clearable>
      <template v-slot:before>
        <q-icon name="search" />
      </template>
    </q-input>
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
      :data="filteredData"
      :body-height="bodyHeight"
    />
  </div>
  <modal-dialog
    v-model:open="modalShow"
    :title="`부른 곡 ${historyInfo ? '수정' : '추가'}`"
    full-width
    @reload="getHistoryInfo"
  >
    <PopupHistory v-bind="historyInfo" />
  </modal-dialog>
</template>
<script>
import { GET_HISTORY } from '@/api/etc'
import { mapActions, mapState } from 'pinia'
import { useMemberStore } from '@/stores/member'
import PopupHistory from './popup/HistoryPopup.vue'

export default {
  name: 'HistoryView',
  components: { PopupHistory },
  data() {
    return {
      search: '',
      columns: [
        {
          header: '부른 날짜',
          name: 'singed_date',
          width: 90,
        },
        {
          header: '제목',
          name: 'title',
        },
        {
          header: '부른 영상',
          name: 'link',
          width: 70,
          formatter: function ({ value }) {
            return value ? `<a href="${value}" target="_blank">링크</a>` : ''
          },
        },
        {
          header: '연습',
          name: 'practice',
          width: 30,
          formatter: this.practiceFormatter,
        },
      ],
      historyData: [],
      part: this.getInfoOne('part'),
      bodyHeight: 0,
      modalShow: false,
      historyInfo: null,
    }
  },
  computed: {
    ...mapState(useMemberStore, {
      roleGroup: 'getRoleGroup',
    }),
    filteredData() {
      if (this.search) {
        return this.historyData.filter(
          ({ title }) => title && title.indexOf(this.search) > -1
        )
      } else {
        return this.historyData
      }
    },
  },
  mounted() {
    this.bodyHeight = innerHeight - this.$refs.table.offsetTop - 42
    this.getHistoryInfo()

    if (['SuperAdmin', 'Admin'].includes(this.roleGroup)) {
      this.$refs.grid.grid.on('click', this.gridClick)
    }
    console.log(this.roleGroup)
  },
  methods: {
    ...mapActions(useMemberStore, ['getInfoOne']),
    async getHistoryInfo() {
      const res = await GET_HISTORY()
      this.historyData = res
    },
    gridClick(e) {
      const { columnName, targetType, instance, rowKey } = e
      if (columnName === 'title' && targetType === 'cell') {
        const { singed_date, title, link, source, scanning, practice, etc } =
          instance.getRow(rowKey)
        this.historyInfo = {
          singed_date,
          title,
          link,
          source,
          scanning,
          practice,
          etc,
        }
        this.openModalUpdate()
      }
    },
    practiceFormatter({ value }) {
      if (value) {
        const extStr =
          value.indexOf('.mp4') > -1
            ? `practice.html?url=${value}&part=`
            : `${value}?part=`
        return `<a href="https://ahacross.me/practice/${extStr}${this.part}" target="_blank">연습</a>`
      } else {
        return ''
      }
    },
    openModalInsert() {
      this.historyInfo = null
      this.modalShow = true
    },
    openModalUpdate() {
      this.modalShow = true
    },
  },
}
</script>

<style></style>
