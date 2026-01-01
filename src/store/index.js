import { createStore } from 'vuex'

export default createStore({
  state: {
    currentUser: localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : null,
  },
  getters: {
  },
  mutations: {
    ADD_CURRENT_USER(state, payload) {
      state.currentUser = payload
    },
    REMOVE_CURRENT_USER(state) {
      localStorage.removeItem('currentUser')
      state.currentUser = null
    }
  },
  actions: {
    login(context, payload) {
      const currentUser = payload
      localStorage.setItem('currentUser', JSON.stringify(currentUser))
      context.commit('ADD_CURRENT_USER', currentUser)
    },
    logout(context) {
      context.commit('REMOVE_CURRENT_USER')
    }
  },
  modules: {
  }
})
