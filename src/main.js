import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

// booststrap
import 'bootstrap/dist/css/bootstrap.css'
// bootstrap js
import 'bootstrap'

// vue-loading-overlay
import 'vue-loading-overlay/dist/css/index.css'
// boostrap icon
import 'bootstrap-icons/font/bootstrap-icons.css'
// css
import '@/assets/css/main.scss'
// toastr
import 'toastr/build/toastr.css'

import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'
import { LoadingPlugin } from 'vue-loading-overlay'
import toastr from 'toastr'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

import router from './router'
import App from './App.vue'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
pinia.use(({ store }) => {
  store.$router = markRaw(router)
})
app.use(router)
app.use(LoadingPlugin)
app.use(toastr)
app.use(VueSweetalert2)

app.mount('#app')
