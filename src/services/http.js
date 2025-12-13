import axios from "axios";

// helper to read cookies
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
}

export default {
  install(Vue) {
    const instance = axios.create({
      baseURL: "http://127.0.0.1:8000/api/",
      timeout: 5000,
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Add interceptor to automatically attach CSRF token for unsafe requests
    instance.interceptors.request.use((config) => {
      const method = config.method.toLowerCase();
      if (["post", "put", "patch", "delete"].includes(method)) {
        const csrfToken = getCookie("csrftoken");
        if (csrfToken) {
          config.headers["X-CSRFToken"] = csrfToken;
        }
      }
      return config;
    });

    Vue.config.globalProperties.$http = instance;
  },
};
