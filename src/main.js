import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import http from './services/http.js'

//Loader component
import LoaderComp from './views/LoaderComp.vue'

//toaster
import ToastPlugin from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-bootstrap.css';

// bootstrap
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-icons/font/bootstrap-icons.css"
import "bootstrap"

createApp(App)
    .use(store)
    .use(router)
    .use(http)
    .use(ToastPlugin, {
        position: 'top-right',
        duration: 5000,
        dismissible: true
    })
    .component('LoaderComp', LoaderComp)
    .mount('#app')
