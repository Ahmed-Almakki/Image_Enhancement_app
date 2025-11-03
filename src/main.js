import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import http from './services/http.js'


import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

createApp(App)
    .use(store)
    .use(router)
    .use(http)
    .mount('#app')
