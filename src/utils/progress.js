import nProgress from 'nprogress'

/* This code exports a function that takes a `router` object as a parameter. The function sets up two
router guards using the `beforeEach` and `afterEach` methods of the `router` object. The
`beforeEach` guard starts a progress bar using the `nProgress` library before each route transition,
and the `afterEach` guard stops the progress bar once the transition is complete. This code is
likely used to provide a visual indication of page loading progress to the user. */
export default (router) => {
  router.beforeEach((to, from, next) => {
    nProgress.start()
    next()
  })
  router.afterEach(nProgress.done)
}
