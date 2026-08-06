<script setup lang="ts">
interface Props {
  /** Route path for the previous chapter page; link hidden when omitted. */
  prevPath?: string
  prevTitle?: string
  /** Route path for the next chapter page; link hidden when omitted. */
  nextPath?: string
  nextTitle?: string
}

defineProps<Props>()
</script>

<template>
  <nav
    class="flex items-center justify-between mt-12 pt-6 border-t border-gray-200 dark:border-gray-800"
  >
    <NuxtLink
      v-if="prevPath"
      :to="prevPath"
      class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
    >
      <Icon name="heroicons:arrow-left" class="w-4 h-4" />
      <span>{{ prevTitle }}</span>
    </NuxtLink>
    <!-- Spacer keeps next link right-aligned when prev is absent -->
    <div v-else />

    <NuxtLink
      v-if="nextPath"
      :to="nextPath"
      class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
    >
      <span>{{ nextTitle }}</span>
      <Icon name="heroicons:arrow-right" class="w-4 h-4" />
    </NuxtLink>
    <!-- Spacer keeps prev link left-aligned when next is absent -->
    <div v-else />
  </nav>
</template>
