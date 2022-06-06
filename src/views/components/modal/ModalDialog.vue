<template>
  <q-dialog
    v-model="dialog.open"
    :full-width="fullWidth"
    :full-height="fullHeight"
  >
    <q-card :style="`width: ${width}px`">
      <q-card-section v-if="title" class="flex">
        <div class="text-h6 flex1">{{ title }}</div>
        <span class="material-icons close-size" @click="close"> close </span>
      </q-card-section>

      <q-card-section class="q-pt-none scroll content-scroll">
        <slot></slot>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'ModalDialog',
  provide() {
    return {
      modal: this.dialog,
    }
  },
  props: {
    open: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: null,
    },
    fullWidth: {
      type: Boolean,
      default: false,
    },
    fullHeight: {
      type: Boolean,
      default: false,
    },
    width: {
      type: Number,
      default: 300,
    },
  },
  data: () => ({
    dialog: {
      open: false,
      reload: false,
    },
  }),
  watch: {
    open() {
      this.dialog.open = this.open
    },
    'dialog.open'() {
      if (this.dialog.reload) {
        this.$emit('reload')
      }
      const open = this.dialog.open
      if (!open) {
        this.$emit('update:open', false)
      }
    },
    'modal.open'() {
      const open = this.modal.open
      if (!open) {
        this.close()
      }
    },
  },
  methods: {
    close() {
      this.dialog.open = false
    },
  },
}
</script>
<style scoped lang="scss">
.flex {
  display: flex;
}
.flex1 {
  flex: 1;
}
.close-size {
  font-size: 20px;
  font-weight: 600;
}
.content-scroll {
  //overflow: auto;
  height: calc(100% - 120px);
}
.q-card__actions {
  > .q-btn {
    flex: 1;
  }
}
</style>
