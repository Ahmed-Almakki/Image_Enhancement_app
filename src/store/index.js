import { createStore } from 'vuex'

export default createStore({
  state: {
    // currentUser: localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : null,
    currentUser: (() => {
      const savedUser = localStorage.getItem('currentUser') || sessionStorage.getItem('currentUser');
      if (savedUser && savedUser !== 'null' && savedUser !== 'undefined') {
        return JSON.parse(savedUser);
      }
      return null;
    })(),
    loading: true,
  },
  getters: {
  },
  mutations: {
    ADD_CURRENT_USER(state, payload) {
      state.currentUser = payload
    },
    REMOVE_CURRENT_USER(state) {
      state.currentUser = null
    },
    SET_LOADING(state, value) {
      state.loading = value
    }
  },
  actions: {
    login(context, payload) {
      const currentUser = payload
      if (currentUser.rememberMe) {
        localStorage.setItem('currentUser', JSON.stringify(currentUser))
      } else {
        sessionStorage.setItem('currentUser', JSON.stringify(currentUser))
      }
      context.commit('ADD_CURRENT_USER', currentUser)
    },
    logout(context) {
      localStorage.removeItem('currentUser')
      sessionStorage.removeItem('currentUser')
      context.commit('REMOVE_CURRENT_USER')
    }
  },
  modules: {
  }
})
