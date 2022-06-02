import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'
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
import MixinGlobal from './mixins/global'

const pinia = createPinia()
pinia.use(piniaPersist)

const app = createApp(App)
app.use(pinia)
app.use(router)
app.use(Quasar, {
  plugins: { Dialog },
})
app.use(util, router)
// app.use(vfmPlugin)

app.mixin(MixinGlobal)

app.mount('#app')
