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
    }
  },
  actions: {
    login(context, payload) {
      const currentUser = payload
      localStorage.setItem('currentUser', JSON.stringify(currentUser))
      context.commit('ADD_CURRENT_USER', currentUser)
    }
  },
  modules: {
  }
})
