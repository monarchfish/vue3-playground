<script setup lang="ts">
const chapterPageList = [
  {
    path: '/pinia/basic-store',
    title: 'Store 基礎 | Basic Store',
    description: '使用 defineStore 定義 Store，認識 state 與 getters',
  },
  {
    path: '/pinia/actions',
    title: 'Actions 與非同步 | Actions',
    description: '透過 actions 修改 state，處理非同步操作',
  },
  {
    path: '/pinia/composable-store',
    title: 'Setup Store | Composable Store',
    description: '以組合式函式（Composable）語法撰寫 Store',
  },
  {
    path: '/pinia/plugins',
    title: 'Plugins 與持久化 | Plugins',
    description: '擴充 Pinia 功能，將 state 持久化至 localStorage',
  },
]
</script>

<template>
  <div>
    <h1 class="mb-2">CH6：Pinia 狀態管理</h1>
    <p class="text-gray-600 dark:text-gray-400 mb-8">
      Pinia 是 Vue 3 官方推薦的狀態管理（State Management）函式庫，提供直覺的 API、完整的 TypeScript
      支援，以及 DevTools 整合。本章將從基礎 Store 到插件（Plugin）逐步實作。
    </p>

    <UiTipCard type="info" title="Pinia vs Vuex">
      Pinia 取消了 mutations，直接透過 actions 修改 state，API 更簡潔。在 Nuxt 專案中，搭配
      <code>@pinia/nuxt</code> 模組即可自動匯入 <code>defineStore</code> 與
      <code>useXxxStore</code>。
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
      prev-path="/interview/performance"
      prev-title="效能優化"
      next-path="/pinia/basic-store"
      next-title="Store 基礎"
    />
  </div>
</template>
