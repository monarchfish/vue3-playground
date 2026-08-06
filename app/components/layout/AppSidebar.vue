<script setup lang="ts">
interface Props {
  /**
   * Controls slide-in visibility. Parent layout also shifts main content via `lg:ml-64`
   * when open on large screens.
   */
  isOpen: boolean
}

defineProps<Props>()

defineEmits<{
  close: []
}>()

const route = useRoute()
const { chapterList } = useChapterList()
</script>

<template>
  <!-- Backdrop for mobile -->
  <div v-if="isOpen" class="fixed inset-0 z-30 bg-black/50 lg:hidden" @click="$emit('close')" />

  <aside
    class="fixed top-16 left-0 z-30 h-[calc(100vh-4rem)] w-64 bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 overflow-y-auto transition-transform duration-300"
    :class="isOpen ? 'translate-x-0' : '-translate-x-full'"
  >
    <nav class="p-4 space-y-2">
      <template v-for="chapter in chapterList" :key="chapter.path">
        <div class="mb-3">
          <p
            class="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1 px-3"
          >
            {{ chapter.title }}
          </p>

          <ul class="space-y-0.5">
            <li v-for="page in chapter.children" :key="page.path">
              <NuxtLink
                :to="page.path"
                class="flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors"
                :class="
                  route.path === page.path
                    ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 font-medium'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                "
              >
                <span>{{ page.title }}</span>
              </NuxtLink>
            </li>
          </ul>
        </div>
      </template>
    </nav>
  </aside>
</template>
