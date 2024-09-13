import { createApp } from 'vue'
import App from './App.vue'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import '@/assets/css/main.css'
import store from './store'

const swalOptions = {
    background: '#1a202c',
    confirmButtonColor: '#42b983',
    cancelButtonColor: '#f56565',
    color: '#f8f8f2',
}

createApp(App).use(store).use(store)
.use(VueSweetalert2, swalOptions)
.mount('#app')
