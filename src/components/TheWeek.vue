<template>
  <div class="row mt-3">
    <TheDay
      v-for="day in dataDays"
      :key="day.id"
      :day="day"
      :tasks="getTasksFiltersByDay(day.id)"
      @add-task="addTask"
      @delete-task="deleteTask"
    />
  </div>
</template>

<script>
import { dataDays } from './../helpers/dataDays'

import TheDay from './TheDay.vue'

export default {
  components: { TheDay },
  data() {
    return {
      dataDays,
      tasks: []
    }
  },
  computed: {
    selectWeek() {
      return this.$store.getters.selectWeek
    }
  },
  async mounted() {
    this.tasks = await this.$store.dispatch('getTasksByWeek', {
      year: 2025,
      week: this.selectWeek
    })
  },
  methods: {
    getTasksFiltersByDay(dayId) {
      return this.tasks.filter(task => task.day === dayId)
    },
    addTask({ task }) {
      this.tasks.push(task)
    },
    deleteTask({ task }) {
      this.tasks = this.tasks.filter(el => el.id !== task.id)
    }
  },
  watch: {
    async selectWeek(n) {
      this.tasks = await this.$store.dispatch('getTasksByWeek', {
        year: 2025,
        week: n
      })
    }
  }
}
</script>