export default {
  methods: {
    $alert(params) {
      return new Promise((resolve) => {
        this.$q
          .dialog({
            ...params,
            ok: '확인',
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
            ok: '확인',
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
    $prompt(params) {
      return new Promise((resolve) => {
        this.$q
          .dialog({
            ...params,
            prompt: {
              model: '',
              type: 'text', // optional
            },
            ok: '확인',
            cancel: '취소',
            persistent: true,
          })
          .onOk((data) => {
            resolve(data)
          })
          .onCancel(() => {
            resolve(false)
          })
          .onDismiss(() => {
            resolve('dismiss')
          })
      })
    },
    $saveStorage(key, value) {
      localStorage.setItem(key, JSON.stringify(value))
    },
    $loadStorage(key) {
      return JSON.parse(localStorage.getItem(key))
    },
    $removeStorage(key) {
      return localStorage.removeItem(key)
    },
    $saveId(id) {
      this.$saveStorage('mid', id)
    },
    $loadId() {
      return this.$loadStorage('mid')
    },
    $removeId() {
      this.$removeStorage('mid')
    },
  },
}
