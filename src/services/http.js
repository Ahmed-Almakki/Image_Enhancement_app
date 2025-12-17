import axios from "axios";

export default {
  install(Vue) {
    const instance = axios.create({
      baseURL: "http://127.0.0.1:8000/api/",
      timeout: 5000,
      withCredentials: true,
      headers: {
        "Content-Type": "application/json", // default
      },
    });

    // Automatically attach CSRF token
    instance.interceptors.request.use((config) => {
      const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(";").shift();
        return null;
      };

      const method = config.method.toLowerCase();
      if (["post", "put", "patch", "delete"].includes(method)) {
        const csrfToken = getCookie("csrftoken");
        if (csrfToken) config.headers["X-CSRFToken"] = csrfToken;
      }

      if (config.data instanceof FormData) {
        config.headers["Content-Type"] = "multipart/form-data";
      }
      return config;
    });

    // Upload Helper for Uploading Files
    Vue.config.globalProperties.$Upload = (url, data = {}, options = {}) => {
      let config = { ...options };

      // Convert plain object to FormData
      let formData = new FormData();
      for (let key in data) {
        if (data[key] !== undefined && data[key] !== null) {
          formData.append(key, data[key]);
        }
      }

      return instance.post(url, formData, config);
    };

    Vue.config.globalProperties.$http = instance;
  },
};
