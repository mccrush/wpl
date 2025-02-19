<template>
  <div class="col w-col wpl-vh-100 p-2" @click="showForm = true">
    <h6 class="text-center mb-3">{{ day.title }}</h6>
    <TheTask
      v-for="task in tasks"
      :key="task.id"
      :task="task"
      @delete-task="deleteTask"
      @edit-task="editTask"
    />

    <div v-if="showForm" class="form-create mt-2">
      <input
        type="text"
        class="form-control form-control-sm mt-1"
        aria-label="Text input with checkbox"
        v-model.trim="title"
        @keyup.enter="createTask"
      />

      <div v-if="mod === 'edit'" class="d-flex mt-1">
        <div class="input-group input-group-sm">
          <select class="form-select" v-model="year">
            <option v-for="y in dataYears" :key="y" :value="y">
              {{ y }}
            </option>
          </select>
          <select class="form-select" v-model="week">
            <option v-for="w in dataWeeks" :key="w" :value="w">
              {{ w }}
            </option>
          </select>
          <select class="form-select" v-model="day">
            <option v-for="d in dataDays" :key="d.id" :value="d.id">
              {{ d.id }}
            </option>
          </select>
        </div>
      </div>

      <div class="d-flex mt-1">
        <div class="input-group input-group-sm w-75">
          <select class="form-select" v-model="timeH">
            <option v-for="h in dataHours" :key="h" :value="h">
              {{ h }}
            </option>
          </select>
          <span class="ps-1 pe-1">:</span>
          <select class="form-select" v-model="timeM">
            <option v-for="m in dataMinutes" :key="m" :value="m">
              {{ m }}
            </option>
          </select>
        </div>
        <button class="btn btn-sm btn-light w-25 ms-1" @click="createTask">
          {{ mod === 'edit' ? 'Upd' : 'Add' }}
        </button>
      </div>
    </div>

    <!-- <pre>{{ tasks }}</pre> -->
  </div>
</template>

<script>
import { getShortYear } from './../helpers/getShortYear'
import { dataYears } from './../helpers/dataYears'
import { dataWeeks } from './../helpers/dataWeeks'
import { dataDays } from './../helpers/dataDays'
import { dataHours } from './../helpers/dataHours'
import { dataMinutes } from './../helpers/dataMinutes'
//import { getWeek } from './../helpers/getWeek'
import { factory_task } from './../helpers/factory_task'

import TheTask from './TheTask.vue'
export default {
  components: {
    TheTask
  },
  emits: ['add-task', 'delete-task'],
  props: ['dayOfWeek', 'tasks'],
  data() {
    return {
      title: '',
      year: 2025,
      week: 1,
      day: 1,
      timeH: '',
      timeM: '',
      dataYears,
      dataWeeks,
      dataDays,
      dataHours,
      dataMinutes,
      showForm: false,
      mod: 'create',
      tempTask: null
    }
  },
  computed: {
    selectWeek() {
      return this.$store.getters.selectWeek
    }
  },
  methods: {
    getId() {
      return (
        getShortYear() +
        String(this.selectWeek).padStart(2, '0') +
        String(this.dayOfWeek.id).padStart(2, '0') +
        String(this.tasks.length + 1).padStart(2, '0')
      )
    },
    editTask({ task }) {
      this.showForm = true
      this.mod = 'edit'
      this.title = task.title
      this.year = task.year
      this.week = task.week
      this.day = task.day
      this.timeH = task.timeH
      this.timeM = task.timeM
      this.tempTask = task
    },
    createTask() {
      if (this.mod === 'edit') {
        const task = this.tempTask
        task.title = this.title
        task.year = this.year
        task.week = this.week
        task.day = this.day

        if (this.timeH && this.timeM) {
          task.timeH = this.timeH
          task.timeM = this.timeM
        }

        this.$store.dispatch('updateTask', {
          year: 2025,
          task
        })

        this.title = ''
        this.year = 2025
        this.week = 1
        this.day = 1
        this.timeH = ''
        this.timeM = ''

        this.tempTask = null
        this.mod = 'create'
      } else if (this.mod === 'create') {
        if (this.title) {
          const task = factory_task()
          task.id = this.getId()

          task.title = this.title
          task.year = new Date().getFullYear()
          task.week = this.selectWeek
          task.day = this.dayOfWeek.id

          if (this.timeH && this.timeM) {
            task.timeH = this.timeH
            task.timeM = this.timeM
          }

          this.title = ''
          this.year = 2025
          this.week = 1
          this.day = 1
          this.timeH = ''
          this.timeM = ''

          this.$emit('add-task', { task })

          this.$store.dispatch('addTask', {
            year: 2025,
            task
          })
        }
      }
    },

    deleteTask({ task }) {
      this.$emit('delete-task', { task })

      this.$store.dispatch('deleteTask', {
        year: 2025,
        id: task.id
      })
    }
  }
}
</script>

<style scoped>
.wpl-vh-100 {
  height: calc(100vh - 60px);
}

div.form-create {
  display: none;
}

.col:hover > div.form-create {
  display: block;
  animation: fade_in_show 0.7s;
}

@keyframes fade_in_show {
  0% {
    opacity: 0;
    transform: scale(1);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}

/* .v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
} */
</style>