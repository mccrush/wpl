import { createStore } from 'vuex'
import auth from './modules/auth'
import tasks from './modules/tasks'
import selectWeek from './modules/selectWeek'

export default createStore({
  modules: {
    auth,
    tasks,
    selectWeek
  }
})
