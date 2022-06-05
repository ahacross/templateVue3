import * as date from './date'
import './addPrototype'
import isEmpty from 'lodash/isEmpty'

const util = {
  randomString: (maxLength = 11) => {
    return Math.random()
      .toString(36)
      .substring(2, maxLength + 2)
  },
  isEmpty,
}

export default {
  install(app, router) {
    app.config.globalProperties.$move = (url, params = null, type) => {
      const { push, replace } = router
      const moveFn = type === 'replace' ? replace : push
      const urlType = url.includes('/') ? 'path' : 'name'
      moveFn({ [urlType]: url }, params)
    }

    app.config.globalProperties.$date = date
    app.config.globalProperties.$util = util
  },
}
