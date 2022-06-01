<template>
  <vue-final-modal
    v-model="showModal"
    classes="modal-container"
    content-class="modal-content"
    :lock-scroll="lockScroll"
    :hide-overlay="hideOverlay"
    :click-to-close="clickToClose"
    :esc-to-close="escToClose"
    :prevent-click="preventClick"
    :drag="drag"
    :resize="resize"
  >
    <slot />
  </vue-final-modal>
</template>

<script>
export default {
  name: 'ModalVfm',
  props: {
    clickToClose: {
      type: Boolean,
      default: false,
    },
    escToClose: {
      type: Boolean,
      default: false,
    },
    lockScroll: {
      type: Boolean,
      default: true,
    },
    hideOverlay: {
      type: Boolean,
      default: false,
    },
    preventClick: {
      type: Boolean,
      default: false,
    },
    drag: {
      type: Boolean,
      default: false,
    },
    resize: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    showModal: false,
  }),
  methods: {
    open() {
      this.showModal = true
    },
    onClose() {
      // eslint-disable-next-line vue/no-mutating-props
      this.showModal = false
    },
  },
}
</script>

<style scoped>
:deep(.modal-container) {
  display: flex;
  justify-content: center;
  align-items: center;
}
:deep(.modal-content) {
  position: relative;
  width: 50%;
  max-height: 300px;
  padding: 16px;
  overflow: auto;
  background-color: #fff;
  border-radius: 4px;
}
:deep(.modal-close) {
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  margin: 8px 8px 0 0;
  cursor: pointer;
}
:deep(.modal-close):hover {
  color: gray;
}
</style>
