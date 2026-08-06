<script setup lang="ts">
interface Props {
  /** Label shown above the interactive demo slot. */
  title: string
}

defineProps<Props>()
</script>

<template>
  <!-- Uses `.demo-area` from main.css for dashed-border demo styling -->
  <div class="demo-area">
    <p class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
      {{ title }}
    </p>
    <slot />
  </div>
</template>
