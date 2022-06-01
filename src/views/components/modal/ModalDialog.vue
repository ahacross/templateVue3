<template>
  <q-dialog
    v-model="showDialog"
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

      <q-card-actions class="bg-white text-teal flex">
        <template v-for="(label, idx) in buttons" :key="idx">
          <q-btn
            flat
            :label="label"
            v-close-popup
            @click="$emit('onClick', label)"
          />
        </template>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'ModalDialog',
  props: {
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
    buttons: {
      type: Array,
      default: () => ['OK'],
    },
  },
  data: () => ({
    showDialog: false,
  }),
  methods: {
    open() {
      this.showDialog = true
    },
    close() {
      this.showDialog = false
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
