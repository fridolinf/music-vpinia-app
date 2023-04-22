/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  overrides: [
    {
      files: ['cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}'],
      extends: ['plugin:cypress/recommended']
    },
    {
      files: ['src/components/__test__/**spec.js'],
      global: {
        test: 'readonly',
        describe: 'readonly',
        expect: 'readonly',
        vi: 'readonly',
        beforeEach: 'readonly',
        it: 'readonly'
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  env: {
    node: true //support node module
  },
  rules: {
    'vue/multi-word-component-names': 'off'
  }
}
