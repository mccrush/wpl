<template>
  <div class="container-fluid">
    <Transition name="fade" mode="out-in">
      <component :is="myComponent" />
    </Transition>
  </div>
</template>

<script>
import PlanerMain from './modules/planer/PlanerMain.vue'
import LoginForm from './modules/login/LoginForm.vue'

export default {
  name: 'App',
  components: { PlanerMain, LoginForm },
  computed: {
    myComponent() {
      if (this.isLoggedIn) return 'PlanerMain'
      return 'LoginForm'
    },
    isLoggedIn() {
      return this.$store.getters.isLoggedIn
    }
    // loadingData() {
    //   return this.$store.getters.loadingData
    // },
  }
}
</script>

<style>
.btn-close:focus {
  box-shadow: none;
}

.opacity-06 {
  opacity: 0.6;
}

.cursor-pointer,
.dropdown-item {
  cursor: pointer;
}

.cursor-default {
  cursor: default;
}

.my-vh100 {
  height: calc(100vh - 52px); /* Точное число после настройки навбара */
}

.my-container-992 {
  max-width: 992px;
}

textarea {
  font-size: 0.875rem !important;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
