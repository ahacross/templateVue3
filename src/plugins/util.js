export default {
  install(app, router) {
    app.config.globalProperties.$move = (url, params = null, type) => {
      const { push, replace } = router
      const moveFn = type === 'replace' ? replace : push
      const urlType = url.includes('/') ? 'path' : 'name'
      moveFn({ [urlType]: url }, params)
    }
  },
}
