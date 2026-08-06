<script setup lang="ts">
const chapterPageList = [
  {
    path: '/lifecycle/hooks-demo',
    title: 'Lifecycle Hooks 演示',
    description: 'onMounted、onUpdated、onUnmounted 等生命週期鉤子（Hooks）的執行時機',
  },
  {
    path: '/lifecycle/next-tick',
    title: 'nextTick 應用',
    description: '在 DOM 更新後執行程式碼，解決響應式更新與 DOM 不同步的問題',
  },
  {
    path: '/lifecycle/error-handling',
    title: '錯誤處理 | Error Handling',
    description: '使用 onErrorCaptured 建立錯誤邊界（Error Boundary），優雅地處理子元件錯誤',
  },
]
</script>

<template>
  <div>
    <h1 class="mb-2">CH3：生命週期 | Lifecycle</h1>
    <p class="text-gray-600 dark:text-gray-400 mb-8">
      了解 Vue 元件從建立到銷毀的完整生命週期，掌握 Composition API 中的生命週期鉤子（Lifecycle
      Hooks），以及 <code>nextTick</code> 與錯誤處理等進階技巧。
    </p>

    <UiTipCard type="info" title="Composition API 中的生命週期">
      Vue 3 的 Composition API 提供
      <code>onBeforeMount</code
      >、<code>onMounted</code>、<code>onBeforeUpdate</code>、<code>onUpdated</code>、<code>onBeforeUnmount</code>、<code
        >onUnmounted</code
      >
      等鉤子，對應 Options API 中的 <code>beforeMount</code>、<code>mounted</code> 等選項。
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
      prev-path="/components/v-model-component"
      prev-title="元件 v-model"
      next-path="/lifecycle/hooks-demo"
      next-title="Lifecycle Hooks 演示"
    />
  </div>
</template>
