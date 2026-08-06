<script setup lang="ts">
/** Sidebar open state lives in the layout; header only signals intent to toggle. */
defineEmits<{
  toggleSidebar: []
}>()

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 z-40 h-16 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800"
  >
    <div class="flex items-center justify-between h-full px-4">
      <div class="flex items-center gap-3">
        <button
          class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="切換側邊欄"
          @click="$emit('toggleSidebar')"
        >
          <Icon name="heroicons:bars-3" class="w-5 h-5" />
        </button>

        <NuxtLink to="/" class="flex items-center gap-2">
          <Icon name="logos:vue" class="w-7 h-7" />
          <span class="font-bold text-lg hidden sm:inline">Vue3 Playground</span>
        </NuxtLink>
      </div>

      <div class="flex items-center gap-2">
        <button
          class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="切換深色模式"
          @click="toggleDark()"
        >
          <Icon :name="isDark ? 'heroicons:sun-solid' : 'heroicons:moon-solid'" class="w-5 h-5" />
        </button>
      </div>
    </div>
  </header>
</template>
