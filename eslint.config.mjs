// @ts-check
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import simpleImportSort from 'eslint-plugin-simple-import-sort'

// Extends Nuxt's auto-generated ESLint flat config (Vue, TypeScript, Nuxt rules).
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(eslintPluginPrettierRecommended, {
  plugins: {
    'simple-import-sort': simpleImportSort,
  },
  rules: {
    // Enforce a stable import order across the codebase — external → internal → relative.
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',

    // Prefer `{ foo }` shorthand and concise arrow bodies to keep diffs small.
    'object-shorthand': 'error',
    'arrow-body-style': ['error', 'as-needed'],

    // Demo pages use single-word component names (e.g. `Counter.vue`) for clarity;
    // the Vue style guide multi-word rule would add noise without benefit here.
    'vue/multi-word-component-names': 'off',
  },
})
