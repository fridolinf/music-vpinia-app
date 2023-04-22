<template>
  <header id="header" class="bg-sky-800 rounded-b-2xl">
    <nav class="container mx-auto flex justify-start items-center py-5 px-5">
      <!-- App Name -->
      <router-link class="text-white font-bold text-2xl" :to="{ name: 'home' }"
        >MUSIC<b class="text-black text-md">v</b>PINIA</router-link
      >
      <!-- active-class is to make color from active class global in index.js not affected to this section of router-link Music -->
      <div class="flex items-center mx-auto">
        <!-- Primary Navigation -->
        <ul class="flex mt-1 gap-3 md:gap-20 md:mr-36 mr-2">
          <!-- Navigation Links -->
          <li>
            <router-link :to="{ name: 'about' }" class="text-white">{{
              $t('header.about')
            }}</router-link>
          </li>
          <li v-if="!userStore.userLoggedIn">
            <a
              id="login-register"
              class="text-white cursor-pointer"
              @click.prevent="toggleAuthModal"
              >{{ $t('header.login-or-register') }}</a
            >
          </li>
          <template v-else>
            <li>
              <router-link id="manage-tab" class="text-white" :to="{ name: 'manage' }">{{
                $t('header.manage')
              }}</router-link>
            </li>
            <li>
              <router-link
                id="logout"
                active-class="no-active"
                class="text-white logout"
                :to="{ name: 'home' }"
                @click.prevent="signOut"
                >{{ $t('header.logout') }}</router-link
              >
            </li>
          </template>
        </ul>
      </div>

      <div class="text-end items-end">
        <ul>
          <li>
            <a id="locale" href="#" class="text-white aaa" @click.prevent="changeLocale">{{
              currentLocale
            }}</a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapState, mapWritableState, mapStores } from 'pinia'
// mapState is readable function
// mapWritableState is function for update state from store
import useModalStore from '../stores/modal'
import useUserStore from '../stores/user'
export default {
  name: 'AppHeader',
  computed: {
    ...mapStores(useUserStore, useModalStore),
    ...mapState(useModalStore, ['hiddenClass']),
    ...mapWritableState(useModalStore, ['isOpen']), // 1. store, 2. properties from store
    currentLocale() {
      return this.$i18n.locale === 'en' ? 'EN' : 'ID'
    }
  },
  methods: {
    toggleAuthModal() {
      this.isOpen = !this.isOpen
    },
    signOut() {
      this.userStore.signOut()
      if (this.$route.meta.requiresAuth) {
        this.$router.push({ name: 'home' }) //reditecting to home after logout
      }
    },
    changeLocale() {
      this.$i18n.locale = this.$i18n.locale === 'en' ? 'id' : 'en'
    }
  }
}
</script>
