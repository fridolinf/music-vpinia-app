import { fileURLToPath } from 'node:url'
import { mergeConfig } from 'vite'
import { configDefaults, defineConfig } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    /* This code block is defining the configuration options for running tests using the Vitest testing
    framework. */
    test: {
      environment: 'jsdom',
      /* `exclude: [...configDefaults.exclude, 'e2e/*']` is adding `'e2e/*'` to the list of directories
      and files to exclude from the test run. `configDefaults.exclude` is a default list of
      directories and files that are excluded from the test run, and by adding `'e2e/*'` to it, the
      `e2e` directory and all its contents will also be excluded from the test run. This is useful
      if the `e2e` directory contains end-to-end tests that are not meant to be run as part of the
      regular test suite. */
      exclude: [...configDefaults.exclude, 'e2e/*'],
      /* `root: fileURLToPath(new URL('./', import.meta.url))` is setting the root directory for the
      test run. It uses the `fileURLToPath` function to convert the URL of the current file
      (`import.meta.url`) to a file path, and then sets that file path as the root directory for the
      test run. This is useful for resolving file paths in the test suite, as it ensures that all
      file paths are relative to the root directory. */
      root: fileURLToPath(new URL('./', import.meta.url))
    }
  })
)
