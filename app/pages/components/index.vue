<script setup lang="ts">
const chapterPageList = [
  {
    path: '/components/props-emits',
    title: 'Props & Emits',
    description: '父子元件之間的資料傳遞與事件溝通',
  },
  {
    path: '/components/slots',
    title: '插槽 | Slots',
    description: '使用 Slot 實現靈活的元件內容分發',
  },
  {
    path: '/components/provide-inject',
    title: 'Provide / Inject',
    description: '跨層級元件間的依賴注入',
  },
  {
    path: '/components/dynamic-async',
    title: '動態與非同步元件',
    description: '動態切換元件與延遲載入元件',
  },
  {
    path: '/components/v-model-component',
    title: '元件 v-model',
    description: '在自訂元件上使用 v-model 雙向綁定',
  },
]
</script>

<template>
  <div>
    <h1 class="mb-2">CH2：元件系統 | Components</h1>
    <p class="text-gray-600 dark:text-gray-400 mb-8">
      元件是 Vue 最強大的功能之一。學習如何建立可重用、可組合的元件，並掌握元件之間的溝通模式。
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
