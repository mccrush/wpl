<template>
  <div class="col w-col wpl-vh-100 p-2">
    <h6 class="text-center mb-3">{{ day.title }}</h6>
    <TheTask v-for="task in tasks" :key="task.id" :task="task" />
    <Transition>
      <div class="form-create mt-2">
        <input
          type="text"
          class="form-control form-control-sm mt-1"
          aria-label="Text input with checkbox"
          v-model.trim="title"
          @keyup.enter="createTask"
        />

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
            Add
          </button>
        </div>
      </div>
    </Transition>
    <!-- <pre>{{ tasks }}</pre> -->
  </div>
</template>

<script>
import { getShortYear } from './../helpers/getShortYear'
import { dataHours } from './../helpers/dataHours'
import { dataMinutes } from './../helpers/dataMinutes'
//import { getWeek } from './../helpers/getWeek'
import { factory_task } from './../helpers/factory_task'

import TheTask from './TheTask.vue'
export default {
  components: {
    TheTask
  },
  emits: ['add-task'],
  props: ['day', 'tasks'],
  data() {
    return {
      title: '',
      timeH: '',
      timeM: '',
      dataHours,
      dataMinutes
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
        String(this.day.id).padStart(2, '0') +
        String(this.tasks.length + 1).padStart(2, '0')
      )
    },
    createTask() {
      if (this.title) {
        const task = factory_task()
        task.id = this.getId()

        task.title = this.title
        task.week = this.selectWeek
        task.day = this.day.id

        if (this.timeH && this.timeM) {
          task.timeH = this.timeH
          task.timeM = this.timeM
        }

        this.title = ''
        this.timeH = ''
        this.timeM = ''

        this.$emit('add-task', { task })

        this.$store.dispatch('addTask', {
          year: 2025,
          task
        })
      }
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