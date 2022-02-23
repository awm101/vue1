/* eslint-disable */
import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import PrimeVue from 'primevue/config'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'

import router from './router'
// createApp(App).use(router).mount('#app')
const app = createApp(App)
app.use(router)
app.use(PrimeVue)
app.component('Button', Button)
app.component('InputText', InputText)

app.mount('#app')
