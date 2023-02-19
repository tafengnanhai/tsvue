import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/index'
import Site from '@/utils/site'
import piniaPersist from 'pinia-plugin-persistedstate'
import ElementPlus from 'element-plus'
import 'normalize.css/normalize.css'
import '@/styles/global.scss'
import '@/styles/global.pc.scss'
import '@/mock/server'

const pinia = createPinia()
pinia.use(piniaPersist)

const app = createApp(App)
app.use(router)
app.use(pinia)
app.use(ElementPlus)
app.mount('#app')

// console.log()
// eslint-disable-next-line @typescript-eslint/no-empty-function
import.meta.env.VITE_PERMIT_CONSOLE === 'false' && (console.log = () => {})

// check version
Site.checkVersion()

// check icon
Site.setIcon(Site.getImage('logo.png'))

// set rem for mobile devices if needed
// Site.setRem()
