<template>
  <div
    class="border rounded mt-2 p-2"
    :class="{ 'bg-success-subtle border-success-subtle': taskDone }"
  >
    <input
      class="form-check-input"
      :class="{ 'is-valid': taskDone }"
      :checked="taskDone"
      type="checkbox"
      value=""
      aria-label="Checkbox for following text input"
      @change="toggleStatus"
    />
    <span
      v-if="task.timeH && task.timeM"
      class="small ps-1 pe-1 bg-body-secondary rounded text-body-secondary ms-2"
      >{{ task.timeH }}:{{ task.timeM }}</span
    >
    <span class="ms-2">{{ task.title }}</span>
  </div>
</template>

<script>
export default {
  props: ['task'],
  computed: {
    taskDone() {
      return this.task.status === 'done' ? true : false
    }
  },
  methods: {
    toggleStatus() {
      this.task.status = this.task.status === 'active' ? 'done' : 'active'

      this.$store.dispatch('updateTaskStatus', {
        year: 2025,
        id: this.task.id,
        value: this.task.status
      })
    }
  }
}
</script>