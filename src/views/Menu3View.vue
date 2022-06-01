<template>
  <div>
    <h1>This is an Menu3 page</h1>
    <TuiGrid style="width: 500px" />
    <datepicker v-model="date" />
    <ModalDialog
      ref="modal1"
      title="Alert"
      :full-height="true"
      :buttons="['야호', '오랑캐', '나와라']"
      @onClick="onClickModal"
    >
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus
      sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam,
      ea at omnis vel numquam exercitationem aut, natus minima, porro labore.
    </ModalDialog>
    <q-btn @click="open">나와라 팝업!</q-btn>
  </div>
</template>
<script>
import TuiGrid from './components/grid/TuiGrid.vue'
import Datepicker from 'vue3-datepicker'
// import ModalPopup from './components/modal/ModalVfm.vue'
import ModalDialog from './components/modal/ModalDialog.vue'
export default {
  components: { TuiGrid, Datepicker, ModalDialog },
  data() {
    return {
      date: new Date(),
      showModal: false,
    }
  },
  methods: {
    open() {
      this.$refs.modal1.open()
    },
    async alert() {
      const res = await this.$alert({
        title: '까꿍',
        message: '오랑캐 나와라~~2',
      })
      console.log(res)
    },
    async confirm() {
      const res = await this.$confirm({
        title: '까꿍',
        message: '오랑캐 나와라~~2',
      })
      console.log(res)
    },
    onClickModal(res) {
      console.log(res)
    },
  },
}
</script>
