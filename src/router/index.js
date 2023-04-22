import useUserStore from '../stores/user'
import { createRouter, createWebHistory } from 'vue-router'

const Home = () => import('../views/Home.vue') //dynamic route imports for better bundle size inside chuncks on js files
const About = () => import('../views/About.vue')
const Manage = () => import('../views/Manage.vue')
const Song = () => import('../views/Song.vue')

const routes = [
  {
    name: 'home',
    path: '/',
    component: Home
  },
  {
    name: 'about',
    path: '/about',
    component: About
  },
  {
    name: 'manage',
    // alias: 'manage', we can use alias to make flexible Manage page access
    path: '/manage-music',
    component: Manage,
    beforeEnter: (to, from, next) => {
      next()
    },
    /* `meta: { requiresAuth: true }` is adding metadata to a route in Vue Router. In this case, it is
    indicating that the `Manage` route requires authentication to access it. This metadata can be
    used in the `beforeEach` navigation guard to check if the user is authenticated before allowing
    access to the route. */
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/manage',
    redirect: { name: 'manage' }
    // if user adding link to manage will be redirect to name: manage of path "/manage-music"
  },
  { name: 'song', path: '/song/:id', component: Song },
  {
    /* `path: '/:catchAll(.*)*', redirect: { name: 'home' }` is a catch-all route that matches any path
    that is not defined in the routes array. It redirects the user to the `home` route, which is the
    default route. This is useful for handling 404 errors or invalid URLs. The `:catchAll` parameter
    is a dynamic parameter that matches any path segment, and the `(.*)*` regex matches any
    characters after the path segment. */
    path: '/:catchAll(.*)*',
    redirect: { name: 'home' }
  }
]

/* This code is creating a Vue Router instance using the `createRouter` function from the `vue-router`
library. */
const router =
  /* `createRouter` is a function from the `vue-router` library that creates a new Vue
Router instance. It takes an object as an argument that specifies the configuration
options for the router, such as the routes to be used and the history mode to be
used. The returned router instance can be used to navigate between different routes
in a Vue application. */
  createRouter({
    /* `history: createWebHistory(import.meta.env.BASE_URL)` is creating a history object for the Vue
    Router instance using the `createWebHistory` function from the `vue-router` library. The
    `createWebHistory` function creates a HTML5 history object that can be used to manipulate the
    browser's history stack. The `import.meta.env.BASE_URL` is a variable that contains the base URL
    of the application, which is used as the base for all relative URLs in the application. This is
    necessary for the history object to work correctly with the Vue Router. */
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
    /* `linkExactActiveClass: 'text-yellow-500'` is a configuration option for the Vue Router instance.
    It sets the CSS class to be applied to the active link when it exactly matches the current
    route. In this case, it sets the class to `text-yellow-500`, which is a custom CSS class that
    can be used to style the active link. This option is useful for indicating to the user which
    link is currently active in the navigation menu. */
    linkExactActiveClass: 'text-yellow-500'
  })
router.beforeEach((to, from, next) => {
  // to is where user want to go
  // from is where user now
  // next is function
  document.title = 'Music v Pinia'

  /* This code is checking if the `to` route object has a `meta` property with a `requiresAuth`
  property set to `true`. If it does not have this property, it means that the route does not
  require authentication, so the `next()` function is called to allow the user to access the route.
  If the `requiresAuth` property is set to `true`, it means that the route requires authentication,
  so the code checks if the user is logged in by accessing the `userLoggedIn` property from the
  global user store using the `useUserStore()` function. If the user is logged in, the `next()`
  function is called to allow the user to access the route. If the user is not logged in, the
  `next()` function is called with an argument that redirects the user to the `home` route. */
  if (!to.meta.requiresAuth) {
    next()
    return
  }
  const store = useUserStore()
  if (store.userLoggedIn) {
    // Globally checking user is has loggedIn or not from state
    // if user has loggedIn will be redirect
    next()
  } else {
    // if user not loggedIn will be redirect to home
    next({ name: 'home' })
  }
})

export default router
