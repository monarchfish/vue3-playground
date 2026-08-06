<script setup lang="ts">
interface Props {
  /** Semantic variant controlling border color and icon; defaults to neutral learning tips. */
  type?: 'info' | 'warning' | 'tip' | 'danger'
  /** When set, renders a heading row with a type-matched icon above the slot content. */
  title?: string
}

withDefaults(defineProps<Props>(), {
  type: 'tip',
  title: '',
})

const styleMap = {
  info: 'border-accent-500 bg-accent-50 dark:bg-accent-900/10',
  warning: 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/10',
  tip: 'border-primary-500 bg-primary-50 dark:bg-primary-900/10',
  danger: 'border-red-500 bg-red-50 dark:bg-red-900/10',
}

const iconMap = {
  info: 'heroicons:information-circle',
  warning: 'heroicons:exclamation-triangle',
  tip: 'heroicons:light-bulb',
  danger: 'heroicons:x-circle',
}
</script>

<template>
  <div class="my-4 p-4 rounded-lg border-l-4" :class="styleMap[type]">
    <div v-if="title" class="flex items-center gap-2 mb-2 font-semibold text-sm">
      <Icon :name="iconMap[type]" class="w-5 h-5" />
      <span>{{ title }}</span>
    </div>
    <div class="text-sm leading-relaxed">
      <slot />
    </div>
  </div>
</template>
