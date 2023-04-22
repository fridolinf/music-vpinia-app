<template>
  <app-header />
  <!-- Header -->

  <!-- Home -->
  <router-view v-slot="{ Component, route }">
    <transition name="fade" mode="out-in">
      <div :key="route.name">
        <component :is="Component"></component>
      </div>
    </transition>
  </router-view>
  <!-- Player -->
  <app-player />

  <!-- Auth Modal -->
  <auth />
</template>

<script>
import AppHeader from './components/Header.vue'
import AppPlayer from './components/Player.vue'
import Auth from './components/Auth.vue'
import { mapWritableState } from 'pinia'
import useUserStore from './stores/user'
import { auth } from './utils/firebase'
export default {
  name: 'app',
  components: {
    AppHeader,
    Auth,
    AppPlayer
  },
  computed: {
    ...mapWritableState(useUserStore, ['userLoggedIn'])
  },
  created() {
    if (auth.currentUser) {
      // if user logged in
      this.userLoggedIn = true
    }
  }
}
</script>

<style>
.fade-enter-from {
  opacity: 0;
}

.fade-enter-active {
  transition: all 0.5s linear;
}
.fade-leave-to {
  transition: all 0.5s linear;
  opacity: 0;
}
</style>
