<script setup lang="ts">
const chapterPageList = [
  {
    path: '/basics/template-syntax',
    title: '模板語法 | Template Syntax',
    description: '學習 Vue 模板中的插值語法、指令與表達式',
  },
  {
    path: '/basics/reactivity',
    title: '響應式 | Reactivity',
    description: '掌握 ref、reactive、toRefs 等響應式核心 API',
  },
  {
    path: '/basics/computed-watch',
    title: 'Computed & Watch',
    description: '使用計算屬性與偵聽器處理衍生資料',
  },
  {
    path: '/basics/conditional-loop',
    title: '條件與迴圈 | v-if & v-for',
    description: '條件渲染與列表渲染的使用與注意事項',
  },
  {
    path: '/basics/event-binding',
    title: '事件處理 | Event Handling',
    description: '事件綁定、修飾符與自訂事件',
  },
  {
    path: '/basics/form-binding',
    title: '表單綁定 | Form Binding',
    description: 'v-model 雙向綁定與各種表單控制項',
  },
]
</script>

<template>
  <div>
    <h1 class="mb-2">CH1：Vue 基礎 | Basics</h1>
    <p class="text-gray-600 dark:text-gray-400 mb-8">
      從最基本的模板語法開始，逐步認識 Vue 3 的核心概念。每個章節都有互動範例，讓你邊學邊練。
    </p>

    <div class="grid gap-4 sm:grid-cols-2">
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
  </div>
</template>
