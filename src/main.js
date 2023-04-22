import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import VeeValidatePlugin from './utils/validation'
import { auth } from './utils/firebase'
import './assets/tailwind.css'
import './assets/main.css'
import 'nprogress/nprogress.css'
import i18n from './utils/i18n'
import progressBar from './utils/progress'

/* `progressBar(router)` is calling a function `progressBar` and passing the `router` object as an
argument. The `progressBar` function is responsible for setting up a progress bar that will be
displayed when the user navigates between pages in the application. It uses the `router` object to
listen for navigation events and update the progress bar accordingly. */
progressBar(router)

let app // initialize app first

/* `auth.onAuthStateChanged()` is a method provided by Firebase Authentication that listens for changes
in the user authentication state. When the user's authentication state changes (e.g. when they log
in or log out), the callback function passed to `onAuthStateChanged()` is called. */
auth.onAuthStateChanged(() => {
  // after user authenticated
  if (!app) {
    // handle to only once initialize the app
    app = createApp(App)
    app.use(createPinia()) //register plugin pinia as state management
    app.use(router)
    app.use(i18n)
    app.use(VeeValidatePlugin)
    app.mount('#app')
  }
})
