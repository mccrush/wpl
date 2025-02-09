<template>
  <div class="input-group w-100 mt-2">
    <div
      v-for="w in 52"
      :key="w"
      class="btn btn-sm btn-light flex-fill"
      :class="{ active: w == selectWeek, 'fw-bold': w == currentWeek }"
      @click="setSelectWeek(w)"
    >
      {{ w < 10 ? '0' + w : w }}
    </div>
  </div>
</template>

<script>
import { getWeek } from '../helpers/getWeek'

export default {
  data() {
    return {
      currentWeek: getWeek()
    }
  },
  computed: {
    selectWeek() {
      return this.$store.getters.selectWeek
    }
  },
  methods: {
    setSelectWeek(w) {
      this.$store.commit('setSelectWeek', w)
    }
  }
}
</script>