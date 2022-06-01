import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Quasar, Dialog } from 'quasar'

// Import icon libraries
import '@quasar/extras/roboto-font/roboto-font.css'
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/fontawesome-v5/fontawesome-v5.css'

// Import Quasar css
import 'quasar/src/css/index.sass'
import 'billboard.js/dist/billboard.css'
import 'billboard.js/dist/theme/insight.css'
import 'tui-grid/dist/tui-grid.css'

import App from './App.vue'
import router from './router'
import util from './plugins/util'
// import vfmPlugin from 'vue-final-modal'
import Vue3MobileDetection from 'vue3-mobile-detection'
import MixinGlobal from './mixins/global'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Quasar, {
  plugins: { Dialog },
})
app.use(Vue3MobileDetection)
app.use(util, router)
// app.use(vfmPlugin)

app.mixin(MixinGlobal)

app.mount('#app')
