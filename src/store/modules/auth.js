import { supabase } from './../../supabase/supabaseClient'

export default {
  state: {
    loading: false,
    userId: null
  },

  mutations: {
    setAuthData(state, { type, data }) {
      state[type] = data
    },
    setLoading(state, value) {
      state.loading = value
    }
  },

  actions: {
    async logIn({ commit }, { email, password }) {
      try {
        commit('setLoading', true)
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (error) throw error
      } catch (error) {
        console.error('auth.js logIn()', error)
      } finally {
        commit('setLoading', false)
      }

    },

    async logOut({ commit }) {
      try {
        commit('setLoading', true)
        const { error } = await supabase.auth.signOut()
        if (error) throw error
      } catch (error) {
        console.error('auth.js logOut()', error)
      } finally {
        commit('setLoading', false)
      }
    },
  },

  getters: {
    isLoggedIn: state => state.userId !== null,
    userId: state => state.userId,
  }
}