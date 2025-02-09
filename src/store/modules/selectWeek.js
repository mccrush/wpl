import { getWeek } from './../../helpers/getWeek'

export default {
  state: {
    selectWeek: localStorage.getItem('wpl-selectWeek') || getWeek()
  },

  mutations: {
    setSelectWeek(state, selectWeek) {
      state.selectWeek = selectWeek
      localStorage.setItem('wpl-selectWeek', selectWeek)
    }
  },
  getters: {
    selectWeek: state => state.selectWeek
  }
}