<script setup lang="ts">
const chapterPageList = [
  {
    path: '/advanced/composables',
    title: '組合式函式 | Composables',
    description: '抽取可重用的邏輯為 Composable，如 useCounter、useFetch',
  },
  {
    path: '/advanced/directives',
    title: '自訂指令 | Directives',
    description: '建立 v-focus、v-click-outside、v-tooltip 等自訂指令',
  },
  {
    path: '/advanced/render-function',
    title: 'Render Function',
    description: '使用 h() 函式建立虛擬節點（VNode），突破模板限制',
  },
  {
    path: '/advanced/teleport',
    title: 'Teleport',
    description: '將元件內容渲染到 DOM 其他位置，常用於 Modal 與 Tooltip',
  },
  {
    path: '/advanced/suspense',
    title: 'Suspense',
    description: '處理非同步元件（Async Component）的載入狀態',
  },
  {
    path: '/advanced/transition',
    title: '轉場動畫 | Transition',
    description: 'Transition 與 TransitionGroup 實現進入/離開動畫',
  },
]
</script>

<template>
  <div>
    <h1 class="mb-2">CH4：進階 | Advanced</h1>
    <p class="text-gray-600 dark:text-gray-400 mb-8">
      深入 Vue 3 進階特性：組合式函式（Composables）、自訂指令（Directives）、Render
      Function、Teleport、Suspense 與轉場動畫（Transition）。
    </p>

    <UiTipCard type="info" title="Composition API 的精髓">
      Composables 是 Vue 3
      邏輯重用的核心模式。將有狀態的邏輯封裝成函式，可在多個元件間共享，同時保持響應式與生命週期鉤子的完整功能。
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
      prev-path="/lifecycle/error-handling"
      prev-title="錯誤處理 | Error Handling"
      next-path="/advanced/composables"
      next-title="組合式函式 | Composables"
    />
  </div>
</template>
