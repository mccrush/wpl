<template>
  <div
    class="wpl-task border rounded position-relative mt-2 p-2"
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

    <div class="wpl-btn-group btn-group">
      <BtnEdit />
      <BtnTrash @click="$emit('delete-task', { task })" />
    </div>
  </div>
</template>

<script>
import BtnEdit from './ui/buttons/BtnEdit.vue'
import BtnTrash from './ui/buttons/BtnTrash.vue'
export default {
  components: { BtnEdit, BtnTrash },
  emits: ['delete-task'],
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

<style scoped>
.wpl-btn-group {
  position: absolute;
  top: 0px;
  right: 0px;
  z-index: 99;
  display: none;
}

.wpl-task:hover > div.wpl-btn-group {
  display: flex;
  animation: fade_in_show 0.3s;
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
</style>