import { supabase } from './../../supabase/supabaseClient'

export default {
  state: {
    loadingData: false,
    tasks: []
  },

  mutations: {
    setTasks(state, tasks) {
      state.tasks = tasks
    },
    setLoadingData(state, value) {
      state.loadingData = value
    },
  },

  actions: {
    async getTasksByWeek({ commit }, { year, week }) {
      try {
        commit('setLoadingData', true)
        const { data, error } = await supabase
          .from(year)
          .select()
          .eq('week', week)

        if (error) throw error
        if (data) {
          return data
          if (data) {
            commit('setTasks', data)
          }
        }
      } catch (error) {
        console.error('tasks.js getTasksByWeek()', error)
      } finally {
        commit('setLoadingData', false)
      }
    },

    async getAllTasks({ commit }, { year }) {
      try {
        commit('setLoadingData', true)
        const { data, error } = await supabase
          .from(year)
          .select()

        if (error) throw error
        if (data) {
          if (data) {
            commit('setTasks', data)
          }
        }
      } catch (error) {
        console.error('tasks.js getAllTasks()', error)
      } finally {
        commit('setLoadingData', false)
      }
    },

    async updateTaskStatus({ commit }, { year, id, value }) {
      try {
        commit('setLoadingData', true)
        const { error } = await supabase
          .from(year)
          .update({ 'status': value })
          .eq('id', id)

      } catch (error) {
        console.error('tasks.js updateTaskStatus()', error)
      } finally {
        commit('setLoadingData', false)
      }
    },

    async addTask({ commit }, { year, task }) {
      try {
        commit('setLoadingData', true)
        const { error } = await supabase
          .from(year)
          .insert(task)

      } catch (error) {
        console.error('tasks.js addTask()', error)
      } finally {
        commit('setLoadingData', false)
      }
    },
  },

  getters: {
    loadingData: state => state.loadingData,
    tasks: state => state.tasks,
  }
}