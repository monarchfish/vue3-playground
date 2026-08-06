<script setup lang="ts">
const chapterPageList = [
  {
    path: '/ecosystem/vueuse',
    title: 'VueUse 工具集',
    description: '使用 @vueuse/core 提供的組合式函式加速開發',
  },
  {
    path: '/ecosystem/nuxt-features',
    title: 'Nuxt 特色功能',
    description: '認識 useFetch、middleware、layouts 等 Nuxt 核心功能',
  },
  {
    path: '/ecosystem/form-validation',
    title: '表單驗證 | Validation',
    description: '實作表單驗證的常見模式與最佳實踐',
  },
]
</script>

<template>
  <div>
    <h1 class="mb-2">CH8：Vue 生態系 | Ecosystem</h1>
    <p class="text-gray-600 dark:text-gray-400 mb-8">
      Vue 3 擁有豐富的生態系，包含 VueUse 工具集、Nuxt
      全端框架，以及各種表單驗證方案。本章介紹實際開發中最常用的工具與模式。
    </p>

    <UiTipCard type="info" title="本專案已整合">
      此 Playground 已安裝 <code>@vueuse/nuxt</code>、<code>@pinia/nuxt</code> 與
      <code>@nuxtjs/tailwindcss</code>，相關 API 可直接使用，無需手動 import。
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
      prev-path="/tailwind/custom-theme"
      prev-title="自訂主題"
      next-path="/ecosystem/vueuse"
      next-title="VueUse 工具集"
    />
  </div>
</template>
