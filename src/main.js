import {
    createApp
} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'virtual:windi.css'
import socket from 'socket.io-client'



const Vue = createApp(App)


const io = socket('http://localhost:5000')

Vue.config.globalProperties.$io = io





Vue.use(router)
Vue.use(store)
Vue.mount('#app')