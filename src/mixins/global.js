export default {
  methods: {
    $alert(params) {
      return new Promise((resolve) => {
        this.$q
          .dialog({
            ...params,
            ok: 'OK',
            persistent: true,
          })
          .onOk(() => {
            resolve(true)
          })
          .onDismiss(() => {
            resolve('dismiss')
          })
      })
    },
    $confirm(params) {
      return new Promise((resolve) => {
        this.$q
          .dialog({
            ...params,
            ok: 'OK',
            cancel: '취소',
            persistent: true,
          })
          .onOk(() => {
            resolve(true)
          })
          .onCancel(() => {
            resolve(false)
          })
          .onDismiss(() => {
            resolve('dismiss')
          })
      })
    },
  },
}
