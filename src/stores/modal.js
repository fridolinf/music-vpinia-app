import { defineStore } from 'pinia'

export default defineStore('modal', {
  state: () => ({
    isOpen: false
  }),
  /* This code defines a getter function named `hiddenClass` in a Pinia store module. The getter
  function takes the store's `state` object as an argument and returns a string value. */
  getters: {
    // required to return a value
    hiddenClass(state) {
      return !state.isOpen ? 'hidden' : ''
    }
  }
})
