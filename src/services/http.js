import axios from "axios";

export default {
    install(Vue) {
        Vue.config.globalProperties.$http = axios.create({
            baseURL: "http://127.0.0.1:8000/api/",
            timeout: 5000,
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
            },
        })
    }
}