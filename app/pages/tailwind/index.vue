<script setup lang="ts">
const chapterPageList = [
  {
    path: '/tailwind/utility-first',
    title: 'Utility-First 概念',
    description: '認識 Tailwind 的工具類別（Utility Class）設計哲學',
  },
  {
    path: '/tailwind/responsive',
    title: '響應式設計 | RWD',
    description: '使用斷點（Breakpoint）前綴建立響應式版面',
  },
  {
    path: '/tailwind/dark-mode',
    title: '深色模式 | Dark Mode',
    description: '以 class 策略實作深色模式切換',
  },
  {
    path: '/tailwind/custom-theme',
    title: '自訂主題 | Theme',
    description: '在 tailwind.config 中擴充色彩、字型等設計 token',
  },
]
</script>

<template>
  <div>
    <h1 class="mb-2">CH7：Tailwind CSS</h1>
    <p class="text-gray-600 dark:text-gray-400 mb-8">
      Tailwind CSS 是 Utility-First 的 CSS 框架，透過組合預定義的工具類別（Utility
      Class）快速建構介面，無需撰寫自訂 CSS。本章將從核心概念到進階主題設定逐步介紹。
    </p>

    <UiTipCard type="info" title="為什麼選擇 Tailwind？">
      與傳統 CSS 框架不同，Tailwind
      不提供現成元件，而是提供低階工具類別。這讓設計更一致、開發更快速，且產出的 CSS 體積可透過
      Purge 機制大幅縮小。
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
      prev-path="/pinia/plugins"
      prev-title="Plugins 與持久化"
      next-path="/tailwind/utility-first"
      next-title="Utility-First 概念"
    />
  </div>
</template>
