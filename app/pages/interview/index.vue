<script setup lang="ts">
const chapterPageList = [
  {
    path: '/interview/reactivity-deep',
    title: '響應式原理',
    description: '深入 Proxy vs defineProperty，理解 Vue 3 響應式系統內部機制',
  },
  {
    path: '/interview/diff-algorithm',
    title: 'Diff 演算法',
    description: 'Virtual DOM 與 Diff 演算法如何高效更新 DOM',
  },
  {
    path: '/interview/key-usage',
    title: 'Key 的作用',
    description: 'v-for 中 key 的重要性，錯用 key 導致的問題演示',
  },
  {
    path: '/interview/vue2-vs-vue3',
    title: 'Vue 2 vs Vue 3',
    description: '兩個版本的核心差異與遷移重點',
  },
  {
    path: '/interview/performance',
    title: '效能優化',
    description: 'Vue 3 效能優化策略與最佳實踐',
  },
]
</script>

<template>
  <div>
    <h1 class="mb-2">CH5：面試題 | Interview</h1>
    <p class="text-gray-600 dark:text-gray-400 mb-8">
      整理 Vue 3 常見面試題，涵蓋響應式原理、Virtual DOM、Diff 演算法、Key
      機制、版本差異與效能優化等核心知識點。
    </p>

    <UiTipCard type="info" title="面試準備建議">
      理解原理比背誦 API
      更重要。每個主題都附有互動演示，建議先操作演示、觀察行為，再對照原理說明，加深記憶。
    </UiTipCard>

    <div class="grid gap-4 sm:grid-cols-2 mt-8">
      <NuxtLink
        v-for="page in chapterPageList"
        :key="page.path"
        :to="page.path"
        class="section-card hover:border-primary-300 dark:hover:border-primary-700 transition-colors group"
      >
        <h3
          class="text-base font-semibold group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors"
        >
          {{ page.title }}
        </h3>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">{{ page.description }}</p>
      </NuxtLink>
    </div>

    <UiChapterNav
      prev-path="/advanced/transition"
      prev-title="轉場動畫 | Transition"
      next-path="/interview/reactivity-deep"
      next-title="響應式原理"
    />
  </div>
</template>
